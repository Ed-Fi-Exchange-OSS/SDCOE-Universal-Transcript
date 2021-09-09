import BaseError from './error';

/**
 * Error class for Authentication Error.
 */
class AuthenticationError extends BaseError {
  /**
   * Constructor for AuthenticationError.
   *
   * @param {String} message
   * @returns {AuthenticationError}
   */
  constructor(message) {
    super(message);
    this.name = 'AuthenticationError';
  }

  /**
   * Returns the formatted string representation of error.
   *
   * @returns {String}
   */
  toString() {
    return `Authentication Error: ${this.message}`;
  }
}

export default AuthenticationError;
