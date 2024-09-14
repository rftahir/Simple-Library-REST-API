

export const mockInternalServerErrorResult = {
  error: {
    code: "INTERNAL_SERVER_ERROR",
    message: "Something went wrong, please try again later",
    status: 500,
  },
  status: "error",
}

export const mockBooksNotFoundErrorResult = {
  error: {
    code: "BOOK_NOT_FOUND",
    message: "The book you\'re looking for is not exist ",
    status: 404,
  },
  status: "error",
}

export const mockBooksOutOfStockErrorResult = {
  error: {
    code: "BOOK_OUT_OF_STOCK",
    message: "The book you\'re looking for is not available ",
    status: 404,
  },
  status: "error",
}

export const mockBorrowedBooksNotFoundErrorResult = {
  error: {
    code: "BORROWED_BOOK_NOT_FOUND",
    message: "The borrow book data you\'re looking for is not exist ",
    status: 404,
  },
  status: "error",
}

export const mockBookOutOfStockError = {
  error: {
    code: "BOOK_OUT_OF_STOCK",
    message: "The book you\'re looking for is not available",
    status: 404,
  },
  status: "error",
}

export const mockMemberNotFoundError = {
  error: {
    code: "MEMBER_NOT_FOUND",
    message: "The member you\'re looking for is not exist ",
    status: 404,
  },
  status: "error",
}

export const mockMemberPenaltizedError = {
  error: {
    code: "MEMBER_PENALTIZED",
    message: "The member you\'re looking for is penaltized ",
    status: 422,
  },
  status: "error",
}

export const mockMemberMissmatchError = {
  error: {
    code: "BORROWED_BOOK_MEMBER_MISSMATCH",
    message: "The member which borrow the book is missmatch",
    status: 422,
  },
  status: "error",
}

export const mockBookAlreadyReturned = {
  error: {
    code: "BORROWED_BOOK_ALREADY_RETURNED",
    message: "The book you borrow is already returned",
    status: 422,
  },
  status: "error",
}