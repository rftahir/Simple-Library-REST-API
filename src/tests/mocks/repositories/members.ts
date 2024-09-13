import { Prisma, Members } from "@prisma/client";
import { IGenericPaginationQuery } from "../../../domain/entities/generic";
import { IMembersRepository } from "../../../domain/interface/repositories/members";

export class MockMembersRepository implements IMembersRepository {
  get(
    param?: IGenericPaginationQuery,
    query?: Prisma.MembersWhereInput
  ): Promise<Members[]> {
    throw new Error("Method not implemented.");
  }

  count(query?: Prisma.MembersWhereInput): Promise<number> {
    throw new Error("Method not implemented.");
  }

  getById(id: number): Promise<Members | null> {
    throw new Error("Method not implemented.");
  }

  update(id: number, data: Prisma.MembersUpdateInput): Promise<Members> {
    throw new Error("Method not implemented.");
  }
}
