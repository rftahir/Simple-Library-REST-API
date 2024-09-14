import { BorrowBooks } from "@prisma/client";
import { IBorrowBooksUseCase } from "../../../domain/interface/use-cases/borrowBooks";


export class MockBorrowBooksUseCase implements IBorrowBooksUseCase {
  borrow(bookId: number, memberId: number): Promise<BorrowBooks> {
    throw new Error("Method not implemented.");
  }

  return(borrowBookId: number): Promise<BorrowBooks> {
    throw new Error("Method not implemented.");
  }
}