import BaseError from './error';

/**
 * Error class for validation error.
 */
class ValidationError extends BaseError {
  /**
   * Constructor for ValidationError.
   *
   * @param {String} message
   * @returns {ValidationError}
   */
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }

  /**
   * Returns the formatted string representation of error.
   *
   * @returns {String}
   */
  toString() {
    return `Validation Error: ${this.message}`;
  }
}

export default ValidationError;
