import request from "supertest";
import server from "../../../server";
import { mockPaginatedMembersResult } from "../../../tests/fixtures/members";
import { mockInternalServerErrorResult } from "../../../tests/fixtures/errors";
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

        test("GET /contact returns 500 on use case error", async () => {
            jest.spyOn(mockBooksUseCase, "get").mockImplementation(() => Promise.reject(Error()))
            const response = await request(server).get("/books")
            expect(response.status).toBe(500)
            expect(response.body).toStrictEqual(mockInternalServerErrorResult)
        });
    })

})