import BaseError from './error';

/**
 * Error class for row not found for given identifier.
 */
class RowNotFoundError extends BaseError {
  /**
   * Constructor for RowNotFoundError.
   *
   * @param {String} message
   * @returns {RowNotFoundError}
   */
  constructor(message) {
    super(message);
    this.name = 'RowNotFoundError';
  }

  /**
   * Returns the formatted string representation of error.
   *
   * @returns {String}
   */
  toString() {
    return `RowNotFound Error: ${this.message}`;
  }
}

export default RowNotFoundError;
