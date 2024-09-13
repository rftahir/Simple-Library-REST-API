import { Books } from "@prisma/client";
import { IGenericPaginationQuery, IGenericPaginationResult } from "../../entities/generic";
import { IBooksRepository } from "../../interface/repositories/books";
import { IBooksUseCase } from "../../interface/use-cases/books";



export class BooksUseCase implements IBooksUseCase {
  private booksRepository: IBooksRepository

  constructor(booksRepository: IBooksRepository){
    this.booksRepository = booksRepository
  }

  async get(param?: IGenericPaginationQuery): Promise<IGenericPaginationResult<Books>> {
    const defaultTake = param?.take || 10;
    const defaultSkip = param?.skip || 0;

    const books = await this.booksRepository.get({take: defaultTake, skip: defaultSkip});
    const totalData = await this.booksRepository.count();

    return {
      data: books,
      totalData,
      currentPage: defaultSkip / defaultTake + 1,
      totalPage: Math.ceil(totalData / defaultTake),
    }
  }
}