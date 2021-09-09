import React from 'react';

import { checkIcon } from 'assets/images';

const RequestSuccess = ({ onClick }) => {
  return (
    <section className="section">
      <div className="container pb-5">
        <div className="box-shadow request-success text-center">
          <img src={checkIcon} alt="success-icon" />
          <div className="message">
            <p className="message__heading">Your request has been succesfully recorded.</p>
            <p className="message__para">We will get back to you soon.</p>
          </div>
          <button className="btn btn--secondary" onClick={onClick}>
            Request Another Transcript
          </button>
        </div>
      </div>
    </section>
  );
};

export default RequestSuccess;
