import React from 'react';

import { shieldX } from 'assets/images';

const Invalid = ({ handleClick, message, buttonTitle }) => (
  <div className="box-shadow not-verified text-center">
    <img src={shieldX} alt="Transcript Invalid" />
    <div className="message">
      <p className="message__heading">{message}</p>
    </div>
    <button className="btn btn--secondary" onClick={handleClick}>
      {buttonTitle}
    </button>
  </div>
);

export default Invalid;
