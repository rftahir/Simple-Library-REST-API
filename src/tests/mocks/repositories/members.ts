import { Prisma, PrismaPromise, Members } from "@prisma/client";
import { IGenericPaginationQuery } from "../../../domain/entities/generic";
import { IMembersRepository } from "../../../domain/interface/repositories/members";

export class MockMembersRepository implements IMembersRepository {
  get(
    param?: IGenericPaginationQuery,
    query?: Prisma.MembersWhereInput
  ): Promise<PrismaPromise<Members[]>> {
    throw new Error("Method not implemented.");
  }

  count(query?: Prisma.MembersWhereInput): Promise<number> {
    throw new Error("Method not implemented.");
  }

  getById(id: number): Promise<PrismaPromise<Members> | null> {
    throw new Error("Method not implemented.");
  }

  update(
    id: number,
    data: Prisma.MembersUpdateInput
  ): Promise<PrismaPromise<Members>> {
    throw new Error("Method not implemented.");
  }
}
