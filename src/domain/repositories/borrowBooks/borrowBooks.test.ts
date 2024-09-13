import { BorrowBooks, Prisma } from "@prisma/client";
import { prismaMock } from "../../../infrastructures/prisma/singleton";
import { IGenericPaginationQuery } from "../../entities/generic";
import { mockBorrowBooks } from "../../../tests/fixtures/borrowBooks";
import { BorrowBooksRepository } from "./borrowBooks";

describe("BorrowBooksRepository", () => {
  let borrowBookRepository: BorrowBooksRepository;

  beforeEach(() => {
    jest.clearAllMocks();

    borrowBookRepository = new BorrowBooksRepository(prismaMock);
  });

  describe('BorrowBooksRepository.get', () => {
    test("should fetch borrow book with pagination", async () => {
      const query = {};
      const param: IGenericPaginationQuery = { skip: 0, take: 10 };
      jest.spyOn(prismaMock.borrowBooks, "findMany").mockResolvedValue(mockBorrowBooks);

      const result = await borrowBookRepository.get(param, query);

      expect(prismaMock.borrowBooks.findMany).toHaveBeenCalledWith({
        where: query,
        skip: param.skip,
        take: param.take,
      });
      expect(result).toEqual(mockBorrowBooks);
    });

    test("should fetch borrow book when all parameter is undefined", async () => {
      jest.spyOn(prismaMock.borrowBooks, "findMany").mockResolvedValue(mockBorrowBooks);

      const result = await borrowBookRepository.get(undefined, undefined);

      expect(prismaMock.borrowBooks.findMany).toHaveBeenCalledWith({
        where: undefined,
        skip: undefined,
        take: undefined,
      });
      expect(result).toEqual(mockBorrowBooks);
    });
  })


  test("BorrowBooksRepository.count", async () => {
    const query = {};
    jest.spyOn(prismaMock.borrowBooks, "count").mockResolvedValue(10);

    const result = await borrowBookRepository.count(query);

    expect(prismaMock.borrowBooks.count).toHaveBeenCalledWith({ where: query });
    expect(result).toBe(10);
  });

  describe('BorrowBooksRepository.getById', () => {
    test("should fetch borrow book by ID", async () => {
      const id = 1;
      const query = {
        where: { id }
      }
      jest.spyOn(prismaMock.borrowBooks, "findFirst").mockResolvedValue(mockBorrowBooks[1]);

      const result = await borrowBookRepository.getById(id);

      expect(prismaMock.borrowBooks.findFirst).toHaveBeenCalledWith(query);
      expect(result).toEqual(mockBorrowBooks[1]);
    });

    test("should return null where no data found", async () => {
      const id = 6;
      const query = {
        where: { id }
      }
      jest.spyOn(prismaMock.borrowBooks, "findFirst").mockResolvedValue(null);

      const result = await borrowBookRepository.getById(id);

      expect(prismaMock.borrowBooks.findFirst).toHaveBeenCalledWith(query);
      expect(result).toBe(null);
    });
  })

  describe('BorrowBooksRepository.create', () => {
    test("should successfully create a borrowBook data", async () => {
      const borrowDate = new Date();

      const mockNewdata: Prisma.BorrowBooksCreateInput = {
        borrowDate,
        book: {
          connect: {
            id: 1
          }
        },
        member: {
          connect: {
            id: 1
          }
        }
      }

      const mockResult: BorrowBooks = {
        id: 1,
        booksId: 1,
        membersId: 1,
        borrowDate,
        returnDate: null
      }


      jest.spyOn(prismaMock.borrowBooks, "create").mockResolvedValue(mockResult);

      const result = await borrowBookRepository.create(mockNewdata);

      expect(prismaMock.borrowBooks.create).toHaveBeenCalledWith({data: mockNewdata});
      expect(result).toEqual(mockResult);
    });
  })

  describe('BorrowBooksRepository.update', () => {
    test("should successfully update a borrowBook data", async () => {
      const id = 1;
      const query = {
        where: { id }
      }

      const returnDate = new Date();

      const mockNewdata: Prisma.BorrowBooksUpdateInput = {
        returnDate
      }

      const mockOldData = mockBorrowBooks[1];

      const mockResult: BorrowBooks = {
        ...mockOldData,
        returnDate
      }


      jest.spyOn(prismaMock.borrowBooks, "update").mockResolvedValue(mockResult);

      const result = await borrowBookRepository.update(id, mockNewdata);

      expect(prismaMock.borrowBooks.update).toHaveBeenCalledWith({...query, data: mockNewdata});
      expect(result).toEqual(mockResult);
    });
  })
});
