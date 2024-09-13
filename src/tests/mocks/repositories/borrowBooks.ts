import { Prisma, BorrowBooks } from "@prisma/client";
import { IGenericPaginationQuery } from "../../../domain/entities/generic";
import { IBorrowBooksRepository } from "../../../domain/interface/repositories/borrowBooks";

export class MockBorrowBooksRepository implements IBorrowBooksRepository {
  get(
    param?: IGenericPaginationQuery,
    query?: Prisma.BorrowBooksWhereInput
  ): Promise<BorrowBooks[]> {
    throw new Error("Method not implemented.");
  }

  count(query?: Prisma.BorrowBooksWhereInput): Promise<number> {
    throw new Error("Method not implemented.");
  }

  getById(id: number): Promise<BorrowBooks | null> {
    throw new Error("Method not implemented.");
  }

  create(
    data: Prisma.BorrowBooksCreateInput
  ): Promise<BorrowBooks> {
    throw new Error("Method not implemented.");
  }

  update(
    id: number,
    data: Prisma.BorrowBooksUpdateInput
  ): Promise<BorrowBooks> {
    throw new Error("Method not implemented.");
  }
}
