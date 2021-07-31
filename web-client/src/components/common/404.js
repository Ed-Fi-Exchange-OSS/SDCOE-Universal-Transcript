import React from 'react';
import { Link } from 'react-router-dom';
import { shieldX } from 'assets/images';

const NotFoundPage = () => {
  return (
    <div className="container pb-5">
      <div className="loader-full-height d-flex align-items-center flex-column justify-content-center request-success text-center">
        <img src={shieldX} alt="status-icon" />
        <div className="message">
          <p className="message__heading">Page Not Found</p>
        </div>
        <div className="form-group text-center">
          <Link to="/" className="link  btn btn--secondary">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
