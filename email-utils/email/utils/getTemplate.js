const {
  RESET_PASSWORD,
  REQUEST_DENIED,
  RECORD_NOT_FOUND,
  PASSWORD_CHANGED,
  REQUEST_CONFIRMATION,
  REQUEST_APPROVED_STUDENT,
  REQUEST_APPROVED_DISTRICT,
  REQUEST_INITIAL_APPROVED_STUDENT,
} = require('../constants/templateMappings');

const { logger } = require('./logger');

const getTemplate = (title) => {
  switch (title) {
    case 'RESET_PASSWORD':
      return RESET_PASSWORD;
    case 'REQUEST_DENIED':
      return REQUEST_DENIED;
    case 'PASSWORD_CHANGED':
      return PASSWORD_CHANGED;
    case 'RECORD_NOT_FOUND':
      return RECORD_NOT_FOUND;
    case 'REQUEST_CONFIRMATION':
      return REQUEST_CONFIRMATION;
    case 'REQUEST_APPROVED_STUDENT':
      return REQUEST_APPROVED_STUDENT;
    case 'REQUEST_APPROVED_DISTRICT':
      return REQUEST_APPROVED_DISTRICT;
    case 'REQUEST_INITIAL_APPROVED_STUDENT':
      return REQUEST_INITIAL_APPROVED_STUDENT;
    default:
      logger.error(`Unknown email template requested: ${title}`);
      throw `Unknown email template requested: ${title}`;
  }
};

module.exports = getTemplate;
