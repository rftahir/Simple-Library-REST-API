import { BorrowBooks } from "@prisma/client";

export interface IBorrowBooksUseCase {
  borrow(bookId: number, memberId: number): Promise<BorrowBooks>
  return(borrowBookId: number, memberId: number): Promise<BorrowBooks>
}