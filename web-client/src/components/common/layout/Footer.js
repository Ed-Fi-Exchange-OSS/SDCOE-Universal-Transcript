import React from 'react';

import { footerLogo } from 'assets/images';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-top__info">
          <img src={footerLogo} alt="SDCOE" className="footer-top__logo" />
          <div className="footer-top__text">
            San Diego County Office of Education <br />
            6401 Linda Vista Road <br />
            San Diego, CA 92111-7319
            <br />
            858-292-3500
          </div>
        </div>
      </div>
      <div className="footer-bottom">© 2020 San Diego County Office of Education All rights reserved</div>
    </footer>
  );
};
