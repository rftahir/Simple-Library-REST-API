import { Request, Response, Router } from "express";
import { IBorrowBooksUseCase } from "../../../domain/interface/use-cases/borrowBooks";
import { handleRequestError } from "../../handlers/handleRequestError";
import { HttpStatusCode } from "axios";

export default function BorrowBooksRouter(
  borrowBooksUseCase: IBorrowBooksUseCase
) {
  const router = Router();

  /**
   * Spec for the route /v1/borrow-books.
   *
   * @swagger
   * /v1/borrow-books:
   *   post:
   *     summary: Borrow a book
   *     tags: [Borrow Book]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               bookId:
   *                 type: integer
   *               memberId:
   *                 type: integer
   *     responses:
   *       201:
   *         description: Successful response
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: number
   *                 bookId:
   *                   type: number
   *                 memberId:
   *                   type: number
   *                 borrowDate:
   *                   type: string
   *                   format: date
   *                 returnDate:
   *                   type: string
   *                   format: date
   *                   nullable: true
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: object
   *                   properties:
   *                     name:
   *                       type: string
   *                       example: INTERNAL_SERVER_ERROR
   *                     message:
   *                       type: string
   *                       example: Something went wrong, please try again later
   *                     status:
   *                       type: number
   *                       example: 500
   *                 status:
   *                   type: string
   *                   example: error
   */

  router.post("/", async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const { bookId, memberId } = body;

      const result = await borrowBooksUseCase.borrow(bookId, memberId);
      res.status(HttpStatusCode.Created).send(result);
    } catch (error) {
      handleRequestError(res, error);
    }
  });

  /**
   * Spec for the route /v1/borrow-books/{borrowBookId}.
   *
   * @swagger
   * /v1/borrow-books/{borrowBookId}:
   *   put:
   *     summary: Borrow a book
   *     tags: [Borrow Book]
   *     parameters:
   *       - name: borrowBookId
   *         in: path
   *         required: true
   *         description: ID of borrowBook to retrieve
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               memberId:
   *                 type: integer
   *     responses:
   *       201:
   *         description: Successful response
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 bookId:
   *                   type: integer
   *                 memberId:
   *                   type: integer
   *                 borrowDate:
   *                   type: string
   *                   format: date
   *                 returnDate:
   *                   type: string
   *                   format: date
   *                   nullable: true
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: object
   *                   properties:
   *                     name:
   *                       type: string
   *                       example: INTERNAL_SERVER_ERROR
   *                     message:
   *                       type: string
   *                       example: Something went wrong, please try again later
   *                     status:
   *                       type: number
   *                       example: 500
   *                 status:
   *                   type: string
   *                   example: error
   */

  router.put("/:borrowBookId", async (req: Request, res: Response) => {
    try {
      const { body, params } = req;
      const { memberId } = body;
      const { borrowBookId } = params;

      const result = await borrowBooksUseCase.return(Number(borrowBookId), memberId);
      res.status(HttpStatusCode.Created).send(result);
    } catch (error) {
      handleRequestError(res, error);
    }
  });

  return router;
}
