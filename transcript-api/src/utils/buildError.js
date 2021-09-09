import HttpStatus from 'http-status-codes';

import TokenError from '../errors/token';
import ForbiddenError from '../errors/forbidden';
import ValidationError from '../errors/validation';
import RowNotFoundError from '../errors/rownotfound';
import AuthenticationError from '../errors/authentication';

/**
 * Build error response for validation errors.
 *
 * @param   {Error} err
 * @returns {Object}
 */
function buildError(err) {
  console.log(err);
  // Validation errors
  if (err.isJoi) {
    return {
      code: HttpStatus.BAD_REQUEST,
      message: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
      details:
        err.details &&
        err.details.map((err) => {
          return {
            message: err.message,
            param: err.path.join('.'),
          };
        }),
    };
  }

  // HTTP errors
  if (err.isBoom) {
    return {
      code: err.output.statusCode,
      message: err.output.payload.message || err.output.payload.error,
    };
  }

  if (err instanceof TokenError || err instanceof AuthenticationError) {
    return {
      code: HttpStatus.UNAUTHORIZED,
      message: err.message || HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED),
    };
  }

  if (err instanceof RowNotFoundError) {
    return {
      code: HttpStatus.NOT_FOUND,
      message: err.message ||  HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
    };
  }

  if (err instanceof ValidationError) {
    return {
      code: HttpStatus.BAD_REQUEST,
      message: err.message || HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
    };
  }

  if (err instanceof ForbiddenError) {
    return {
      code: HttpStatus.FORBIDDEN,
      message: err.message || HttpStatus.getStatusText(HttpStatus.FORBIDDEN),
    };
  }

  // Return INTERNAL_SERVER_ERROR for all other cases
  return {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
  };
}

export default buildError;
