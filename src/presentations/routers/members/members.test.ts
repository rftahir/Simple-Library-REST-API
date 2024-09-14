import request from "supertest";
import server from "../../../server";
import { MockMembersUseCase } from "../../../tests/mocks/usecase/members"
import MembersRouter from "./members";
import { mockPaginatedMembersResult } from "../../../tests/fixtures/members";
import { mockInternalServerErrorResult, mockPaginationValidationError } from "../../../tests/fixtures/errors";



describe('MembersRouter', () => { 
  let mockMembersUseCase: MockMembersUseCase;

  beforeAll(() => {
    mockMembersUseCase = new MockMembersUseCase();    
    server.use('/members', MembersRouter(mockMembersUseCase))
  })

  beforeEach(() => {
    jest.clearAllMocks();
  })

      describe("GET /members", () => {

        test("should return 200 with paginated data", async () => {
            
            jest.spyOn(mockMembersUseCase, "get").mockImplementation(() => Promise.resolve(mockPaginatedMembersResult))

            const response = await request(server).get("/members")
            const expectedData = mockPaginatedMembersResult.data.map((result) => ({
              ...result, 
              penaltyEndDate: result.penaltyEndDate ? new Date(result.penaltyEndDate).toISOString() : null
            }))

            expect(response.status).toBe(200)
            expect(mockMembersUseCase.get).toHaveBeenCalledTimes(1)
            expect(response.body).toStrictEqual({
              ...mockPaginatedMembersResult,
              data: expectedData
            })

        });

         test("should call membersUseCase.get with correct parameters", async () => {
          const mockGet = jest.spyOn(mockMembersUseCase, "get").mockImplementation(() => Promise.resolve(mockPaginatedMembersResult));
          const queryParams = { skip: "10", take: "20" };
          const response = await request(server).get("/members").query(queryParams);

          const expectedParams = { 
            skip: 10, 
            take: 20
          };

          expect(mockGet).toHaveBeenCalledWith(expectedParams);

          mockGet.mockRestore();
        });

        test("should return validation error when param is invalid", async () => {
            
            jest.spyOn(mockMembersUseCase, "get").mockImplementation(() => Promise.resolve(mockPaginatedMembersResult))

            const response = await request(server).get("/members?skip=abc")

            expect(response.status).toBe(422)
            expect(mockMembersUseCase.get).toHaveBeenCalledTimes(0)
            expect(response.body).toStrictEqual(mockPaginationValidationError)

        });

        test("should returns 500 on use case error", async () => {
            jest.spyOn(mockMembersUseCase, "get").mockImplementation(() => Promise.reject(Error()))
            const response = await request(server).get("/members")
            expect(response.status).toBe(500)
            expect(response.body).toStrictEqual(mockInternalServerErrorResult)
        });
    })

})