import { Books } from "@prisma/client";
import {
  IGenericPaginationQuery,
  IGenericPaginationResult,
} from "../../../domain/entities/generic";
import { IBooksUseCase } from "../../../domain/interface/use-cases/books";

export class MockBooksUseCase implements IBooksUseCase {
  get(
    param?: IGenericPaginationQuery
  ): Promise<IGenericPaginationResult<Books>> {
    throw new Error("Method not implemented.");
  }
}
