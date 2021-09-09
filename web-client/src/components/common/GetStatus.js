import React from 'react';

import * as colors from 'constants/colors';
import { PENDING, APPROVED, DENIED, FAILED, PROCESSING, COMPLETED, READY_TO_REVIEW } from 'constants/status';

const GetStatus = ({ status }) => {
  let color;
  const value = status.toLowerCase();
  switch (value) {
    case APPROVED: {
      color = colors.APPROVED;
      break;
    }

    case PENDING: {
      color = colors.PENDING;
      break;
    }

    case DENIED: {
      color = colors.DENIED;
      break;
    }

    case FAILED: {
      color = colors.FAILED;
      break;
    }

    case PROCESSING: {
      color = colors.PROCESSING;
      break;
    }

    case READY_TO_REVIEW: {
      color = colors.PENDING;
      break;
    }

    case COMPLETED: {
      color = colors.COMPLETED;
      break;
    }

    default:
      color = colors.APPROVED;
      break;
  }
  return (
    <>
      <svg width="10" height="10" viewBox="0 0 10 10" fill={color} xmlns="http://www.w3.org/2000/svg">
        <circle cx="5" cy="5" r="5" />
      </svg>
      <span className="ml-2">{status}</span>
    </>
  );
};

export default GetStatus;
