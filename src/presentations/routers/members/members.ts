import { Request, Router, Response } from "express";
import { handleRequestError } from "../../handlers/handleRequestError";
import { HttpStatusCode } from "axios";
import { IMembersUseCase } from "../../../domain/interface/use-cases/members";

export default function MembersRouter(membersUseCase: IMembersUseCase) {
  const router = Router();

  /**
   * Spec for the route /api/v1/members.
   *
    * @swagger
    * /api/v1/members:
    *   get:
    *     summary: Get all members
    *     tags: [Members]
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
    *                       name:
    *                         type: string
    *                       borrowedBooksCount:
    *                         type: number
    *                       isPenaltized:
    *                         type: boolean
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
  router.get("/", async (req: Request, res: Response) => {
    try {
      const result = await membersUseCase.get();
      res.status(HttpStatusCode.Ok).send(result);
    } catch (error) {
      handleRequestError(res, error);
    }
  });

  return router;
}
