import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { ScreenWrapper } from './ScreenWrapper';

import { inputValue } from 'constants/input';
import { handleError } from 'utils/errorHandler';
import { isValidPassword } from 'utils/passwordValidation';
import { passwordErrorMessages } from 'constants/error';

import { success } from 'utils/toast';

import { changeUserPassword } from 'services/auth';

export const ChangePassword = props => {
  const {
    location: { state },
  } = props;
  const [currentPassword, setCurrentPassword] = useState(inputValue);
  const [newPassword, setNewPassword] = useState(inputValue);
  const [confirmPassword, setConfirmPassword] = useState(inputValue);
  const history = useHistory();

  function passwordFormValidation(name, value) {
    switch (name) {
      case 'currentPassword': {
        const { isEmpty } = isValidPassword(value);
        if (isEmpty) {
          setCurrentPassword({ value, error: passwordErrorMessages.currentPassword.isEmpty });
          return false;
        }

        setCurrentPassword({ value, error: '' });
        return true;
      }

      case 'newPassword': {
        const { isEmpty, isStrong, isUnique } = isValidPassword(
          value,
          currentPassword.value ? currentPassword.value : ''
        );
        if (isEmpty) {
          setNewPassword({ value, error: passwordErrorMessages.newPassword.isEmpty });
          return false;
        }

        if (!isStrong) {
          setNewPassword({ value, error: passwordErrorMessages.newPassword.isStrong });
          return false;
        }

        if (!isUnique) {
          setNewPassword({ value, error: passwordErrorMessages.newPassword.isUnique });
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
    const isValidCurrentPassword = passwordFormValidation('currentPassword', currentPassword.value);
    const isValidNewPassword = passwordFormValidation('newPassword', newPassword.value);
    const isValidConfirmPassword = passwordFormValidation('confirmPassword', confirmPassword.value);
    if (isValidCurrentPassword && isValidNewPassword && isValidConfirmPassword) {
      try {
        const res = await changeUserPassword(
          state.token,
          currentPassword.value,
          newPassword.value,
          confirmPassword.value
        );
        success({ title: 'Success', message: res.messages });
        history.replace('/login');
      } catch (e) {
        handleError(e, { title: 'Wrong Credentials' });
      }
    }

    return;
  };

  if (state && state.token) {
    return (
      <ScreenWrapper>
        <form className="form login-form box-shadow full-width" onSubmit={e => handleSubmit(e)} noValidate>
          <h1 className="login-screen__heading">Change Password</h1>
          <div className={`form-group form-group--required ${currentPassword.error ? 'form-group--error' : null}`}>
            <label htmfor="current-password" className="form-group__label">
              Current Password
            </label>
            <input
              type="password"
              className="form-control"
              id="current-password"
              name="currentPassword"
              onChange={e => handleChange(e)}
            />
            <small className="form-text-error">{currentPassword.error}</small>
          </div>

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
            Change Password
          </button>
        </form>
      </ScreenWrapper>
    );
  }
  return <Redirect to="/" />;
};
