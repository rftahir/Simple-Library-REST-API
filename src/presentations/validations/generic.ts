import { Schema } from "express-validator";


export const genericPaginationSchema: Schema = {
  skip: {
    isNumeric: true
  },
  take: {
    isNumeric: true
  }
}