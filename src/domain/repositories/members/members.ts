import { Members, Prisma, PrismaClient } from "@prisma/client";
import { IGenericPaginationQuery } from "../../entities/generic";
import { IMembersRepository } from "../../interface/repositories/members";

export class MembersRepository implements IMembersRepository {

  client: PrismaClient;
  
  constructor(client: PrismaClient){
    this.client = client
  }

  async get(param?: IGenericPaginationQuery, query?: Prisma.MembersWhereInput): Promise<Members[]> {

    const result = await this.client.members.findMany({
      where: query,
      skip: param?.skip,
      take: param?.take
    })

    return result;
  }

  async count(query?: Prisma.MembersWhereInput): Promise<number> {
    const result = await this.client.members.count({
      where: query
    });
    return result;
  }

  async getById(id: number): Promise<Members | null> {
    const result = await this.client.members.findFirst({
      where: {id}
    })

    return result
  }

  async update(id: number, data: Prisma.MembersUpdateInput): Promise<Members> {
    const result = await this.client.members.update({
      where: {
        id
      },
      data
    })

    return result
  }

}