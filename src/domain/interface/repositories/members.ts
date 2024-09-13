import { Members, Prisma, PrismaPromise } from "@prisma/client"
import { IGenericPaginationQuery } from "../../entities/generic"


export interface IMembersRepository {
  get(param?: IGenericPaginationQuery, query?: Prisma.MembersWhereInput): Promise<PrismaPromise<Members[]>>
  count(query?: Prisma.MembersWhereInput): Promise<number>
  getById(id: number): Promise<PrismaPromise<Members> | null>
  update(id: number, data: Prisma.MembersUpdateInput): Promise<PrismaPromise<Members>>
}