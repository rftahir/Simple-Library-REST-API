import { Schema } from "express-validator";


export const borrowBookValidationSchema: Schema = {
  bookId: {
    in: ["body"],
    isInt: {
      options: { min: 1 },
      errorMessage: "bookId must be and integer greater than or equal 1"
    }
  },
  memberId: {
    in: ["body"],
    isInt: {
      options: { min: 1 },
      errorMessage: "memberId must be and integer greater than or equal 1"
    }
  }
}

export const returnBookValidationSchema: Schema = {
  borrowBookId: {
    in: ['params'],
    isInt: {
      options: { min: 1 },
      errorMessage: "borrowBookId must be and integer greater than or equal 1"
    }
  },
  memberId: {
    in: ['body'],
    isInt: {
      options: { min: 1 },
      errorMessage: "memberId must be and integer greater than or equal 1"
    }
  }
}