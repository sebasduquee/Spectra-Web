
import React from 'react';
import FormGroup from './FormGroup';

const InputField = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  error,
  required,
  placeholder,
  ...props
}) => {
  return (
    <FormGroup label={label} error={error} required={required}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full px-4 py-2 rounded-lg border ${
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-[#CBDFF4]'
        } focus:outline-none focus:ring-2 transition-colors`}
        {...props}
      />
    </FormGroup>
  );
};

export default InputField;
