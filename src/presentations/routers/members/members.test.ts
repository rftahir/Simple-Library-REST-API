import request from "supertest";
import server from "../../../server";
import { MockMembersUseCase } from "../../../tests/mocks/usecase/members"
import MembersRouter from "./members";
import { mockPaginatedMembersResult } from "../../../tests/fixtures/members";
import { mockInternalServerErrorResult } from "../../../tests/fixtures/errors";



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

        test("should returns 500 on use case error", async () => {
            jest.spyOn(mockMembersUseCase, "get").mockImplementation(() => Promise.reject(Error()))
            const response = await request(server).get("/members")
            expect(response.status).toBe(500)
            expect(response.body).toStrictEqual(mockInternalServerErrorResult)
        });
    })

})