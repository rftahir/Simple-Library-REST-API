import { Members, Prisma,  } from "@prisma/client"
import { IGenericPaginationQuery } from "../../entities/generic"


export interface IMembersRepository {
  get(param?: IGenericPaginationQuery, query?: Prisma.MembersWhereInput): Promise<Members[]>
  count(query?: Prisma.MembersWhereInput): Promise<number>
  getById(id: number): Promise<Members | null>
  update(id: number, data: Prisma.MembersUpdateInput): Promise<Members>
}