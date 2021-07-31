import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { getAccessToken, getKey } from 'utils/getKey';

import { DISTRICT, PUBLIC } from 'constants/routes';

export const Nav = () => {
  const [role, setRole] = useState(PUBLIC);
  let isVerificationEnabled;
  if (process.env.REACT_APP_IS_VERIFICATION_ENABLED) {
    isVerificationEnabled = JSON.parse(process.env.REACT_APP_IS_VERIFICATION_ENABLED);
  }
  useEffect(() => {
    if (!!getAccessToken()) {
      const userRole = getKey('role', getAccessToken());
      setRole(userRole);
    }
  }, [role]);

  const validateTranscript = isVerificationEnabled ? (
    <span className="navbar__item">
      <NavLink className="navbar__link" activeClassName="navbar__link--active" to="/validate-transcript">
        Validate Transcript
      </NavLink>
    </span>
  ) : null;

  switch (role) {
    case DISTRICT: {
      return (
        <nav className="navbar" data-spy="affix" data-offset-top="197">
          <span className="navbar__item">
            <NavLink
              className="navbar__link"
              activeClassName="navbar__link--active"
              to="/requested-transcript-district"
            >
              Transcript Request History
            </NavLink>
          </span>
          <span className="navbar__item">
            <NavLink className="navbar__link" exact activeClassName="navbar__link--active" to="/">
              District Transcript Request
            </NavLink>
          </span>
          {validateTranscript}
        </nav>
      );
    }

    case PUBLIC: {
      return (
        <nav className="navbar" data-spy="affix" data-offset-top="197">
          <span className="navbar__item">
            <NavLink className="navbar__link" exact activeClassName="navbar__link--active" to="/">
              Student Transcript Request
            </NavLink>
          </span>
          {validateTranscript}
        </nav>
      );
    }
    default: {
      return null;
    }
  }
};
