import { Prisma,  Books } from "@prisma/client";
import { IGenericPaginationQuery } from "../../../domain/entities/generic";
import { IBooksRepository } from "../../../domain/interface/repositories/books";

export class MockBooksRepository implements IBooksRepository {
  get(
    param?: IGenericPaginationQuery,
    query?: Prisma.BooksWhereInput
  ): Promise<Books[]> {
    throw new Error("Method not implemented.");
  }

  count(query?: Prisma.BooksWhereInput): Promise<number> {
    throw new Error("Method not implemented.");
  }

  getById(id: number): Promise<Books | null> {
    throw new Error("Method not implemented.");
  }

  update(
    id: number,
    data: Prisma.BooksUpdateInput
  ): Promise<Books> {
    throw new Error("Method not implemented.");
  }
}
