import request from "supertest";
import server from "../../../server";
import { mockInternalServerErrorResult, mockPaginationValidationError } from "../../../tests/fixtures/errors";
import { MockBooksUseCase } from "../../../tests/mocks/usecase/books";
import BooksRouter from "./books";
import { mockPaginatedBooksResult } from "../../../tests/fixtures/books";



describe('BooksRouter', () => { 
  let mockBooksUseCase: MockBooksUseCase;

  beforeAll(() => {
    mockBooksUseCase = new MockBooksUseCase();    
    server.use('/books', BooksRouter(mockBooksUseCase))
  })

  beforeEach(() => {
    jest.clearAllMocks();
  })

      describe("GET /books", () => {

        test("should return 200 with paginated data", async () => {
            
            jest.spyOn(mockBooksUseCase, "get").mockImplementation(() => Promise.resolve(mockPaginatedBooksResult))

            const response = await request(server).get("/books")

            expect(response.status).toBe(200)
            expect(mockBooksUseCase.get).toHaveBeenCalledTimes(1)
            expect(response.body).toStrictEqual(mockPaginatedBooksResult)

        });

        test("should call membersUseCase.get with correct parameters", async () => {
          const mockGet = jest.spyOn(mockBooksUseCase, "get").mockImplementation(() => Promise.resolve(mockPaginatedBooksResult));
          const queryParams = { skip: "10", take: "20" };
          const response = await request(server).get("/books").query(queryParams);

          const expectedParams = { 
            skip: 10, 
            take: 20
          };

          expect(mockGet).toHaveBeenCalledWith(expectedParams);

          mockGet.mockRestore();
        });

        test("should return validation error when param is invalid", async () => {
            
            jest.spyOn(mockBooksUseCase, "get").mockImplementation(() => Promise.resolve(mockPaginatedBooksResult))
            const queryParams = { skip: "abc", take: "20" };

            const response = await request(server).get("/books").query(queryParams)

            expect(response.status).toBe(422)
            expect(mockBooksUseCase.get).toHaveBeenCalledTimes(0)
            expect(response.body).toStrictEqual(mockPaginationValidationError)

        });

        test("should returns 500 on use case error", async () => {
            jest.spyOn(mockBooksUseCase, "get").mockImplementation(() => Promise.reject(Error()))
            const response = await request(server).get("/books")
            expect(response.status).toBe(500)
            expect(response.body).toStrictEqual(mockInternalServerErrorResult)
        });
    })

})