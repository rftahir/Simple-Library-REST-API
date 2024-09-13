import { BorrowBooks, Prisma, PrismaClient, PrismaPromise } from "@prisma/client";
import { IGenericPaginationQuery } from "../../entities/generic";
import { IBorrowBooksRepository } from "../../interface/repositories/borrowBooks";

export class BorrowBooksRepository implements IBorrowBooksRepository {

  client: PrismaClient;
  
  constructor(client: PrismaClient){
    this.client = client
  }

  async get(param?: IGenericPaginationQuery, query?: Prisma.BorrowBooksWhereInput): Promise<PrismaPromise<BorrowBooks[]>> {

    const result = await this.client.borrowBooks.findMany({
      where: query,
      skip: param?.skip,
      take: param?.take
    })

    return result;
  }

  async count(query?: Prisma.BorrowBooksWhereInput): Promise<number> {
    const result = await this.client.borrowBooks.count({
      where: query
    });
    return result;
  }

  async getById(id: number): Promise<PrismaPromise<BorrowBooks> | null> {
    const result = await this.client.borrowBooks.findFirst({
      where: {id}
    })

    return result
  }

  async create(data: Prisma.BorrowBooksCreateInput): Promise<PrismaPromise<BorrowBooks>> {
    const result = await this.client.borrowBooks.create({
      data
    })

    return result
  }

  async update(id: number, data: Prisma.BorrowBooksUpdateInput): Promise<PrismaPromise<BorrowBooks>> {
    const result = await this.client.borrowBooks.update({
      where: {
        id
      },
      data
    })

    return result
  }

}