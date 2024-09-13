
export interface IGenericPaginationQuery {
  skip?: number;
  take?: number;
}

export interface IGenericPaginationResult<T> {
  data: T[];
  currentPage: number;
  totalData: number;
  totalPage: number;
}