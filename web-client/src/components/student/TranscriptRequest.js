import React, { useState } from 'react';
import Input from 'react-phone-number-input/input';

import useForm from 'hooks/useForm';
import useDistrict from 'hooks/useDistrict';

import * as data from 'constants/data';
import { studentFields, orderMappings } from 'mappings/orderMapper';

import { validateAll, validateOnChange } from 'components/form/formValidation';

import { DropDown } from 'components/common';
import { RequestSuccess } from 'components/common';
import TableLoader from 'components/common/TableLoader';

import { requestTranscript } from 'services/orders';
import { DATE_LIMIT } from 'constants/validation';

const { typeOfTranscript, industrySectors, attendedYears, PDF_TYPES } = data;

const TranscriptRequest = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let values = {};
  studentFields.forEach(field => {
    if (field === orderMappings.signature) {
      values = {
        ...values,
        [field]: {
          [orderMappings.type]: '',
          [orderMappings.size]: '',
          [orderMappings.base64]: '',
          [orderMappings.name]: '',
        },
      };
    } else if (field === orderMappings.requestedType) {
      values = {
        ...values,
        [field]: data.REQUEST_TYPE.student,
      };
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

  const { handleChange, handleSubmit, handleMaskInput, formValues, resetValues, errors, handleUploadFile } = useForm(
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
    <>
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
                  Type of Transcript Requested
                </label>
                <DropDown
                  options={typeOfTranscript}
                  placeholder="Select"
                  name={orderMappings.typeOfTranscript}
                  onChange={handleChange}
                />
                {errors.typeOfTranscript && <small className="form-text-error">{errors.typeOfTranscript}</small>}
              </div>

              <div className={`form-group form-group--required ${errors.firstName ? 'form-group--error' : ''}`}>
                <label htmlFor="firstName" className="form-group__label">
                  Student First Name
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  className="form-control"
                  name={orderMappings.firstName}
                  value={formValues.firstName}
                  placeholder="For eg: John "
                />
                {errors.firstName && <small className="form-text-error">{errors.firstName}</small>}
              </div>

              <div className={`form-group form-group--required ${errors.lastName ? 'form-group--error' : ''}`}>
                <label htmlFor="maidenName" className="form-group__label">
                  Student Last Name
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  value={formValues.lastName}
                  className="form-control"
                  placeholder="For eg: Doe "
                  name={orderMappings.lastName}
                />
                {errors.lastName && <small className="form-text-error">{errors.lastName}</small>}
              </div>

              <div className="row">
                <div className="col-sm-6">
                  <div className={`form-group form-group--required ${errors.dob ? 'form-group--error' : ''}`}>
                    <label htmlFor="dob" className="form-group__label">
                      Student DOB
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

                <div className="col-sm-6">
                  <div className={`form-group ${errors.phoneNo ? 'form-group--error' : ''}`}>
                    <label htmlFor="phone" className="form-group__label">
                      Current Phone Number
                    </label>
                    <Input
                      defaultCountry="US"
                      className="form-control"
                      value={formValues.phoneNo}
                      placeholder="(XXX) XXX-XXXX"
                      refs={orderMappings.phoneNo}
                      maxLength="14"
                      onChange={handleMaskInput}
                    />
                    {errors.phoneNo && <small className="form-text-error">{errors.phoneNo}</small>}
                  </div>
                </div>
              </div>

              <div className={`form-group form-group--required ${errors.address ? 'form-group--error' : ''}`}>
                <label htmlFor="address" className="form-group__label">
                  Current Address For Correspondence
                </label>
                <textarea
                  className="form-control"
                  name={orderMappings.address}
                  value={formValues.address}
                  onChange={handleChange}
                  rows="4"
                ></textarea>
                {errors.address && <small className="form-text-error">{errors.address}</small>}
              </div>

              {/* only show when transcript type is ROP  */}
              {formValues.typeOfTranscript && formValues.typeOfTranscript === PDF_TYPES.ropPDF.value && (
                <div
                  className={`form-group form-group--required   ${errors.industrySectors ? 'form-group--error' : ''}`}
                  id="industrySelectGroup"
                >
                  <label htmlFor="industry-select" className="form-group__label">
                    Industry Sectors
                  </label>
                  <DropDown
                    closeMenuOnSelect={false}
                    name={orderMappings.industrySectors}
                    isMulti
                    placeholder="Search or select from the list multiple industry sectors"
                    options={industrySectors}
                    onChange={handleChange}
                    className="choosen-multi-select"
                  />

                  {errors.industrySectors && <small className="form-text-error">{errors.industrySectors}</small>}
                </div>
              )}

              <div className={`form-group ${errors.classDescription ? 'form-group--error' : ''}`}>
                <label htmlFor="classNameesDesc" className="form-group__label">
                  Describe special courses you may have taken (ROP, CTE for instance)
                </label>
                <textarea
                  className="form-control"
                  onChange={handleChange}
                  value={formValues.classDescription}
                  name={orderMappings.classDescription}
                  rows="4"
                ></textarea>
                {errors.classDescription && <small className="form-text-error">{errors.classDescription}</small>}
              </div>

              <div className={`form-group form-group--required ${errors.yearsAttended ? 'form-group--error' : ''}`}>
                <label htmlFor="yearsAttended" className="form-group__label">
                  Year(s) Attended
                </label>

                <DropDown
                  closeMenuOnSelect={false}
                  name={orderMappings.yearsAttended}
                  isMulti
                  placeholder="For eg: 2001, 2002"
                  options={attendedYears}
                  onChange={handleChange}
                  className="choosen-multi-select"
                />
                {errors.yearsAttended && <small className="form-text-error">{errors.yearsAttended}</small>}
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

              <div className={`form-group form-group--required ${errors.releaseToName ? 'form-group--error' : ''}`}>
                <label htmlFor="releaseToName" className="form-group__label">
                  Release to Name
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  className="form-control"
                  name={orderMappings.releaseToName}
                  placeholder="For eg: John Doe"
                  value={formValues.releaseToName}
                />
                {errors.releaseToName && <small className="form-text-error">{errors.releaseToName}</small>}
              </div>

              <div className={`form-group form-group--required ${errors.releaseToEmail ? 'form-group--error' : ''}`}>
                <label htmlFor="releaseEmail" className="form-group__label">
                  Release to Email
                </label>
                <input
                  type="email"
                  onChange={handleChange}
                  className="form-control"
                  name={orderMappings.releaseToEmail}
                  placeholder="For eg: john@example.com"
                  value={formValues.releaseToEmail}
                />
                {errors.releaseToEmail && (
                  <small className="form-text-error">
                    {errors.releaseToEmail.empty || errors.releaseToEmail.invalid || errors.releaseToEmail}
                  </small>
                )}
              </div>
              <div className={`form-group form-group--required ${errors.signature ? 'form-group--error' : ''}`}>
                <div className="form-group__label mb-2">
                  <p>Signature File Upload</p>
                  (Please submit a signature authorizing this request) *
                </div>
                <small className="form-text mt-0 mb-2">jpg or png file under 200 kb are accepted</small>
                <div className="custom-file" id="customFile">
                  <input
                    type="file"
                    name={orderMappings.signature}
                    className="custom-file-input"
                    id="signatureFile"
                    onChange={handleUploadFile}
                    accept=".jpg, .jpeg, .png"
                    title={formValues.signature.name || ''}
                  />
                  <label className="custom-file-label form-control" htmlFor="signatureFile" data-browse="">
                    {formValues.signature && formValues.signature.name
                      ? formValues.signature.name
                      : ' Select a file to upload'}
                  </label>
                </div>
                {errors.signature && (
                  <small className="form-text-error">
                    {errors.signature.empty || errors.signature.invalid || errors.signature}
                  </small>
                )}
              </div>

              {formValues.signature && formValues.signature.base64 && (
                <div className="form-group">
                  <img src={formValues.signature.base64} alt="signature" width={100} height={100} />
                </div>
              )}

              <button type="submit" className="btn btn--primary" id="request">
                Request Transcript
              </button>
            </form>
          </div>
        ) : (
            <TableLoader />
          )}
      </section>
    </>
  );
};

export default TranscriptRequest;
