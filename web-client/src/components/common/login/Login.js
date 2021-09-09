import React, { useState, useEffect, useContext } from 'react';
import queryString from 'query-string';
import { Redirect, useHistory } from 'react-router-dom';

import { getJWTtoken } from 'services/auth';
import { AuthContext } from 'context/AuthContext';

import { ACCESS_TOKEN, NAME } from 'constants/storage';

import { Loading } from 'components/common';

import Invalid from 'components/validate/Invalid';

const Login = () => {
  const { addLoginMethod } = useContext(AuthContext);
  const [name, setName] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    const { access_token, id_token } = queryString.parse(window.location.hash);

    const getToken = async () => {
      try {
        const { name, token } = await getJWTtoken(access_token, id_token);
        setName(name);
        setAccessToken(token);
        addLoginMethod({ loginWithMicrosoft: true });
        setIsLoading(false);
      } catch (error) {
        setIsLoginFailed(true);
        setLoginMessage(error?.response?.data?.messages || 'Could not login to the system');
        setIsLoading(false);
      }
    };
    getToken();
  }, [addLoginMethod]);

  if (accessToken) {
    const storageItems = [
      {
        key: ACCESS_TOKEN,
        value: accessToken,
      },
      {
        key: NAME,
        value: name,
      },
    ];

    storageItems.forEach(item => {
      localStorage.setItem(item.key, item.value);
    });
  }

  const handleClick = () => {
    history.push('/');
  };

  if (isLoading) {
    return (
      <div className="loader-full-height d-flex align-items-center justify-content-center">
        <Loading />
      </div>
    );
  } else {
    return (
      <>
        {isLoginFailed ? (
          <Invalid handleClick={handleClick} message={loginMessage} buttonTitle="Go Back" />
        ) : (
          <Redirect to="/" />
        )}
      </>
    );
  }
};

export default Login;
