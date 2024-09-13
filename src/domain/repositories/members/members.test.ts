import { Members, Prisma } from "@prisma/client";
import { prismaMock } from "../../../infrastructures/prisma/singleton";
import { IGenericPaginationQuery } from "../../entities/generic";
import { mockMembers } from "../../../tests/fixtures/members";
import { MembersRepository } from "./members";

describe("MembersRepository", () => {
  let memberRepository: MembersRepository;

  beforeEach(() => {
    jest.clearAllMocks();

    memberRepository = new MembersRepository(prismaMock);
  });

  describe('MembersRepository.get', () => {
    test("should fetch member with pagination", async () => {
      const query = {};
      const param: IGenericPaginationQuery = { skip: 0, take: 10 };
      jest.spyOn(prismaMock.members, "findMany").mockResolvedValue(mockMembers);

      const result = await memberRepository.get(param, query);

      expect(prismaMock.members.findMany).toHaveBeenCalledWith({
        where: query,
        skip: param.skip,
        take: param.take,
      });
      expect(result).toEqual(mockMembers);
    });

    test("should fetch member when all parameter is undefined", async () => {
      jest.spyOn(prismaMock.members, "findMany").mockResolvedValue(mockMembers);

      const result = await memberRepository.get(undefined, undefined);

      expect(prismaMock.members.findMany).toHaveBeenCalledWith({
        where: undefined,
        skip: undefined,
        take: undefined,
      });
      expect(result).toEqual(mockMembers);
    });
  })


  test("MembersRepository.count", async () => {
    const query = {};
    jest.spyOn(prismaMock.members, "count").mockResolvedValue(10);

    const result = await memberRepository.count(query);

    expect(prismaMock.members.count).toHaveBeenCalledWith({ where: query });
    expect(result).toBe(10);
  });

  describe('MembersRepository.getById', () => {
    test("should fetch member by ID", async () => {
      const id = 1;
      const query = {
        where: { id }
      }
      jest.spyOn(prismaMock.members, "findFirst").mockResolvedValue(mockMembers[1]);

      const result = await memberRepository.getById(id);

      expect(prismaMock.members.findFirst).toHaveBeenCalledWith(query);
      expect(result).toEqual(mockMembers[1]);
    });

    test("should return null where no data found", async () => {
      const id = 6;
      const query = {
        where: { id }
      }
      jest.spyOn(prismaMock.members, "findFirst").mockResolvedValue(null);

      const result = await memberRepository.getById(id);

      expect(prismaMock.members.findFirst).toHaveBeenCalledWith(query);
      expect(result).toBe(null);
    });
  })

  describe('MembersRepository.update', () => {
    test("should successfully update a member", async () => {
      const id = 1;
      const query = {
        where: { id }
      }
      const penaltyEndDate = new Date();

      const mockNewdata: Prisma.MembersUpdateInput = {
        penaltyEndDate
      }

      const mockOldData = mockMembers[1];

      const mockResult: Members = {
        ...mockOldData,
        penaltyEndDate
      }


      jest.spyOn(prismaMock.members, "update").mockResolvedValue(mockResult);

      const result = await memberRepository.update(id, mockNewdata);

      expect(prismaMock.members.update).toHaveBeenCalledWith({...query, data: mockNewdata});
      expect(result).toEqual(mockResult);
    });
  })
});
