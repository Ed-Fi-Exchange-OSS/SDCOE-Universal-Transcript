import _get from 'lodash/get';
import { error } from 'utils/toast';

const GENERIC_ERROR = 'Oops! Something went wrong';
/**
 * Generic error handler to handle error events.
 *
 * @param {object} event
 * @param {{title, message}} options
 */
export function handleError(event, options = {}) {
  let message = _get(event, 'response.data.error.message', GENERIC_ERROR);

  error({
    title: options.title || 'Error',
    message: options.message || message,
  });
}
