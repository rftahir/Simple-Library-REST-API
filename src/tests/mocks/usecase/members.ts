import { IGenericPaginationQuery, IGenericPaginationResult } from "../../../domain/entities/generic";
import { IMembersReturn } from "../../../domain/entities/members";
import { IMembersUseCase } from "../../../domain/interface/use-cases/members";



export class MockMembersUseCase implements IMembersUseCase {
  get(param?: IGenericPaginationQuery): Promise<IGenericPaginationResult<IMembersReturn>> {
    throw new Error("Method not implemented.");
  }
}