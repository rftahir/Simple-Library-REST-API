import { BorrowBooks, Prisma, PrismaPromise } from "@prisma/client";
import { IGenericPaginationQuery } from "../../entities/generic";

export interface IBorrowBooksRepository {
  get(param?: IGenericPaginationQuery, query?: Prisma.BorrowBooksWhereInput): Promise<PrismaPromise<BorrowBooks[]>>
  count(query?: Prisma.BorrowBooksWhereInput): Promise<number>
  getById(id: number): Promise<PrismaPromise<BorrowBooks> | null>
  create(data: Prisma.BorrowBooksCreateInput): Promise<PrismaPromise<BorrowBooks>>
  update(id: number, data: Prisma.BorrowBooksUpdateInput): Promise<PrismaPromise<BorrowBooks>>
}