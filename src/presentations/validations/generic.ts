import { Schema } from "express-validator";


export const genericPaginationSchema: Schema = {
  skip: {
    isInt: {
      options: {min: 0},
      errorMessage: "skip must be an integer greater than or equal 0"
    }
  },
  take: {
    isInt: {
      options: {min: 0},
      errorMessage: "take must be an integer greater than or equal 1"
    }
  }
}