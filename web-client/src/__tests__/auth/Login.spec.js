import { fireEvent, getByTestId, render, cleanup } from '@testing-library/react';
import React from 'react';
import { Login } from 'components/auth/Login';

let container = null;

const mockedCredentails = {
  email_address: 'testemail@test.com',
  passowrd: 'test123',
};

afterEach(cleanup);

beforeEach(() => {
  container = render(<Login isLocalAuthEnabled={true} isMicrosoftAuthEnabled={true} />).container;
});

it('should show input field', () => {
  expect(getByTestId(container, 'email')).toBeTruthy();
});

it('should show password field', () => {
  expect(getByTestId(container, 'password')).toBeTruthy();
});

it('should show login button for local auth', () => {
  expect(getByTestId(container, 'local-login-btn')).toBeTruthy();
});

it('should show login button for microsoft login', () => {
  expect(getByTestId(container, 'login-microsoft-btn')).toBeTruthy();
});

it('should show error for invalid email address', () => {
  // enter invalid email address
  fireEvent.change(getByTestId(container, 'email'), { target: { value: 'testemail' } });

  expect(getByTestId(container, 'email-error')).toBeTruthy();
  expect(getByTestId(container, 'email-error').textContent).toBe('Please enter a valid email address');
});

it('should show error for empty email & empty password on submit', () => {
  // enter invalid email address
  fireEvent.change(getByTestId(container, 'email'), { target: { value: '' } });

  fireEvent.change(getByTestId(container, 'password'), { target: { value: '' } });

  getByTestId(container, 'local-login-btn').click();

  expect(getByTestId(container, 'email-error')).toBeTruthy();
  expect(getByTestId(container, 'email-error').textContent).toBe('Email address can not be empty');

  expect(getByTestId(container, 'password-error')).toBeTruthy();
  expect(getByTestId(container, 'password-error').textContent).toBe('Password can not be empty');
});
