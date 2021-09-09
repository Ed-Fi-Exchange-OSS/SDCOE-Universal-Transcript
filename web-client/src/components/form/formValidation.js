import omitBy from 'lodash/omitBy';
import { isValidPhoneNumber, isPossiblePhoneNumber } from 'react-phone-number-input';

import { validInputLength, validEmail, validImageType, validFileSize } from 'utils/validate';

import { errorMessages } from 'constants/error';
import { orderMappings } from 'mappings/orderMapper';
import { PDF_TYPES } from 'constants/data';

export const validateOnChange = (key, values, errors) => {
  let errorValues = errors;
  let error = validateField(key, values);
  if (values[key] === PDF_TYPES.standardPDF.value) {
    errorValues = omitBy(errors, (value, key) => key === orderMappings.industrySectors);
  }
  return { ...errorValues, ...error };
};

export const validateAll = (values, errors) => {
  let newError = {};

  Object.keys(values).forEach(key => {
    let error = validateField(key, values);
    newError[key] = error[key];
  });

  return { ...errors, ...newError };
};

const validateField = (key, values) => {
  let errors = {};
  const isDateField = checkDate(key);
  const isPhoneField = checkPhone(key);
  const isSignatureField = checkSignature(key);
  const isReleaseEmailField = checkReleaseEmail(key);
  setError(key, values, errors);

  if (isPhoneField) {
    setPhoneError(key, values, errors);
  }

  if (isDateField) {
    setDateError(key, values, errors);
  }

  if (isReleaseEmailField) {
    setReleaseEmailError(key, values, errors);
  }

  if (isSignatureField) {
    setSignatureError(key, values, errors);
  }

  return errors;
};

export const checkReleaseEmail = key => {
  const releaseEmail = orderMappings.releaseToEmail;

  return key === releaseEmail;
};

export const checkSignature = key => {
  const isSignature = orderMappings.signature;

  return key === isSignature;
};

export const checkTextArea = key => {
  const textAreaFields = [orderMappings.classDescription]; // fields related to textarea

  return textAreaFields.includes(key);
};

export const checkDate = key => {
  const dateFields = [orderMappings.dob];

  return dateFields.includes(key);
};

export const checkPhone = key => {
  const phoneNumberFields = [orderMappings.phoneNo];

  return phoneNumberFields.includes(key);
};

export const setPhoneError = (key, values, errors) => {
  const isPhoneField = checkPhone(key);
  if (isPhoneField && values[key]) {
    const isValid = isValidPhoneNumber(values[key]) && isPossiblePhoneNumber(values[key]);
    if (!isValid) {
      return (errors[key] = errorMessages.phoneNo.invalid);
    }

    return (errors[key] = '');
  }

  if (isPhoneField && !values[key]) {
    return (errors[key] = '');
  }

  return errors;
};

export const setError = (key, values, errors) => {
  const isReleaseEmail = checkReleaseEmail(key);
  const isSignature = checkSignature(key);
  const isClassDescription = checkTextArea(key);

  // Class Description (Optional field)
  if (!values[key] && isClassDescription) {
    return (errors[key] = '');
  }

  //check if the input field is empty or not
  if (!values[key] && !isReleaseEmail && !isSignature) {
    errors[key] = errorMessages[key];

    return errors;
  }

  // check if the input contains more than 100 characters except Signature, and Class Description field
  if (values[key] && !isSignature && !isClassDescription && !validInputLength(values[key])) {
    errors[key] = errorMessages.length;
    return errors;
  }

  // check if input field contains value and not releaseToEmail and signature (multiple error types)
  if (values[key] && !isReleaseEmail & !isSignature) {
    errors[key] = '';

    return errors;
  }

  return errors;
};

export const setReleaseEmailError = (key, values, errors) => {
  const isReleaseEmail = checkReleaseEmail(key);
  if (!values[key] && isReleaseEmail) {
    errors[key] = errorMessages[key].empty;
    return errors;
  }

  if (values[key] && isReleaseEmail && !validEmail(values[key])) {
    errors[key] = errorMessages[key].invalid;

    return errors;
  }

  if (values[key] && isReleaseEmail && validEmail(values[key])) {
    errors[key] = '';
  }

  return errors;
};

export const setSignatureError = (key, values, errors) => {
  const isSignature = checkSignature(key);
  if (values[key] && isSignature) {
    if (!values[key].base64) {
      errors[key] = errorMessages[key].empty;

      return errors;
    }

    if (!validImageType(values[key][orderMappings.type])) {
      errors[key] = errorMessages[key].invalid;

      return errors;
    }

    if (!validFileSize(values[key][orderMappings.size])) {
      errors[key] = errorMessages[key].size;

      return errors;
    } else {
      errors[key] = '';

      return errors;
    }
  }
  return errors;
};

export const setDateError = (key, values, errors) => {
  const isDateField = checkDate(key);
  if (values[key] && isDateField) {
    const date = new Date(values[key]);
    const today = new Date();
    if (today === date) {
      errors[key] = errorMessages.date.today;

      return errors;
    }

    if (date > today) {
      errors[key] = errorMessages.date.future;

      return errors;
    }
    return errors;
  }

  return errors;
};
