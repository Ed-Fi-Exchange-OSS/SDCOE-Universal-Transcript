import React, { useState, useContext } from 'react';
import jwtDecode from 'jwt-decode';
import config from 'config';
import { AuthContext } from 'context/AuthContext';
import { useHistory } from 'react-router-dom';

import { getAccessToken, getKey } from 'utils/getKey';
import { error } from 'utils/toast';
import { Nav } from 'components/common/layout';
import { logo, menu, help, person, dropDown } from 'assets/images';

export const Header = ({ logOut, isLocalAuthEnabled, isMicrosoftAuthEnabled }) => {
  const [showMenu, setShowMenu] = useState(false);
  const accessToken = getAccessToken();
  const name = getKey('name', accessToken);
  const history = useHistory();
  const { loginMethod } = useContext(AuthContext);
  let isLocalLogin = loginMethod.localAuthLogin;
  const loginHandler = () => {
    if (isLocalAuthEnabled && isMicrosoftAuthEnabled) {
      return (window.location.href = '/login');
    }

    if (isLocalAuthEnabled) {
      return (window.location.href = '/login');
    }

    if (isMicrosoftAuthEnabled) {
      return (window.location.href = config.loginWithMicrosoftURL);
    }

    error({ title: 'Login Failed', message: 'No Authentication Method is provided' });
  };

  const handleChangePassword = () => {
    return history.push({
      pathname: '/change-password',
      state: { token: accessToken },
    });
  };

  if (!!accessToken) {
    const { type } = jwtDecode(accessToken);
    isLocalLogin = (type === 'BASIC' ? true : false) || loginMethod.localAuthLogin;
  }

  return (
    <header className="header">
      <div className="top-bar p-3 navbar-expand-sm">
        <div className="left">
          <a
            href="https://[YOURDOMAIN]/Pages/Home.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="top-bar__logo navbar-brand"
          >
            <img src={logo} alt="SDCOE" />
          </a>
          <span>Data Hub</span>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <img src={menu} alt="menu-btn" />
        </button>

        <div className="top-bar__menu collapse navbar-collapse" id="navbarCollapse">
          <ul className="top-bar__menu-item ml-auto">
            <li className="mr-2">
              <a href="mailto:[YOUREMAIL]">
                <img src={help} alt="help" />
                Help
              </a>
            </li>
            {accessToken ? (
              <li
                className={`user-menu ml-3 ${showMenu ? 'user-menu--active' : ''} `}
                id="userMenu"
                onClick={() => setShowMenu(!showMenu)}
              >
                <div className="user-menu__button">
                  <img src={person} alt="person" />
                  {name}
                  <img src={dropDown} alt="drop-down" />
                </div>
                <div className="user-menu__menu-box">
                  <ul className="user-menu__menu">
                    {isLocalLogin && (
                      <li className="user-menu__item" onClick={() => handleChangePassword()}>
                        Change Password
                      </li>
                    )}
                    <li className="user-menu__item" onClick={logOut}>
                      Logout
                    </li>
                  </ul>
                </div>
              </li>
            ) : (
              <li className="user-menu ml-3 " onClick={() => loginHandler()}>
                <div className="user-menu__button">
                  <img src={person} alt="person" />
                  Login
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};
