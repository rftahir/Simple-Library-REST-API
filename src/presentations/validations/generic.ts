import { Schema } from "express-validator";


export const genericPaginationSchema: Schema = {
  skip: {
    in: ['query'],
    optional: true,
    isInt: {
      options: {min: 0},
      errorMessage: "skip must be an integer greater than or equal 0"
    }
  },
  take: {
    in: ['query'],
    optional: true,
    isInt: {
      options: {min: 0},
      errorMessage: "take must be an integer greater than or equal 1"
    }
  }
}