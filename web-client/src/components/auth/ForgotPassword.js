import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ScreenWrapper } from './ScreenWrapper';

import { checkIcon, shieldX } from 'assets/images';
import { inputValue } from 'constants/input';

import { validEmail } from 'utils/validate';

import { forgotPassword } from 'services/auth';

export const ForgotPassword = () => {
  const [email, setEmail] = useState(inputValue);
  const [isSuccessfull, setIsSuccessfull] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  function emailValidation(value) {
    if (!value) {
      setEmail({ value, error: 'Email address can not be empty' });
      return;
    }

    const isValidEmail = validEmail(value);
    if (isValidEmail) {
      setEmail({ value, error: '' });
      return true;
    }

    setEmail({ value, error: 'Please a enter valid email address' });
    return false;
  }

  const handleChange = e => {
    const { value } = e.target;
    emailValidation(value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const isValidEmail = emailValidation(email.value);
    if (isValidEmail) {
      try {
        await forgotPassword(email.value);
        setIsSuccessfull(true);
      } catch (e) {
        setIsFailed(true);
      }
    }

    return;
  };

  const StatusCard = ({ status, heading, message }) => {
    return (
      <section className="section">
        <div className="container pb-5">
          <div className="box-shadow request-success text-center">
            <img src={`${status === 'success' ? checkIcon : shieldX}`} alt="status-icon" />
            <div className="message">
              <p className="message__heading">{heading}</p>
              <p className="message__para">{message}</p>
            </div>
            <div className="form-group text-center">
              <Link to="/" className="link  btn btn--secondary">
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  };

  if (isSuccessfull) {
    return (
      <StatusCard status="success" heading="Success" message="Reset link has been successfully sent to  your email" />
    );
  }

  if (isFailed) {
    return (
      <StatusCard
        status="failed"
        heading="Invalid email addreess"
        message="Make sure you have entered the correct email address & request again."
      />
    );
  }

  return (
    <ScreenWrapper>
      <form className="form login-form box-shadow full-width" onSubmit={e => handleSubmit(e)} noValidate>
        <h1 className="login-screen__heading">Forgot Password</h1>
        <div className={`form-group form-group--required ${email.error ? 'form-group--error' : null}`}>
          <label htmfor="email" className="form-group__label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            data-testid="email"
            placeholder=""
            name="email"
            onChange={e => handleChange(e)}
          />
          <small data-testid="email-error" className="form-text-error">
            {email.error}
          </small>
        </div>

        <button type="submit" className="btn btn--primary btn--block form-group">
          Request Password Reset
        </button>
        <div className="form-group text-center">
          <Link to="/login" className="link">
            Back to login
          </Link>
        </div>
      </form>
    </ScreenWrapper>
  );
};
