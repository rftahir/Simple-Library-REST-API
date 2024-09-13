import { Books } from "@prisma/client";
import { IGenericPaginationQuery, IGenericPaginationResult } from "../../entities/generic";


export interface IBooksUseCase {
  get(param?: IGenericPaginationQuery): Promise<IGenericPaginationResult<Books>>
}