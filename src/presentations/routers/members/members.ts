import { Request, Router, Response } from "express";
import { handleRequestError } from "../../handlers/handleRequestError";
import { HttpStatusCode } from "axios";
import { IMembersUseCase } from "../../../domain/interface/use-cases/members";
import { ValidationMiddleware } from "../../middlewares/ValidationMiddleware";
import { checkSchema } from "express-validator";
import { genericPaginationSchema } from "../../validations/generic";

export default function MembersRouter(membersUseCase: IMembersUseCase) {
  const router = Router();

  /**
   * Spec for the route /v1/members.
   *
   * @swagger
   * /v1/members:
   *   get:
   *     summary: Get all members
   *     tags: [Members]
   *     parameters:
   *       - name: take
   *         in: query
   *         required: false
   *         description: Number of records returned per page
   *         schema:
   *           type: integer
   *           minimum: 1
   *       - name: skip
   *         in: query
   *         required: false
   *         description: Number of records to skip for pagination
   *         schema:
   *           type: integer
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
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       id:
   *                         type: integer
   *                       code:
   *                         type: string
   *                       name:
   *                         type: string
   *                       penaltyEndDate:
   *                         type: string
   *                         format: date
   *                         nullable: true
   *                       isPenaltized:
   *                         type: boolean
   *                       borrowedBooksCount:
   *                         type: number
   *                 totalData:
   *                   type: number
   *                 totalPage:
   *                   type: number
   *                 currentPage:
   *                   type: number
   *       422:
   *         description: Validation error
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
   *                       example: VALIDATION_ERROR
   *                     message:
   *                       type: string
   *                       example: ValidationError
   *                     constraint:
   *                       type: object
   *                       properties: 
   *                         additionalProperties: 
   *                           type: string
   *                           example: {"skip": "skip must be and integer greater than or equal 0"}
   *                     status:
   *                       type: number
   *                       example: 422
   *                 status:
   *                   type: string
   *                   example: error
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
  router.get(
    "/",
    ValidationMiddleware(checkSchema(genericPaginationSchema)),
    async (req: Request, res: Response) => {
      try {
        const { validatedBody } = req;
        const { skip, take } = validatedBody;

        const result = await membersUseCase.get({
          skip: Number(skip),
          take: Number(take),
        });
        res.status(HttpStatusCode.Ok).send(result);
      } catch (error) {
        handleRequestError(res, error);
      }
    }
  );

  return router;
}
