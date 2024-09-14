import { Books, BorrowBooks, PrismaClient } from "@prisma/client";
import { MockBooksRepository } from "../../../tests/mocks/repositories/books"
import { MockMembersRepository } from "../../../tests/mocks/repositories/members";
import { BorrowBooksUseCase } from "./borrowBooks";
import { prismaMock } from "../../../infrastructures/prisma/singleton";
import { MockBorrowBooksRepository } from "../../../tests/mocks/repositories/borrowBooks";
import { mockSingleBook } from "../../../tests/fixtures/books";
import { membersFutureDate, mockSingleMember } from "../../../tests/fixtures/members";
import { mockBorrowBooks, mockSingleBorrowBooks } from "../../../tests/fixtures/borrowBooks";
import { BookNotFoundError } from "../../../errors/books/BookNotFoundError";
import { MemberNotFoundError } from "../../../errors/members/MemberNotFoundError";
import { MemberPenaltizedError } from "../../../errors/members/MemberPenaltizedError";
import { BorrowBookNotFoundError } from "../../../errors/borrowBooks/BorrowBooksNotFoundError";
import { BorrowBookMemberMissmatchError } from "../../../errors/borrowBooks/BorrowBookMemberMissmatchError";
import { BookOutOfStockError } from "../../../errors/books/BookOutOfStockError";
import { addDaysToDate } from "../../utils/addDaysToDate";
import { BorrowBookAlreadyReturnedError } from "../../../errors/borrowBooks/BorrowBookAlreadyReturnedError";



