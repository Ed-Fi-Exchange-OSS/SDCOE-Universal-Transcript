import React from 'react';

import { PDF_TYPES } from 'constants/data';
import { textTransform } from 'utils/transformText';
import { ACTIONS, DENY_TITLE, VIEW_TITLE, REVIEW_TITLE, SHOW_REVIEW_TITLE } from 'constants/actions';

import { PopUpModal } from 'components/staff/modal';

const ActionList = props => {
  const {
    status,
    row: {
      original: { firstName, lastName, requestId, typeOfTranscript },
    },
    role,
    handleAction,
    viewDetails,
    row: { original },
  } = props;
  const id = requestId;
  const studentName = textTransform(firstName + lastName, 'lowercase');
  const type = textTransform(typeOfTranscript, 'lowercase');
  const userRole = textTransform(role, 'uppercase');
  // options as a user role i.e staff or district
  const options = ACTIONS[userRole];
  let statusKey = textTransform(status, 'uppercase').split(' ').join('_');

  //Filter review option based on the transcript format i.e standard, rop or json
  let isReview = false;
  if (typeOfTranscript === PDF_TYPES.ropPDF.value) {
    isReview = true;
  }

  if (options[statusKey]) {
    return options[statusKey].map((option, index) => {
      switch (option.title) {
        case VIEW_TITLE:
          return (
            <button
              className={`dropdown-item ${option.title === DENY_TITLE ? 'reject' : ''} `}
              onClick={() => viewDetails(original)}
              key={index}
            >
              {option.title}
            </button>
          );

        case REVIEW_TITLE:
          return (
            isReview && <PopUpModal key={index} handleAction={() => handleAction(id, option.callback)} btnClass="dropdown-item" btnLabel={option.title} data={original} />
          );

        case SHOW_REVIEW_TITLE: {
          if (typeOfTranscript === PDF_TYPES.ropPDF.value) {
            return <PopUpModal key={index} handleAction={() => handleAction(id, option.callback)} btnClass="dropdown-item" btnLabel={option.title} data={original} isDisabled={true} />
          }

          return null;
        }


        default:
          return (
            <button
              className={`dropdown-item ${option.title === DENY_TITLE ? 'reject' : ''} `}
              onClick={() => handleAction(id, option.callback, studentName, type, status)}
              key={index}
            >
              {option.title}
            </button>
          );
      }
    });
  }
};

const GetActions = props => {
  const { status } = props.status;
  return (
    <div className="dropdown">
      <button
        className="btn btn--secondary btn--action"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10ZM18 10C16.9 10 16 10.9 16 12C16 13.1 16.9 14 18 14C19.1 14 20 13.1 20 12C20 10.9 19.1 10 18 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
            fill="#0AB1F1"
          />
        </svg>
      </button>
      <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
        <ActionList status={status} {...props} />
      </div>
    </div>
  );
};

export default GetActions;
