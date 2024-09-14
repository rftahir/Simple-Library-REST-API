import { BorrowBooks, PrismaClient } from "@prisma/client";
import { IBooksRepository } from "../../interface/repositories/books";
import { IBorrowBooksRepository } from "../../interface/repositories/borrowBooks";
import { IMembersRepository } from "../../interface/repositories/members";
import { IBorrowBooksUseCase } from "../../interface/use-cases/borrowBooks";
import { BookNotFoundError } from "../../../errors/books/BookNotFoundError";
import { BookOutOfStockError } from "../../../errors/books/BookOutOfStockError";
import { MemberNotFoundError } from "../../../errors/members/MemberNotFoundError";
import { MemberPenaltizedError } from "../../../errors/members/MemberPenaltizedError";
import { BorrowBookNotFoundError } from "../../../errors/borrowBooks/BorrowBooksNotFoundError";
import { BorrowBookMemberMissmatchError } from "../../../errors/borrowBooks/BorrowBookMemberMissmatchError";
import { addDaysToDate } from "../../utils/addDaysToDate";
import { BorrowBookAlreadyReturnedError } from "../../../errors/borrowBooks/BorrowBookAlreadyReturnedError";

export class BorrowBooksUseCase implements IBorrowBooksUseCase {
  private borrowBooksRepository: IBorrowBooksRepository;
  private booksRepository: IBooksRepository;
  private membersRepository: IMembersRepository;
  private prisma: PrismaClient;

  constructor(
    borrowBooksRepository: IBorrowBooksRepository,
    booksRepository: IBooksRepository,
    membersRepository: IMembersRepository,
    prisma: PrismaClient
  ) {
    this.borrowBooksRepository = borrowBooksRepository;
    this.booksRepository = booksRepository;
    this.membersRepository = membersRepository;
    this.prisma = prisma;
  }

  async borrow(bookId: number, memberId: number): Promise<BorrowBooks> {
    const borrowedBook = await this.booksRepository.getById(bookId);
    const borrowerMember = await this.membersRepository.getById(memberId);

    if (!borrowedBook) {
      throw new BookNotFoundError();
    }

    if (borrowedBook.stock === 0) {
      throw new BookOutOfStockError();
    }

    if (!borrowerMember) {
      throw new MemberNotFoundError();
    }
    const now = new Date();

    const isMemberPenaltized = borrowerMember.penaltyEndDate
      ? now < borrowerMember.penaltyEndDate
      : false;

    if (isMemberPenaltized) {
      throw new MemberPenaltizedError();
    }

    const borrowBook = await this.prisma.$transaction(async (prisma) => {
      // Update the book stock
      await this.booksRepository.update(bookId, {
        stock: borrowedBook.stock - 1,
      });

      // Insert data into the borrow book table
      const borrowBookData = await this.borrowBooksRepository.create({
        book: {
          connect: {
            id: bookId,
          },
        },
        member: {
          connect: {
            id: memberId,
          },
        },
        borrowDate: new Date(),
      });

      return borrowBookData;
    });

    return borrowBook;
  }

  async return(borrowBookId: number, memberId: number): Promise<BorrowBooks> {
    const borrowBookData = await this.borrowBooksRepository.getById(
      borrowBookId
    );

    if (!borrowBookData) {
      throw new BorrowBookNotFoundError();
    }

    if (borrowBookData.membersId != memberId) {
      throw new BorrowBookMemberMissmatchError();
    }

    if (borrowBookData.returnDate) {
      throw new BorrowBookAlreadyReturnedError();
    }

    const updatedBorrowBook = await this.prisma.$transaction(async (prisma) => {
      const borrowedBook = await this.booksRepository.getById(
        borrowBookData.booksId
      );

      if (!borrowedBook) {
        throw new BookNotFoundError();
      }

      // Update the book stock
      await this.booksRepository.update(borrowBookData.booksId, {
        stock: borrowedBook.stock + 1,
      });

      const returnDate = new Date();
      const borrowDate = new Date(borrowBookData.borrowDate);
      const timeDiff = Math.abs(returnDate.getTime() - borrowDate.getTime());
      const dateDiff = Math.round(timeDiff / (1000 * 3600 * 24));

      // Insert data into the rent table
      const updatedBorrowBookData = await this.borrowBooksRepository.update(
        borrowBookId,
        {
          returnDate,
        }
      );

      // penaltize member when more than 7 days
      if (dateDiff > 7) {
        await this.membersRepository.update(borrowBookData.membersId, {
          penaltyEndDate: addDaysToDate(new Date, 3),
        });
      }

      return updatedBorrowBookData;
    });

    return updatedBorrowBook;
  }
}
