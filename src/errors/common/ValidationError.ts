import { HttpStatusCode } from 'axios';
import BaseError from '../BaseError';
import { ValidationError } from 'express-validator';

function getAllValidationErrorConstraints(
  validationErrors: ValidationError[],
): Record<string, string | object> {
  const ValidationError: Record<string, string | object> = {};

  validationErrors.forEach((value: ValidationError) => {
    if(value.type === 'field'){
      ValidationError[value.path] = value.msg;
    } else if (value.type === 'unknown_fields'){
      ValidationError[value.msg] = value.fields
    }
  });

  return ValidationError;
}

export class BaseValidationError extends BaseError {
  constructor(error: ValidationError[]) {
    super(HttpStatusCode.UnprocessableEntity);
    this.name = 'VALIDATION_ERROR';
    this.message = 'Validation Error';
    const constraints = getAllValidationErrorConstraints(error);
    this.constraints = constraints;
  }
}
