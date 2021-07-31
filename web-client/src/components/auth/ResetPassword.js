import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { Redirect, useHistory } from 'react-router-dom';

import { Loading } from 'components/common';
import { ScreenWrapper } from './ScreenWrapper';
import { ResendResetLink } from './ResendResetLink';

import { inputValue } from 'constants/input';
import { isTokenExpired } from 'utils/validToken';
import { handleError } from 'utils/errorHandler';
import { isValidPassword } from 'utils/passwordValidation';
import { passwordErrorMessages } from 'constants/error';

import { success } from 'utils/toast';

import { resetUserPassword } from 'services/auth';

export const ResetPassword = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [resetToken, setResetToken] = useState(null);
  const [isExpiredToken, setIsExpiredToken] = useState(null);
  const [newPassword, setNewPassword] = useState(inputValue);
  const [confirmPassword, setConfirmPassword] = useState(inputValue);

  useEffect(() => {
    const { token } = queryString.parse(window.location.search);
    if (!!token) {
      const isExpired = isTokenExpired(token);
      setResetToken(token);
      setIsExpiredToken(isExpired);
    }
    setIsLoading(false);
  }, []);

  function passwordFormValidation(name, value) {
    switch (name) {
      case 'newPassword': {
        const { isEmpty, isStrong } = isValidPassword(value);
        if (isEmpty) {
          setNewPassword({ value, error: passwordErrorMessages.newPassword.isEmpty });
          return false;
        }

        if (!isStrong) {
          setNewPassword({ value, error: passwordErrorMessages.newPassword.isStrong });
          return false;
        }

        setNewPassword({ value, error: '' });
        return true;
      }

      case 'confirmPassword': {
        const { isEmpty, isUnique } = isValidPassword(value, newPassword.value ? newPassword.value : '');
        if (isEmpty) {
          setConfirmPassword({ value, error: passwordErrorMessages.confirmPassword.isEmpty });
          return false;
        }

        if (isUnique) {
          setConfirmPassword({ value, error: passwordErrorMessages.confirmPassword.isUnique });
          return false;
        }

        setConfirmPassword({ value, error: '' });
        return true;
      }

      default:
        return false;
    }
  }

  const handleChange = e => {
    const { name, value } = e.target;
    passwordFormValidation(name, value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const isValidNewPassword = passwordFormValidation('newPassword', newPassword.value);
    const isValidConfirmPassword = passwordFormValidation('confirmPassword', confirmPassword.value);
    if (isValidNewPassword && isValidConfirmPassword) {
      try {
        const res = await resetUserPassword(resetToken, newPassword.value, confirmPassword.value);
        success({ title: 'Success', message: res.messages });
        history.replace('/login');
      } catch (e) {
        handleError(e, { title: 'Failed', message: 'Password reset link expired' });
      }
    }

    return;
  };

  if (isLoading) {
    return (
      <div className="loader-full-height d-flex align-items-center justify-content-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      {resetToken ? (
        isExpiredToken ? (
          <ResendResetLink token={resetToken} />
        ) : (
          <ScreenWrapper>
            <form className="form login-form box-shadow full-width" onSubmit={e => handleSubmit(e)} noValidate>
              <h1 className="login-screen__heading">Reset Password</h1>
              <div className={`form-group form-group--required ${newPassword.error ? 'form-group--error' : null}`}>
                <label htmfor="new-password" className="form-group__label">
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="new-password"
                  name="newPassword"
                  onChange={e => handleChange(e)}
                />
                <small className="form-text-error">{newPassword.error}</small>
              </div>

              <div className={`form-group form-group--required ${confirmPassword.error ? 'form-group--error' : null}`}>
                <label htmfor="confirm-password" className="form-group__label">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirm-password"
                  name="confirmPassword"
                  onChange={e => handleChange(e)}
                />
                <small className="form-text-error">{confirmPassword.error}</small>
              </div>

              <button type="submit" className="btn btn--primary btn--block form-group">
                Request Password Reset
              </button>
            </form>
          </ScreenWrapper>
        )
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};
