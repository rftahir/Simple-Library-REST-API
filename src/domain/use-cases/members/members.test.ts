import { Members } from "@prisma/client";
import {
  membersFutureDate,
  membersPastDate,
  mockMembers,
  mockPaginatedMembersResult,
} from "../../../tests/fixtures/members";
import { MockBorrowBooksRepository } from "../../../tests/mocks/repositories/borrowBooks";
import { MockMembersRepository } from "../../../tests/mocks/repositories/members";
import {
  IGenericPaginationQuery,
  IGenericPaginationResult,
} from "../../entities/generic";
import { MembersUseCase } from "./members";
import { IMembersReturn } from "../../entities/members";

describe("MembersUseCase", () => {
  let mockMemberRepository: MockMembersRepository;
  let mockBorrowBookRepository: MockBorrowBooksRepository;

  let membersUseCase: MembersUseCase;

  beforeAll(() => {
    mockMemberRepository = new MockMembersRepository();
    mockBorrowBookRepository = new MockBorrowBooksRepository();

    membersUseCase = new MembersUseCase(
      mockMemberRepository,
      mockBorrowBookRepository
    );
  })

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("MemberUseCase.get", () => {
    test("should successfully return paginated members data", async () => {
      const mockMembers: Members[] = [
        {
          id: 1,
          code: "M001",
          name: "Angga",
          penaltyEndDate: membersPastDate,
        },
        {
          id: 2,
          code: "M002",
          name: "Ferry",
          penaltyEndDate: membersFutureDate,
        },
        {
          id: 3,
          code: "M003",
          name: "Putri",
          penaltyEndDate: null,
        },
      ];
      const mockParam: IGenericPaginationQuery = { skip: 0, take: 10 };
      const totalMembers = 3;

      jest.spyOn(mockMemberRepository, "get").mockResolvedValue(mockMembers);
      jest.spyOn(mockMemberRepository, "count").mockResolvedValue(totalMembers);
      jest.spyOn(mockBorrowBookRepository, "count").mockResolvedValueOnce(1);
      jest.spyOn(mockBorrowBookRepository, "count").mockResolvedValueOnce(0);
      jest.spyOn(mockBorrowBookRepository, "count").mockResolvedValueOnce(1);

      const result = await membersUseCase.get(mockParam);

      expect(result).toEqual(mockPaginatedMembersResult);
      expect(mockMemberRepository.get).toHaveBeenCalledTimes(1);
      expect(mockMemberRepository.get).toHaveBeenCalledWith(mockParam);
      expect(mockMemberRepository.count).toHaveBeenCalledTimes(1);
      expect(mockBorrowBookRepository.count).toHaveBeenCalledTimes(3);
    });

    test("should successfully return paginated members data with default param", async () => {
      const mockMembers: Members[] = [
        {
          id: 1,
          code: "M003",
          name: "Putri",
          penaltyEndDate: null,
        },
      ];
      const totalMembers = 1;
      const mockResult: IGenericPaginationResult<IMembersReturn> = {
        data: [
          {
            id: 1,
            code: "M003",
            name: "Putri",
            penaltyEndDate: null,
            isPenaltized: false,
            borrowedBooksCount: 1,
          },
        ],
        totalData: 1,
        totalPage: 1,
        currentPage: 1,
      };

      jest.spyOn(mockMemberRepository, "get").mockResolvedValue(mockMembers);
      jest.spyOn(mockMemberRepository, "count").mockResolvedValue(totalMembers);
      jest.spyOn(mockBorrowBookRepository, "count").mockResolvedValueOnce(1);

      const result = await membersUseCase.get();

      expect(result).toEqual(mockResult);
      expect(mockMemberRepository.get).toHaveBeenCalledWith({
        take: 10,
        skip: 0,
      });
    });

    test("should calculate pagination correctly", async () => {
      const mockMembers: Members[] = [
        {
          id: 1,
          code: "M003",
          name: "Putri",
          penaltyEndDate: null,
        },
      ];

      jest.spyOn(mockMemberRepository, "get").mockResolvedValue(mockMembers);
      jest.spyOn(mockMemberRepository, "count").mockResolvedValue(15);
      jest.spyOn(mockBorrowBookRepository, "count").mockResolvedValueOnce(1);

      const result = await membersUseCase.get({ take: 5, skip: 10 });

      expect(result.currentPage).toBe(3);
      expect(result.totalPage).toBe(3);
    });
  });
});
