import React from 'react';

import { logo } from 'assets/images';

export const LoginScreenTop = () => {
  return (
    <div className="login-screen__top d-flex align-items-center">
      <a
        href="https://[YOURDOMAIN]/Pages/Home.aspx"
        target="_blank"
        rel="noopener noreferrer"
        className="top-bar__logo navbar-brand"
      >
        <img src={logo} alt="SDCOE" />
      </a>
      <span className="color">Data Hub</span>
    </div>
  );
};
