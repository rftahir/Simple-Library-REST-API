import { HttpStatusCode } from 'axios';
import BaseError from '../BaseError';

export class MemberPenaltizedError extends BaseError {
  constructor() {
    super(HttpStatusCode.UnprocessableEntity);
    this.name = 'MEMBER_PENALTIZED';
    this.message = 'The member you\'re looking for is penaltized ';
  }
}
