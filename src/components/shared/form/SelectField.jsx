
import React from 'react';
import FormGroup from './FormGroup';

const SelectField = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  required,
  options,
  placeholder,
  ...props
}) => {
  return (
    <FormGroup label={label} error={error} required={required}>
      <select
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full px-4 py-2 rounded-lg border ${
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-[#CBDFF4]'
        } focus:outline-none focus:ring-2 transition-colors`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FormGroup>
  );
};

export default SelectField;
