import React from 'react';
import Select from 'react-select';

import { dropDown } from 'assets/images';

const DropDown = props => {
  const { options, onChange, placeholder, name } = props;
  return (
    <Select
      options={options}
      placeholder={placeholder}
      classNamePrefix="custom-select"
      className="form-control--select"
      name={name}
      onChange={onChange}
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator: () =>
          props.isMulti || props.customDropdownIndicator ? '' : <img src={dropDown} alt="dropDown-img" />,
      }}
      theme={theme => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary25: '#ededed',
          primary: '#d8d8d8',
        },
      })}
      {...props}
    />
  );
};

export default DropDown;
