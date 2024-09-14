import { HttpStatusCode } from 'axios';
import BaseError from '../BaseError';

export class BorrowBookNotFoundError extends BaseError {
  constructor() {
    super(HttpStatusCode.NotFound);
    this.name = 'BORROWED_BOOK_NOT_FOUND';
    this.message = 'The borrow book data you\'re looking for is not exist ';
  }
}
