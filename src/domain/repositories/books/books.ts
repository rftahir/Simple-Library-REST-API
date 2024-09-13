import { Books, Prisma, PrismaClient, PrismaPromise } from "@prisma/client";
import { IGenericPaginationQuery } from "../../entities/generic";
import { IBooksRepository } from "../../interface/repositories/books";

export class BooksRepository implements IBooksRepository {

  client: PrismaClient;
  
  constructor(client: PrismaClient){
    this.client = client
  }

  async get(param?: IGenericPaginationQuery, query?: Prisma.BooksWhereInput): Promise<PrismaPromise<Books[]>> {

    const result = await this.client.books.findMany({
      where: query,
      skip: param?.skip,
      take: param?.take
    })

    return result;
  }

  async count(query?: Prisma.BooksWhereInput): Promise<number> {
    const result = await this.client.books.count({
      where: query
    });
    return result;
  }

  async getById(id: number): Promise<PrismaPromise<Books> | null> {
    const result = await this.client.books.findFirst({
      where: {id}
    })

    return result
  }

  async update(id: number, data: Prisma.BooksUpdateInput): Promise<PrismaPromise<Books>> {
    const result = await this.client.books.update({
      where: {
        id
      },
      data
    })

    return result
  }

}