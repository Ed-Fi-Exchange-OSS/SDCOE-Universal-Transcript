import React from 'react';
import { PropTypes } from 'prop-types';

const Checkbox = ({ checked = false, onChange, values, fieldKey }) => {
  const { courseCode, courseTerm } = values;
  return (
    <div className="custom-checkbox-wrapper">
      <label className="custom-checkbox">
        <input type="checkbox" checked={checked} onChange={e => onChange(e, courseCode, courseTerm, fieldKey)} />
        <span className="custom-checkbox-checkmark" />
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
