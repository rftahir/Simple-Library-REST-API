import { Books, Prisma, PrismaPromise } from "@prisma/client";
import { IGenericPaginationQuery } from "../../entities/generic";


export interface IBooksRepository {
  get(param?: IGenericPaginationQuery, query?: Prisma.BooksWhereInput): Promise<PrismaPromise<Books[]>>
  count(query?: Prisma.BooksWhereInput): Promise<number>
  getById(id: number): Promise<PrismaPromise<Books> | null>
  update(id: number, data: Prisma.BooksUpdateInput): Promise<PrismaPromise<Books>>
}