import { HttpStatusCode } from 'axios';
import BaseError from '../BaseError';

export class BookOutOfStockError extends BaseError {
  constructor() {
    super(HttpStatusCode.NotFound);
    this.name = 'BOOK_OUT_OF_STOCK';
    this.message = 'The book you\'re looking for is not available ';
  }
}