describe('BorrowBooksUseCase', () => {
  let mockBorrowBooksRepository: MockBorrowBooksRepository;
  let mockBooksRepository: MockBooksRepository;
  let mockMembersRepository: MockMembersRepository;
  let mockPrisma: PrismaClient;
  let borrowBooksUseCase: BorrowBooksUseCase;

  beforeAll(() => {
    mockBorrowBooksRepository = new MockBorrowBooksRepository();
    mockBooksRepository = new MockBooksRepository();
    mockMembersRepository = new MockMembersRepository();
    mockPrisma = prismaMock;

    borrowBooksUseCase = new BorrowBooksUseCase(
      mockBorrowBooksRepository,
      mockBooksRepository,
      mockMembersRepository,
      mockPrisma
    )
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('BorrowBooksUseCase.borrow', () => {
    test('should successfully borrow book', async () => {
      
      jest.spyOn(mockBooksRepository, 'getById').mockResolvedValue(mockSingleBook);
      jest.spyOn(mockMembersRepository, 'getById').mockResolvedValue(mockSingleMember);

      jest.spyOn(mockBooksRepository, 'update').mockResolvedValue({
        ...mockSingleBook,
        stock: 0
      })

      jest.spyOn(mockBorrowBooksRepository, 'create').mockResolvedValue(mockSingleBorrowBooks);
      
      jest.spyOn(mockPrisma, '$transaction').mockImplementation(async (cb) => {
        return cb(mockPrisma);
      });

      const result = await borrowBooksUseCase.borrow(1, 1);

      expect(result).toEqual(mockSingleBorrowBooks);
      expect(mockBorrowBooksRepository.create).toHaveBeenCalledTimes(1);
      expect(mockBooksRepository.update).toHaveBeenCalledTimes(1);
      expect(mockBooksRepository.update).toHaveBeenCalledWith(mockSingleBook.id, {stock: mockSingleBook.stock - 1});
    })
    

    test('should throw error when book not found', () => {
      
      jest.spyOn(mockBooksRepository, 'getById').mockResolvedValue(null);

      const result = borrowBooksUseCase.borrow(1, 1);

      expect(result).rejects.toThrow(new BookNotFoundError());
    })

    test('should throw error when book out of stock', () => {
      
      jest.spyOn(mockBooksRepository, 'getById').mockResolvedValue({
        ...mockSingleBook,
        stock: 0
      });

      const result = borrowBooksUseCase.borrow(1, 1);

      expect(result).rejects.toThrow(new BookOutOfStockError());
    })

    test('should throw error when member not found', () => {
      
      jest.spyOn(mockBooksRepository, 'getById').mockResolvedValue(mockSingleBook);
      jest.spyOn(mockMembersRepository, 'getById').mockResolvedValue(null);

      
      const result = borrowBooksUseCase.borrow(1, 1);

      expect(result).rejects.toThrow(new MemberNotFoundError());
    })

    test('should throw error when member is penaltized', () => {
      
      jest.spyOn(mockBooksRepository, 'getById').mockResolvedValue(mockSingleBook);
      jest.spyOn(mockMembersRepository, 'getById').mockResolvedValue({
        ...mockSingleMember,
        penaltyEndDate: membersFutureDate
      });

      
      const result = borrowBooksUseCase.borrow(1, 1);

      expect(result).rejects.toThrow(new MemberPenaltizedError());
    })
  })

  describe('BorrowBooksUseCase.return', () => {
    test('should successfully return a book', async () => {
      const currentDate = new Date();

      const mockBorrowedBook: Books = {
        ...mockSingleBook,
        stock: 0
      }

      const mockReturnedBook: BorrowBooks = {
        ...mockSingleBorrowBooks,
        returnDate: currentDate
      }


      jest.spyOn(mockBorrowBooksRepository, 'getById').mockResolvedValue(mockSingleBorrowBooks);

      jest.spyOn(mockBooksRepository, 'getById').mockResolvedValue(mockBorrowedBook)

      jest.spyOn(mockBooksRepository, 'update').mockResolvedValue(mockSingleBook);
      
      jest.spyOn(mockBorrowBooksRepository, 'update').mockResolvedValue(mockReturnedBook);
      
      jest.spyOn(mockPrisma, '$transaction').mockImplementation(async (cb) => {
        return cb(mockPrisma);
      });

      const result = await borrowBooksUseCase.return(1, 1);
      expect(result).toEqual(mockReturnedBook);
      expect(mockBooksRepository.update).toHaveBeenCalledWith(mockSingleBorrowBooks.id, {stock: mockBorrowedBook.stock + 1});
      expect(mockBorrowBooksRepository.update).toHaveBeenCalledWith(mockSingleBorrowBooks.id, { returnDate: expect.any(Date) });
    })

    test('should penaltized when the book return more than 7 days', async () => {
      const currentDate = new Date();
      const mockBorrowedBook: Books = {
        ...mockSingleBook,
        stock: 0
      }

      const mockReturnedBook: BorrowBooks = {
        ...mockSingleBorrowBooks,
        borrowDate: new Date('2024-09-01'),
        returnDate: currentDate
      }

      const penaltyEndDate = addDaysToDate(currentDate, 3)


      jest.spyOn(mockBorrowBooksRepository, 'getById').mockResolvedValue({
        ...mockReturnedBook,
        returnDate: null
      });

      jest.spyOn(mockBooksRepository, 'getById').mockResolvedValue(mockBorrowedBook)

      jest.spyOn(mockBooksRepository, 'update').mockResolvedValue(mockSingleBook);
      
      jest.spyOn(mockBorrowBooksRepository, 'update').mockResolvedValue(mockReturnedBook);

      jest.spyOn(mockMembersRepository, 'update').mockResolvedValue({
        ...mockSingleMember,
        penaltyEndDate
      });
      
      jest.spyOn(mockPrisma, '$transaction').mockImplementation(async (cb) => {
        return cb(mockPrisma);
      });

      const result = await borrowBooksUseCase.return(1, 1);
      expect(result).toEqual(mockReturnedBook);
      expect(mockMembersRepository.update).toHaveBeenCalledTimes(1);
      expect(mockMembersRepository.update).toHaveBeenCalledWith(mockReturnedBook.membersId, { penaltyEndDate: expect.any(Date) });
    })


    test('should throw error when borrow book data not found', () => {
      
      jest.spyOn(mockBorrowBooksRepository, 'getById').mockResolvedValue(null);

      const result = borrowBooksUseCase.return(1, 1);

      expect(result).rejects.toThrow(new BorrowBookNotFoundError());
    })

    test('should throw error when borrowed book already returned', () => {
      
      jest.spyOn(mockBorrowBooksRepository, 'getById').mockResolvedValue({
        ...mockSingleBorrowBooks,
        returnDate: new Date()
      });

      const result = borrowBooksUseCase.return(1, 1);

      expect(result).rejects.toThrow(new BorrowBookAlreadyReturnedError());
    })

    test('should throw error when borrow book member is not equal to member param', () => {
      
      jest.spyOn(mockBorrowBooksRepository, 'getById').mockResolvedValue(mockSingleBorrowBooks);

      const result = borrowBooksUseCase.return(1, 2);

      expect(result).rejects.toThrow(new BorrowBookMemberMissmatchError());
    })

    test('should throw error when book data not found', () => {
      
      jest.spyOn(mockBorrowBooksRepository, 'getById').mockResolvedValue(mockSingleBorrowBooks);
      jest.spyOn(mockBooksRepository, 'getById').mockResolvedValue(null);

      jest.spyOn(mockPrisma, '$transaction').mockImplementation(async (cb) => {
        return cb(mockPrisma);
      });

      const result = borrowBooksUseCase.return(1, 1);

      expect(result).rejects.toThrow(new BookNotFoundError());
    })
  })
})