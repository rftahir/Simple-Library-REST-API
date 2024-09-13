import { Books, Prisma } from "@prisma/client";
import { prismaMock } from "../../../infrastructures/prisma/singleton";
import { IGenericPaginationQuery } from "../../entities/generic";
import { mockBooks } from "../../../tests/fixtures/books";
import { BooksRepository } from "./books";

describe("BooksRepository", () => {
  let bookRepository: BooksRepository;

  beforeEach(() => {
    jest.clearAllMocks();

    bookRepository = new BooksRepository(prismaMock);
  });

  describe('BooksRepository.get', () => {
    test("should fetch book with pagination", async () => {
      const query = {};
      const param: IGenericPaginationQuery = { skip: 0, take: 10 };
      jest.spyOn(prismaMock.books, "findMany").mockResolvedValue(mockBooks);

      const result = await bookRepository.get(param, query);

      expect(prismaMock.books.findMany).toHaveBeenCalledWith({
        where: query,
        skip: param.skip,
        take: param.take,
      });
      expect(result).toEqual(mockBooks);
    });

    test("should fetch book when all parameter is undefined", async () => {
      jest.spyOn(prismaMock.books, "findMany").mockResolvedValue(mockBooks);

      const result = await bookRepository.get(undefined, undefined);

      expect(prismaMock.books.findMany).toHaveBeenCalledWith({
        where: undefined,
        skip: undefined,
        take: undefined,
      });
      expect(result).toEqual(mockBooks);
    });
  })


  test("BooksRepository.count", async () => {
    const query = {};
    jest.spyOn(prismaMock.books, "count").mockResolvedValue(10);

    const result = await bookRepository.count(query);

    expect(prismaMock.books.count).toHaveBeenCalledWith({ where: query });
    expect(result).toBe(10);
  });

  describe('BooksRepository.getById', () => {
    test("should fetch book by ID", async () => {
      const id = 1;
      const query = {
        where: { id }
      }
      jest.spyOn(prismaMock.books, "findFirst").mockResolvedValue(mockBooks[1]);

      const result = await bookRepository.getById(id);

      expect(prismaMock.books.findFirst).toHaveBeenCalledWith(query);
      expect(result).toEqual(mockBooks[1]);
    });

    test("should return null where no data found", async () => {
      const id = 6;
      const query = {
        where: { id }
      }
      jest.spyOn(prismaMock.books, "findFirst").mockResolvedValue(null);

      const result = await bookRepository.getById(id);

      expect(prismaMock.books.findFirst).toHaveBeenCalledWith(query);
      expect(result).toBe(null);
    });
  })

  describe('BooksRepository.update', () => {
    test("should successfully update a book", async () => {
      const id = 1;
      const query = {
        where: { id }
      }

      const mockNewdata: Prisma.BooksUpdateInput = {
        stock: 0
      }

      const mockOldData = mockBooks[1];

      const mockResult: Books = {
        ...mockOldData,
        stock: 0
      }


      jest.spyOn(prismaMock.books, "update").mockResolvedValue(mockResult);

      const result = await bookRepository.update(id, mockNewdata);

      expect(prismaMock.books.update).toHaveBeenCalledWith({...query, data: mockNewdata});
      expect(result).toEqual(mockResult);
    });
  })
});
