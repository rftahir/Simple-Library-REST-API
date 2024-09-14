import request from "supertest";
import server from "../../../server";
import {
  mockBookAlreadyReturned,
  mockBooksNotFoundErrorResult,
  mockBooksOutOfStockErrorResult,
  mockBorrowedBooksNotFoundErrorResult,
  mockInternalServerErrorResult,
  mockMemberMissmatchError,
  mockMemberNotFoundError,
  mockMemberPenaltizedError,
} from "../../../tests/fixtures/errors";
import BorrowBooksRouter from "./borrowBooks";
import { MockBorrowBooksUseCase } from "../../../tests/mocks/usecase/borrowBooks";
import { mockSingleBorrowBooks } from "../../../tests/fixtures/borrowBooks";
import { BorrowBookNotFoundError } from "../../../errors/borrowBooks/BorrowBooksNotFoundError";
import { BookOutOfStockError } from "../../../errors/books/BookOutOfStockError";
import { MemberNotFoundError } from "../../../errors/members/MemberNotFoundError";
import { MemberPenaltizedError } from "../../../errors/members/MemberPenaltizedError";
import { BookNotFoundError } from "../../../errors/books/BookNotFoundError";
import { BorrowBookMemberMissmatchError } from "../../../errors/borrowBooks/BorrowBookMemberMissmatchError";
import { BorrowBookAlreadyReturnedError } from "../../../errors/borrowBooks/BorrowBookAlreadyReturnedError";

describe("BorrowBooksRouter", () => {
  let mockBorrowBooksUseCase: MockBorrowBooksUseCase;

  beforeAll(() => {
    mockBorrowBooksUseCase = new MockBorrowBooksUseCase();
    server.use("/borrow-books", BorrowBooksRouter(mockBorrowBooksUseCase));
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /borrow-books", () => {
    test("should return 201 with borrowed books", async () => {
      jest
        .spyOn(mockBorrowBooksUseCase, "borrow")
        .mockImplementation(() => Promise.resolve(mockSingleBorrowBooks));

      const response = await request(server)
        .post("/borrow-books")
        .send({ memberId: 1, bookId: 1 })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");

      expect(response.status).toBe(201);
      expect(mockBorrowBooksUseCase.borrow).toHaveBeenCalledTimes(1);
      expect(response.body).toStrictEqual({
        ...mockSingleBorrowBooks,
        borrowDate: mockSingleBorrowBooks.borrowDate.toISOString(),
      });
    });

    test("should returns 500 on use case error", async () => {
      jest
        .spyOn(mockBorrowBooksUseCase, "borrow")
        .mockImplementation(() => Promise.reject(Error()));
      const response = await request(server)
        .post("/borrow-books")
        .send({ memberId: 1, bookId: 1 })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");
      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual(mockInternalServerErrorResult);
    });

    test("should returns 404 when borrowed books not found", async () => {
      jest
        .spyOn(mockBorrowBooksUseCase, "borrow")
        .mockImplementation(() => Promise.reject(new BookNotFoundError()));
      const response = await request(server)
        .post("/borrow-books")
        .send({ memberId: 1, bookId: 1 })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");
      expect(response.status).toBe(404);
      expect(response.body).toStrictEqual(mockBooksNotFoundErrorResult);
    });

    test("should returns 404 when borrowed books not available", async () => {
      jest
        .spyOn(mockBorrowBooksUseCase, "borrow")
        .mockImplementation(() => Promise.reject(new BookOutOfStockError()));
      const response = await request(server)
        .post("/borrow-books")
        .send({ memberId: 1, bookId: 1 })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");
      expect(response.status).toBe(404);
      expect(response.body).toStrictEqual(mockBooksOutOfStockErrorResult);
    });

    test("should returns 404 when member is not found", async () => {
      jest
        .spyOn(mockBorrowBooksUseCase, "borrow")
        .mockImplementation(() => Promise.reject(new MemberNotFoundError()));
      const response = await request(server)
        .post("/borrow-books")
        .send({ memberId: 1, bookId: 1 })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");
      expect(response.status).toBe(404);
      expect(response.body).toStrictEqual(mockMemberNotFoundError);
    });

    test("should returns 422 when member is penaltized", async () => {
      jest
        .spyOn(mockBorrowBooksUseCase, "borrow")
        .mockImplementation(() => Promise.reject(new MemberPenaltizedError()));
      const response = await request(server)
        .post("/borrow-books")
        .send({ memberId: 1, bookId: 1 })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");
      expect(response.status).toBe(422);
      expect(response.body).toStrictEqual(mockMemberPenaltizedError);
    });
  });

  describe("PUT /borrow-books/{borrowBookId}", () => {
    test("should return 201 with borrowed books", async () => {
      const mockResult = {
        ...mockSingleBorrowBooks,
        returnDate: new Date(),
      };

      jest
        .spyOn(mockBorrowBooksUseCase, "return")
        .mockImplementation(() => Promise.resolve(mockResult));

      const response = await request(server)
        .put("/borrow-books/1")
        .send({ memberId: 1 })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");

      expect(response.status).toBe(201);
      expect(mockBorrowBooksUseCase.return).toHaveBeenCalledTimes(1);
      expect(response.body).toStrictEqual({
        ...mockSingleBorrowBooks,
        borrowDate: mockResult.borrowDate.toISOString(),
        returnDate: mockResult.returnDate.toISOString(),
      });
    });

    test("should returns 500 on use case error", async () => {
      jest
        .spyOn(mockBorrowBooksUseCase, "return")
        .mockImplementation(() => Promise.reject(Error()));
      const response = await request(server)
        .put("/borrow-books/1")
        .send({ memberId: 1 })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");
      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual(mockInternalServerErrorResult);
    });

    test("should returns 404 when borrow books data not found", async () => {
      jest
        .spyOn(mockBorrowBooksUseCase, "return")
        .mockImplementation(() =>
          Promise.reject(new BorrowBookNotFoundError())
        );
      const response = await request(server)
        .put("/borrow-books/1")
        .send({ memberId: 1 })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");
      expect(response.status).toBe(404);
      expect(response.body).toStrictEqual(mockBorrowedBooksNotFoundErrorResult);
    });

    test("should returns 422 when member is missmatch", async () => {
      jest
        .spyOn(mockBorrowBooksUseCase, "return")
        .mockImplementation(() =>
          Promise.reject(new BorrowBookMemberMissmatchError())
        );
      const response = await request(server)
        .put("/borrow-books/1")
        .send({ memberId: 1 })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");
      expect(response.status).toBe(422);
      expect(response.body).toStrictEqual(mockMemberMissmatchError);
    });

    test("should returns 422 when book is already returned", async () => {
      jest
        .spyOn(mockBorrowBooksUseCase, "return")
        .mockImplementation(() =>
          Promise.reject(new BorrowBookAlreadyReturnedError())
        );
      const response = await request(server)
        .put("/borrow-books/1")
        .send({ memberId: 1 })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");
      expect(response.status).toBe(422);
      expect(response.body).toStrictEqual(mockBookAlreadyReturned);
    });
  });
});
