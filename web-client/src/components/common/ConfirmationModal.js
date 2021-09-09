import React from 'react';
import Modal from 'react-modal';
import propTypes from 'prop-types';

Modal.setAppElement('#root');

const ConfirmationModal = ({ title, description, confirmation, setConfirmation, handleConfirmation }) => {

  return (
    <Modal
      isOpen={confirmation}
      onRequestClose={() => setConfirmation(false)}
      shouldCloseOnOverlayClick={false}
      className="sdcoe-modal sdcoe-modal__confirmation"
      overlayClassName="sdcoe-modal__overlay"
    >
      <div className="sdcoe-modal__header">
        <div className="sdcoe-modal__title-info">
          <h1 className="sdcoe-modal__title">{title}</h1>

        </div>
      </div>
      <div className="sdcoe-modal__body">
        <p className="sdcoe-modal__body-desc">{description}</p>
      </div>
      <div className="sdcoe-modal__footer">
        <div className="sdcoe-modal__footer-btn-wrapper">
          <button
            className={`btn btn--secondary`}
            onClick={() => setConfirmation(false)}
          >
            Cancel
            </button>

          <button
            className={`btn btn--primary`}
            onClick={handleConfirmation}>
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}

ConfirmationModal.propTypes = {
  title: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  confirmation: propTypes.bool.isRequired,
  setConfirmation: propTypes.func.isRequired,
  handleConfirmation: propTypes.func.isRequired
}

export default ConfirmationModal;
