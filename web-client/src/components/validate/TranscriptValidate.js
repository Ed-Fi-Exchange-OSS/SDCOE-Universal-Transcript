import React, { useState } from 'react';

import { errorMessages } from 'constants/error';
import { isValidTranscriptFile } from 'utils/validate';

import Valid from 'components/validate/Valid';
import Spinner from 'components/common/Spinner';
import Invalid from 'components/validate/Invalid';

import validationStates from 'constants/validationStates';
import verifyPdf from 'services/verifyPdf';

export const TranscriptValidate = () => {
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentValidationState, setCurrentValidationState] = useState(validationStates.VALIDATION_FORM);

  const fileChangeHandler = event => {
    setError('');
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async event => {
    try {
      event.preventDefault();

      if (!selectedFile) {
        setError(errorMessages.verify.noFileSelected);
        return;
      }

      if (!isValidTranscriptFile(selectedFile.type)) {
        setError(errorMessages.verify.fileTypeError);
        return;
      }

      if (!error) {
        setCurrentValidationState(validationStates.LOADING);
      }

      const transcriptValidity = await verifyPdf(selectedFile);

      if (transcriptValidity.message) {
        setCurrentValidationState(validationStates.VERIFIED);
      } else {
        setCurrentValidationState(validationStates.INVALID);
      }
    } catch (error) {
      setCurrentValidationState(validationStates.SERVER_ERROR);
      setError(errorMessages.verify.fallback);
    }
  };

  const showValidationForm = () => {
    setSelectedFile(null);
    setCurrentValidationState(validationStates.VALIDATION_FORM);
  };

  return (
    <section className="section">
      <div className="container pb-5">
        {currentValidationState === validationStates.VALIDATION_FORM && (
          <form className="form box-shadow" id="transcript-validation" onSubmit={handleSubmit}>
            <div className={`form-group ${error && 'form-group--error'}`}>
              <div className="form-group__label mb-2">Transcript file to validate</div>
              <small className="form-text mt-0 mb-2">Only PDF file is accepted</small>
              <div className="custom-file" id="customFile">
                <input
                  type="file"
                  className="custom-file-input"
                  id="signatureFile"
                  aria-describedby="fileHelp"
                  onChange={fileChangeHandler}
                />
                <label className="custom-file-label" htmlFor="signatureFile" data-browse="">
                  {selectedFile?.name || 'Select a file to upload'}
                </label>
              </div>
              <small className="form-text-error">{error}</small>
            </div>
            <button
              type="submit"
              className={`btn btn--primary ${selectedFile || error ? '' : 'btn--disabled'}`}
              disabled={!selectedFile || error}
              id="check-validation"
            >
              Check Validation
            </button>
          </form>
        )}

        {currentValidationState === validationStates.LOADING && <Spinner message="Validating uploaded file..." />}

        {currentValidationState === validationStates.VERIFIED && <Valid handleClick={showValidationForm} />}

        {currentValidationState === validationStates.INVALID && (
          <Invalid
            handleClick={showValidationForm}
            message="This transcipt has been verified as invalid."
            buttonTitle="Upload & Validate Another"
          />
        )}

        {currentValidationState === validationStates.SERVER_ERROR && (
          <Invalid
            handleClick={showValidationForm}
            message="Oops! Could not verify the transcript."
            buttonTitle="Upload & Validate Another"
          />
        )}
      </div>
    </section>
  );
};
