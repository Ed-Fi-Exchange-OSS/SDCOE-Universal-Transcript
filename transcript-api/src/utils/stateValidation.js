const { REQUEST_STATUS } = require('../constants/state');
const { TRANSCRIPT_TYPE } = require('../constants/transcript-type');

/**
 * Validates whether the requested state is valid or not.
 *
 * @param {previousState} previousState Current value status of the request.
 * @param {nextState} nextState Requested value of status to be updated.
 * @param {typeOfTranscript} typeOfTranscript Requested transcript type i.e ROP/Standard.
 * @returns {boolean}
 */
export function stateValidation(previousState, nextState, typeOfTranscript) {
  switch (previousState) {
    case REQUEST_STATUS.PENDING: {
      return nextState === REQUEST_STATUS.APPROVED || nextState === REQUEST_STATUS.DENIED;
    }

    case REQUEST_STATUS.APPROVED: {
      return nextState === REQUEST_STATUS.PROCESSING || nextState === REQUEST_STATUS.DENIED;
    }

    case REQUEST_STATUS.DENIED: {
      return nextState === REQUEST_STATUS.APPROVED;
    }

    case REQUEST_STATUS.COMPLETED: {
      switch (typeOfTranscript) {
        case TRANSCRIPT_TYPE.ROP:
          return nextState === REQUEST_STATUS.READY_TO_EMAIL;

        case TRANSCRIPT_TYPE.STANDARD_PDF:
          return nextState === REQUEST_STATUS.APPROVED;

        default:
          return false;
      }
    }

    case REQUEST_STATUS.FAILED: {
      return nextState === REQUEST_STATUS.APPROVED;
    }

    case REQUEST_STATUS.READY_TO_REVIEW: {
      return nextState === REQUEST_STATUS.DENIED;
    }

    case REQUEST_STATUS.PROCESSING: {
      switch (typeOfTranscript) {
        case TRANSCRIPT_TYPE.ROP:
          return nextState === REQUEST_STATUS.READY_TO_REVIEW;

        case TRANSCRIPT_TYPE.STANDARD_PDF:
          return nextState === REQUEST_STATUS.COMPLETED;

        default:
          return false;
      }
    }

    default:
      return false;
  }
}
