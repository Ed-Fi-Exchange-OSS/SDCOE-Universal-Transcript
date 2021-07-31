import React from 'react';
import { LoginScreenTop } from './LoginScreenTop';

export const ScreenWrapper = props => {
  return (
    <section className="section auth-section">
      <div className="container my-sm-5 d-flex flex-column align-items-center justify-content-center login-screen">
        <LoginScreenTop />
        {props.children}
      </div>
    </section>
  );
};
