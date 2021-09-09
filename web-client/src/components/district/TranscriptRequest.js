import React, { useState } from 'react';

import useForm from 'hooks/useForm';
import useDistrict from 'hooks/useDistrict';

import * as data from 'constants/data';
import { districtFields, orderMappings } from 'mappings/orderMapper';

import { validateAll, validateOnChange } from 'components/form/formValidation';

import { getKey, getAccessToken } from 'utils/getKey';

import { RequestSuccess, DropDown } from 'components/common';

import { requestTranscript } from 'services/orders';
import { DATE_LIMIT } from 'constants/validation';
import TableLoader from 'components/common/TableLoader';

const { typeOfTranscriptForDistrict } = data;

const TranscriptRequest = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const releaseToEmail = getKey('email', getAccessToken());
  const requestedBy = getKey('name', getAccessToken());

  let values = {};
  districtFields.forEach(field => {
    if (field === orderMappings.requestedType) {
      values = { ...values, [field]: data.REQUEST_TYPE.district };
    } else if (field === orderMappings.releaseToEmail) {
      values = { ...values, [field]: releaseToEmail };
    } else if (field === orderMappings.requestedBy) {
      values = { ...values, requestedBy: requestedBy };
    } else {
      values = { ...values, [field]: '' };
    }
  });

  const submit = async () => {
    setIsLoading(true);
    const response = await requestTranscript(formValues);
    if (response) {
      setIsSubmitted(true);
      setIsLoading(false);
      resetValues();
    }
  };

  const { districtNames, cdsCode } = useDistrict();

  const { handleChange, handleSubmit, formValues, resetValues, errors } = useForm(
    values,
    submit,
    cdsCode,
    validateAll,
    validateOnChange
  );

  if (isSubmitted) {
    return <RequestSuccess onClick={() => setIsSubmitted(false)} />;
  }

  return (
    <section className="section student-trascript-section">
      {!isLoading ? (
        <div className="container my-sm-5">
          <form
            className="form student-transcript-form box-shadow"
            id="student-transcript-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className={`form-group form-group--required ${errors.typeOfTranscript ? 'form-group--error' : ''}`}>
              <label htmlFor="transcriptType" className="form-group__label">
                Type of Transcript
              </label>
              <DropDown
                options={typeOfTranscriptForDistrict}
                placeholder="Select"
                name={orderMappings.typeOfTranscript}
                onChange={handleChange}
              />
              {errors.typeOfTranscript && <small className="form-text-error">{errors.typeOfTranscript}</small>}
            </div>

            <div className={`form-group form-group--required ${errors.districtStudentSSID ? 'form-group--error' : ''}`}>
              <label htmlFor="districtStudentSSID" className="form-group__label">
                District Student SSID
              </label>
              <input
                type="text"
                onChange={handleChange}
                className="form-control"
                name={orderMappings.districtStudentSSID}
                value={formValues.districtStudentSSID}
                placeholder="For eg: 12345"
              />
              {errors.districtStudentSSID && <small className="form-text-error">{errors.districtStudentSSID}</small>}
            </div>

            <div className={`form-group form-group--required ${errors.firstName ? 'form-group--error' : ''}`}>
              <label htmlFor="firstName" className="form-group__label">
                Student's First Name
              </label>
              <input
                type="text"
                onChange={handleChange}
                className="form-control"
                name={orderMappings.firstName}
                value={formValues.firstName}
                placeholder="For eg: John"
              />
              {errors.firstName && <small className="form-text-error">{errors.firstName}</small>}
            </div>

            <div className={`form-group form-group--required ${errors.lastName ? 'form-group--error' : ''}`}>
              <label htmlFor="maidenName" className="form-group__label">
                Student's Last Name
              </label>
              <input
                type="text"
                onChange={handleChange}
                value={formValues.lastName}
                placeholder="For eg: Doe"
                className="form-control"
                name={orderMappings.lastName}
              />
              {errors.lastName && <small className="form-text-error">{errors.lastName}</small>}
            </div>

            <div className="row">
              <div className="col-sm-6">
                <div className={`form-group form-group--required ${errors.dob ? 'form-group--error' : ''}`}>
                  <label htmlFor="dob" className="form-group__label">
                    DOB
                  </label>
                  <input
                    type="date"
                    onChange={handleChange}
                    value={formValues.dob}
                    className="form-control"
                    name={orderMappings.dob}
                    max={DATE_LIMIT}
                    required
                  />
                  {errors.dob && <small className="form-text-error">{errors.dob}</small>}
                </div>
              </div>
            </div>

            <div className={`form-group form-group--required ${errors.districtName ? 'form-group--error' : ''}`}>
              <label htmlFor="districtName" className="form-group__label">
                District Name
              </label>
              <DropDown
                options={districtNames}
                placeholder="Select"
                name={orderMappings.districtName}
                onChange={handleChange}
              />
              {errors.districtName && <small className="form-text-error">{errors.districtName}</small>}
            </div>

            <button type="submit" className="btn btn--primary" id="request">
              Request Transcript
            </button>
          </form>
        </div>
      ) : (
        <TableLoader message="Requesting For Transcript" />
      )}
    </section>
  );
};

export default TranscriptRequest;
