import React, { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';

import config from 'config';
import { AuthContext } from 'context/AuthContext';

import { validEmail } from 'utils/validate';
import { handleError } from 'utils/errorHandler';
import { hasLoggedInBefore } from 'utils/hasLoggedIn';
import { localItemsStorage } from 'utils/localItemsStorage';

import { inputValue } from 'constants/input';
import { isEmptyInputField } from 'utils/inputFieldValidation';

import { basicAuth } from 'services/auth';

import { ACCESS_TOKEN, NAME } from 'constants/storage';

import { ScreenWrapper } from './ScreenWrapper';
import { microsoftLogo } from 'assets/images';

export const Login = ({ isLocalAuthEnabled, isMicrosoftAuthEnabled }) => {
  const history = useHistory();
  const { addLoginMethod } = useContext(AuthContext);
  const [email, setEmail] = useState(inputValue);
  const [password, setPassword] = useState(inputValue);

  function emailValidation(value) {
    const isValidEmail = validEmail(value);
    if (isValidEmail) {
      setEmail({ value, error: '' });
    } else {
      setEmail({ value, error: 'Please enter a valid email address' });
    }
  }

  function passwordValidation(value) {
    const isPasswordFieldEmpty = isEmptyInputField(value);
    if (isPasswordFieldEmpty) {
      setPassword({ value, error: 'Password can not be empty' });
    } else {
      setPassword({ value, error: '' });
    }
  }

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        emailValidation(value);
        break;

      case 'password':
        passwordValidation(value);
        break;

      default:
        break;
    }
  };

  const validateForm = () => {
    const emptyEmail = isEmptyInputField(email.value);
    const emptyPassword = isEmptyInputField(password.value);
    if (emptyEmail) {
      setEmail({ ...email, error: 'Email address can not be empty' });
    }

    if (emptyPassword) {
      setPassword({ ...password, error: 'Password can not be empty' });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    validateForm();

    if (!email.error && !password.error) {
      try {
        const { token, name } = await basicAuth(email.value, password.value);
        if (hasLoggedInBefore(token)) {
          const storageItems = [
            {
              key: ACCESS_TOKEN,
              value: token,
            },
            {
              key: NAME,
              value: name,
            },
          ];
          localItemsStorage(storageItems);
          addLoginMethod({
            localAuthLogin: true,
          });
          history.push('/');
        } else {
          history.push({
            pathname: '/change-password',
            state: { token },
          });
        }
      } catch (e) {
        handleError(e, { title: 'Login failed' });
      }
    }

    return;
  };

  return (
    <ScreenWrapper>
      <div className="box-shadow full-width">
        <form className="form login-form" onSubmit={e => handleSubmit(e)} noValidate>
          <h1 className="login-screen__heading">Login</h1>
          {isLocalAuthEnabled && (
            <>
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
              <div className={`form-group form-group--required ${password.error ? 'form-group--error' : null}`}>
                <label htmfor="password" className="form-group__label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  data-testid="password"
                  name="password"
                  onChange={e => handleChange(e)}
                />
                <small data-testid="password-error" className="form-text-error">
                  {password.error}
                </small>
              </div>

              <div className="form-group">
                <Link to="/forgot-password" className="link">
                  Forgot your password?
                </Link>
              </div>
              <button data-testid="local-login-btn" type="submit" className="btn btn--primary btn--block">
                Login
              </button>
            </>
          )}
        </form>
        {isLocalAuthEnabled && isMicrosoftAuthEnabled && <div className="separator login-screen__separator"></div>}
        {isMicrosoftAuthEnabled && (
          <button
            className="btn btn--secondary-dark btn--block"
            data-testid="login-microsoft-btn"
            onClick={() => (window.location.href = config.loginWithMicrosoftURL)}
          >
            <img src={microsoftLogo} alt="microsoft-icon" className="mr-2" />
            Login with Microsoft
          </button>
        )}
      </div>
    </ScreenWrapper>
  );
};
