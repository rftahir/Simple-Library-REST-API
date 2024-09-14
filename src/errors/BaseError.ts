import { isUndefined, omitBy } from 'lodash';

class BaseError extends Error {
  attribute?: Record<string, string | object> | string;

  status: number;

  constraints?: unknown;

  constructor(status: number) {
    super();
    this.status = status;
  }

  toJson() {
    return {
      status: 'error',
      error: omitBy(
        {
          code: this.name,
          message: this.message,
          status: this.status,
          constraints: this.constraints,
          attribute: this.attribute,
        },
        isUndefined,
      ),
    };
  }
}

export default BaseError;
