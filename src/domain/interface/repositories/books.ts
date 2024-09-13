import { Books, Prisma } from "@prisma/client";
import { IGenericPaginationQuery } from "../../entities/generic";


export interface IBooksRepository {
  get(param?: IGenericPaginationQuery, query?: Prisma.BooksWhereInput): Promise<Books[]>
  count(query?: Prisma.BooksWhereInput): Promise<number>
  getById(id: number): Promise<Books | null>
  update(id: number, data: Prisma.BooksUpdateInput): Promise<Books>
}