import { Members } from "@prisma/client";
import { IGenericPaginationResult } from "../../domain/entities/generic";
import { IMembersReturn } from "../../domain/entities/members";


export const membersNow = new Date();
export const membersPastDate = new Date(membersNow.getTime() - 10000);
export const membersFutureDate = new Date(membersNow.getTime() + 10000);

export const mockSingleMember: Members = {
    id: 1,
    code: "M001",
    name: "Angga",
    penaltyEndDate: null
}

export const mockMembers: Members[] = [
    {
        id: 1,
        code: "M001",
        name: "Angga",
        penaltyEndDate: null
    },
    {
        id: 2,
        code: "M002",
        name: "Ferry",
        penaltyEndDate: null
        
    },
    {
        id: 3,
        code: "M003",
        name: "Putri",
        penaltyEndDate: null
        
    },
]

export const mockPaginatedMembersResult: IGenericPaginationResult<IMembersReturn> = {
  data: [
    {
      id: 1,
      code: "M001",
      name: "Angga",
      penaltyEndDate: membersPastDate,
      isPenaltized: false,
      borrowedBooksCount: 1,
    },
    {
      id: 2,
      code: "M002",
      name: "Ferry",
      penaltyEndDate: membersFutureDate,
      isPenaltized: true,
      borrowedBooksCount: 0,
    },
    {
      id: 3,
      code: "M003",
      name: "Putri",
      penaltyEndDate: null,
      isPenaltized: false,
      borrowedBooksCount: 1,
    },
  ],
  totalData: 3,
  totalPage: 1,
  currentPage: 1,
};