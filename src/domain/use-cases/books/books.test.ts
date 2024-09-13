import { Books } from "@prisma/client";
import { mockBooks, mockPaginatedBooksResult } from "../../../tests/fixtures/books";
import { MockBooksRepository } from "../../../tests/mocks/repositories/books"
import { IGenericPaginationQuery, IGenericPaginationResult } from "../../entities/generic";
import { BooksUseCase } from "./books";



describe('BooksUseCase', () => { 
  let mockBooksRepository: MockBooksRepository;
  let booksUseCase: BooksUseCase;

  beforeAll(() => {
    mockBooksRepository = new MockBooksRepository();
    booksUseCase = new BooksUseCase(mockBooksRepository);
  })

  beforeEach(() => {
    jest.clearAllMocks();
  })

  describe('BooksUseCase.get', () => { 

    test('should successfully return paginated books', async () => {
      const mockParam: IGenericPaginationQuery = { skip: 0, take: 10 };
      const totalBooks = 5;

      jest.spyOn(mockBooksRepository, "get").mockResolvedValue(mockBooks);
      jest.spyOn(mockBooksRepository, "count").mockResolvedValue(totalBooks);

      const result = await booksUseCase.get(mockParam);
      expect(result).toEqual(mockPaginatedBooksResult);
      expect(mockBooksRepository.get).toHaveBeenCalledTimes(1);
      expect(mockBooksRepository.get).toHaveBeenCalledWith(mockParam);
      expect(mockBooksRepository.count).toHaveBeenCalledTimes(1);
    })

    test("should successfully return paginated members data with default param", async () => {
      jest.spyOn(mockBooksRepository, "get").mockResolvedValue(mockBooks);
      jest.spyOn(mockBooksRepository, "count").mockResolvedValue(5);

      const result = await booksUseCase.get();

      expect(result).toEqual(mockPaginatedBooksResult);
      expect(mockBooksRepository.get).toHaveBeenCalledWith({
        take: 10,
        skip: 0,
      });
    });

    test("should calculate pagination correctly", async () => {
      jest.spyOn(mockBooksRepository, "get").mockResolvedValue(mockBooks);
      jest.spyOn(mockBooksRepository, "count").mockResolvedValue(15);

      const result = await booksUseCase.get({ take: 5, skip: 10 });

      expect(result.currentPage).toBe(3);
      expect(result.totalPage).toBe(3);
    });
  });
})