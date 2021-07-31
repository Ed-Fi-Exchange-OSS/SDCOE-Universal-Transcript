import React from 'react';

import { formatDate } from 'utils/formatDate';
import { parseString } from 'utils/parseString';
import { textTransform } from 'utils/transformText';

import { orderMappings } from 'mappings/orderMapper';
import { REQUEST_DETAILS, DETAILS } from 'constants/requestDetails';

const Modal = ({ data, handleClick }) => {
  const requestType = textTransform(data.requestedType, 'uppercase');
  let requestDetails = REQUEST_DETAILS[requestType];
  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal right fade show modal--sidebar" id="StudentDetailsModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClick}>
                <span aria-hidden="true">
                  <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M26.1248 8.81375L24.186 6.875L16.4998 14.5613L8.81351 6.875L6.87476 8.81375L14.561 16.5L6.87476 24.1863L8.81351 26.125L16.4998 18.4387L24.186 26.125L26.1248 24.1863L18.4385 16.5L26.1248 8.81375Z"
                      fill="#5A5A5A"
                    />
                  </svg>
                </span>
              </button>
              <h4 className="modal-title">Request Details</h4>
            </div>
            <div className="modal-body">
              {requestDetails.map((value, index) => {
                return (
                  <div className="row" key={index}>
                    <div className="col-5">
                      <p className="key">{DETAILS[value]}: </p>
                    </div>
                    {orderMappings.uploadSignatureFilename === value ? (
                      <div className="col-7">
                        <p className="value link">{data[value]}</p>
                        <div className="image-wrapper mt-2">
                          <img src={data[orderMappings.signature]} alt="signature" />
                        </div>
                      </div>
                    ) : orderMappings.dob === value || orderMappings.requestDate === value ? (
                      <div className="col-7">
                        <p className="value">{formatDate(data[value])}</p>
                      </div>
                    ) : orderMappings.yearsAttended === value ? (
                      <div className="col-7">
                        <p className="value">{parseString(data[value]) || '-'}</p>
                      </div>
                    ) : (
                      <div className="col-7">
                        <p className="value">{data[value] || '-'}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
