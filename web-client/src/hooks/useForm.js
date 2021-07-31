import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import omitBy from 'lodash/omitBy';

import { orderMappings } from 'mappings/orderMapper';
import { REQUEST_TYPE, PDF_TYPES } from 'constants/data';

import { checkEmpty } from 'utils/isEmpty';
import { convertBase64 } from 'utils/encode';

const useForm = (values = {}, submit, cdsCode = {}, validateAll, validateOnChange) => {
  const [formValues, setFormValues] = useState(values);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event, action) => {
    // check if the input is dropdown & multiselect
    if (action && event !== null) {
      const { name } = action;
      const { value } = event;
      if (Array.isArray(event)) {
        const value = event.map(e => e.value);
        const formData = {
          ...formValues,
          [name]: value,
        };
        setFormValues(formData);
        setErrors(validateOnChange(name, formData, errors));
        return;
      }

      const formData = {
        ...formValues,
        [name]: value,
      };

      setFormValues(formData);
      setErrors(validateOnChange(name, formData, errors));
      return;
    }

    if (action && event === null) {
      const { name } = action;
      const formData = {
        ...formValues,
        [name]: '',
      };

      setFormValues(formData);
      setErrors(validateOnChange(name, formData, errors));
      return;
    }

    const { name, value } = event.target;
    const formData = {
      ...formValues,
      [name]: value,
    };

    setFormValues(formData);
    setErrors(validateOnChange(name, formData, errors));
  };

  const handleMaskInput = value => {
    const formData = {
      ...formValues,
      phoneNo: value,
    };

    setFormValues(formData);
    setErrors(validateOnChange(orderMappings.phoneNo, formData, errors));
  };

  const handleUploadFile = async event => {
    const imageFile = event.target.files[0];
    const size = imageFile.size;
    const type = imageFile.type;
    const name = imageFile.name;
    let base64 = await convertBase64(imageFile);
    const formData = {
      ...formValues,
      signature: {
        size,
        type,
        base64,
        name,
      },
    };

    const checkErrors = validateOnChange(orderMappings.signature, formData, errors);

    setErrors(checkErrors);
    let values = formData;
    if (checkErrors.signature !== '') {
      values.signature = {
        size: '',
        type: '',
        base64: '',
        name: '',
      };
    }
    setFormValues(values);
  };

  const handleSubmit = event => {
    event.preventDefault();
    let values = formValues;

    // Remove or add industrySectors based on transcript type
    if (formValues[orderMappings.requestedType] === REQUEST_TYPE.student) {
      if (formValues[orderMappings.typeOfTranscript] === PDF_TYPES.standardPDF.value) {
        values = omitBy(formValues, (value, key) => key === orderMappings.industrySectors);
      } else {
        values = { ...formValues, industrySectors: formValues[orderMappings.industrySectors] || '' };
      }
    }

    // Add cds value based on the district value
    const districtName = formValues[orderMappings.districtName];
    if (Object.keys(cdsCode).includes(districtName)) {
      values = { ...values, CDScode: cdsCode[districtName] };
    }

    const errorValues = validateAll(values, errors);
    //Send signature value  base64  only
    if (Object.keys(formValues).includes(orderMappings.signature) && checkEmpty(errorValues)) {
      const signature = formValues[orderMappings.signature].base64;
      values = { ...values, signature };
    }

    if (values[orderMappings.requestedType] === REQUEST_TYPE.student) {
      const requestedBy = `${values[orderMappings.firstName]} ${values[orderMappings.lastName]}`;
      values = { ...values, requestedBy };
    }

    setFormValues(values);
    setErrors(errorValues);

    if (Object.keys(errorValues).filter(key => errorValues[key]).length === 0) {
      setSubmitting(true);
    }
  };

  useEffect(() => {
    if (submitting) {
      submit();
      setSubmitting(false);
    }
  }, [submitting, submit]);

  const resetValues = () => {
    setFormValues(values);
  };

  return {
    handleChange,
    handleMaskInput,
    handleSubmit,
    handleUploadFile,
    formValues,
    resetValues,
    errors,
  };
};

useForm.propTypes = {
  submit: PropTypes.func.isRequired,
  validateAll: PropTypes.func.isRequired,
  validateOnChange: PropTypes.func.isRequired,
};

export default useForm;
