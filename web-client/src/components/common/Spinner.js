import React from 'react';

const Spinner = ({ message }) => (
  <div className="box-shadow text-center">
    <div className="lds-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    {message && <p className="message__heading mt-4">{message}</p>}
  </div>
);

export default Spinner;
