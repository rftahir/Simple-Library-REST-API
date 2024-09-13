import { BorrowBooks, Prisma, } from "@prisma/client";
import { IGenericPaginationQuery } from "../../entities/generic";

export interface IBorrowBooksRepository {
  get(param?: IGenericPaginationQuery, query?: Prisma.BorrowBooksWhereInput): Promise<BorrowBooks[]>
  count(query?: Prisma.BorrowBooksWhereInput): Promise<number>
  getById(id: number): Promise<BorrowBooks | null>
  create(data: Prisma.BorrowBooksCreateInput): Promise<BorrowBooks>
  update(id: number, data: Prisma.BorrowBooksUpdateInput): Promise<BorrowBooks>
}