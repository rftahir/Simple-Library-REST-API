import { NextFunction, Request, Response } from "express";
import { ContextRunner, matchedData } from "express-validator";
import { handleRequestError } from "../handlers/handleRequestError";
import { BaseValidationError } from "../../errors/common/ValidationError";


export function ValidationMiddleware (validations: ContextRunner[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      for (const validation of validations) {
        const result = await validation.run(req);
        if (!result.isEmpty()) {
          throw new BaseValidationError(result.array());
        }
      }

      req.validatedBody = matchedData(req);
      next();
    } catch (error) {
      handleRequestError(res, error);
    }
  };
};