import { HttpStatusCode } from 'axios';
import BaseError from '../BaseError';

export class InternalServerError extends BaseError {
  constructor() {
    super(HttpStatusCode.InternalServerError);
    this.name = 'INTERNAL_SERVER_ERROR';
    this.message = 'Something went wrong, please try again later';
  }
}
