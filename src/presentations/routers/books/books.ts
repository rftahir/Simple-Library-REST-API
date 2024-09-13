import { Request, Response, Router } from "express";
import { IBooksUseCase } from "../../../domain/interface/use-cases/books";
import { handleRequestError } from "../../handlers/handleRequestError";
import { HttpStatusCode } from "axios";



export default function BooksRouter(booksUseCase: IBooksUseCase){
  const router = Router()

  /**
    * Spec for the route /v1/books.
    *
    * @swagger
    * /v1/books:
    *   get:
    *     summary: Get all books
    *     tags: [Books]
    *     parameters:
    *       - name: take
    *         in: query
    *         required: false
    *         description: Number of data returned per page
    *         schema:
    *           type: Integer
    *           minimum: 1
    *       - name: skip
    *         in: query
    *         description: Skipped data for returned page
    *         required: false
    *         schema:
    *           type: Integer
    *           minimum: 0
    *     responses:
    *       200:
    *         description: Successful response
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 data:
    *                   types: array
    *                   items:
    *                     type: object
    *                     properties:
    *                       id:
    *                         type: string
    *                       code:
    *                         type: string
    *                       title:
    *                         type: string
    *                       author:
    *                         type: string
    *                       stock:
    *                         type: number
    *                 totalData:
    *                   type: number
    *                 totalPage:
    *                   type: number
    *                 currentPage:
    *                   type: number
    *       500:
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
  router.get(
    '/',
    async (req: Request, res: Response) => {
      try {
        const result = await booksUseCase.get();
        res.status(HttpStatusCode.Ok).send(result);
      } catch (error) {
        handleRequestError(res, error);
      }
    }
  )

  return router;
}