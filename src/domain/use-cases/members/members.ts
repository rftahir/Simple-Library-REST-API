import { PrismaClient } from "@prisma/client";
import { IBorrowBooksRepository } from "../../interface/repositories/borrowBooks";
import { IMembersRepository } from "../../interface/repositories/members";
import { IMembersUseCase } from "../../interface/use-cases/members";
import { IGenericPaginationQuery, IGenericPaginationResult } from "../../entities/generic";
import { IMembersReturn } from "../../entities/members";


export class MembersUseCase implements IMembersUseCase {
  private memberRepository: IMembersRepository
  private borrowBookRepository: IBorrowBooksRepository

  constructor(
    memberRepository: IMembersRepository,
    borrowBookRepository: IBorrowBooksRepository,
  ){
    this.memberRepository = memberRepository
    this.borrowBookRepository = borrowBookRepository
  }

  async get(param?: IGenericPaginationQuery): Promise<IGenericPaginationResult<IMembersReturn>> {
    const defaultTake = param?.take || 10;
    const defaultSkip = param?.skip || 0;


    const members = await this.memberRepository.get({take: defaultTake, skip: defaultSkip});
    const totalData = await this.memberRepository.count();

    const returnedMember = await Promise.all(
      members.map(async (member) => {
        const now = new Date();
        const isPenaltized = member.penaltyEndDate ? now < member.penaltyEndDate : false;
        const borrowedBooksCount = await this.borrowBookRepository.count({membersId: member.id});

        return {
          ...member,
          isPenaltized,
          borrowedBooksCount
        }
      })
    )

    return {
      data: returnedMember,
      totalData,
      currentPage: defaultSkip / defaultTake + 1,
      totalPage: Math.ceil(totalData / defaultTake),
    }
  }
}