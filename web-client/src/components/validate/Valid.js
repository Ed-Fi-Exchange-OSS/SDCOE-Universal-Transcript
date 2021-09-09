import React from 'react';

import { checkShield } from 'assets/images';

const Valid = ({ handleClick }) => (
  <div className="box-shadow verified text-center">
    <img src={checkShield} alt="Transcript Valid" />
    <div className="message">
      <p className="message__heading">This transcipt has been verified as valid.</p>
    </div>
    <button className="btn btn--secondary" onClick={handleClick}>
      Upload & Validate Another
    </button>
  </div>
);

export default Valid;
