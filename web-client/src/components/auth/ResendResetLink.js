import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';

import { shieldX } from 'assets/images';

import { handleError } from 'utils/errorHandler';

import { forgotPassword } from 'services/auth';

import { success } from 'utils/toast';
import { Loading } from 'components/common';

export const ResendResetLink = props => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const { email } = jwtDecode(props.token);
    try {
      const res = await forgotPassword(email);
      setIsLoading(false);
      success({ title: 'Success', message: `${res.messages} Please check your email to reset your password.` });
    } catch (e) {
      handleError(e, { title: 'Failed' });
    }
  };

  if (isLoading) {
    return (
      <div className="loader-full-height d-flex align-items-center justify-content-center">
        <Loading />
      </div>
    );
  }

  return (
    <form className="box-shadow not-verified text-center" onSubmit={e => handleSubmit(e)} noValidate>
      <img src={shieldX} alt="Invalid reset link" />
      <div className="message">
        <p className="message__heading">Password reset link has been expired.</p>
      </div>
      <button type="submit" className="btn btn--primary form-group">
        Resend
      </button>
      <div className="form-group text-center">
        <Link to="/" className="link">
          Back to home
        </Link>
      </div>
    </form>
  );
};
