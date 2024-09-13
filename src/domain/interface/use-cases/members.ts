import { IGenericPaginationQuery, IGenericPaginationResult } from "../../entities/generic";
import { IMembersReturn } from "../../entities/members";



export interface IMembersUseCase {
  get(param?: IGenericPaginationQuery): Promise<IGenericPaginationResult<IMembersReturn>>
}