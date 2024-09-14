import { HttpStatusCode } from 'axios';
import BaseError from '../BaseError';

export class BorrowBookAlreadyReturnedError extends BaseError {
  constructor() {
    super(HttpStatusCode.UnprocessableEntity);
    this.name = 'BORROWED_BOOK_ALREADY_RETURNED';
    this.message = 'The book you borrow is already returned';
  }
}
