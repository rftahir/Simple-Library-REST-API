import { HttpStatusCode } from 'axios';
import BaseError from '../BaseError';

export class BorrowBookMemberMissmatchError extends BaseError {
  constructor() {
    super(HttpStatusCode.UnprocessableEntity);
    this.name = 'BORROWED_BOOK_MEMBER_MISSMATCH';
    this.message = 'The member which borrow the book is missmatch';
  }
}
