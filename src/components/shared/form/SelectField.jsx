
import React from 'react';
import FormGroup from './FormGroup';

export const SelectField = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  options = [],
  label,
  error,
  touched,
  required = false,
  disabled = false,
  placeholder = 'Seleccionar...',
  className = "",
  selectClassName = "",
  labelClassName = "",
  errorClassName = "",
  ...rest
}) => {
  return (
    <FormGroup
      label={label}
      htmlFor={id || name}
      error={error}
      touched={touched}
      required={required}
      className={className}
      labelClassName={labelClassName}
      errorClassName={errorClassName}
    >
      <select
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={`w-full px-4 py-3 rounded-lg border ${
          touched && error
            ? 'border-red-500'
            : 'border-gray-300'
        } focus:outline-none focus:ring-2 focus:ring-[#CBDFF4] ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : ''
        } ${selectClassName}`}
        {...rest}
      >
        <option value="" disabled>
          {placeholder}
        </option>
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
