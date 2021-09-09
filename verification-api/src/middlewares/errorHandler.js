const HttpStatus = require('http-status-codes');

const { logger } = require('../utils/logger');
const buildError = require('../utils/buildError');

/**
 * Error response middleware for 404 not found.
 *
 * @param {Object} req
 * @param {Object} res
 */
function notFound(req, res) {
  res.status(HttpStatus.NOT_FOUND).json({
    error: {
      code: HttpStatus.NOT_FOUND,
      message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
    },
  });
}

/**
 * Method not allowed error middleware. This middleware should be placed at
 * the very bottom of the middleware stack.
 *
 * @param {Object} req
 * @param {Object} res
 */
function methodNotAllowed(req, res) {
  res.status(HttpStatus.METHOD_NOT_ALLOWED).json({
    error: {
      code: HttpStatus.METHOD_NOT_ALLOWED,
      message: HttpStatus.getStatusText(HttpStatus.METHOD_NOT_ALLOWED),
    },
  });
}

/**
 * To handle errors from body parser for cases such as invalid JSON sent through
 * the body (https://github.com/expressjs/body-parser#errors).
 *
 * @param  {Object}   err
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
function bodyParser(err, req, res, next) {
  logger.error(err.message);

  res.status(err.status).json({
    error: {
      code: err.status,
      message: HttpStatus.getStatusText(err.status),
    },
  });
}

/**
 * Generic error response middleware for validation and internal server errors.
 *
 * @param  {Object}   err
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
function genericErrorHandler(err, req, res, next) {
  logger.error(err.stack);
  const error = buildError(err);

  res.status(error.code).json({ error });
}

module.exports = {
  notFound,
  methodNotAllowed,
  bodyParser,
  genericErrorHandler,
};
