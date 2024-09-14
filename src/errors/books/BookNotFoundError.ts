import { HttpStatusCode } from 'axios';
import BaseError from '../BaseError';

export class BookNotFoundError extends BaseError {
  constructor() {
    super(HttpStatusCode.NotFound);
    this.name = 'BOOK_NOT_FOUND';
    this.message = 'The book you\'re looking for is not exist ';
  }
}
