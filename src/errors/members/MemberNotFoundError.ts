import { HttpStatusCode } from 'axios';
import BaseError from '../BaseError';

export class MemberNotFoundError extends BaseError {
  constructor() {
    super(HttpStatusCode.NotFound);
    this.name = 'MEMBER_NOT_FOUND';
    this.message = 'The member you\'re looking for is not exist ';
  }
}
