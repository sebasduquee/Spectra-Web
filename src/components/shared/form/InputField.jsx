
import React from 'react';
import FormGroup from './FormGroup';

export const InputField = ({
  id,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  label,
  error,
  touched,
  required = false,
  disabled = false,
  className = "",
  inputClassName = "",
  labelClassName = "",
  errorClassName = "",
  leftIcon,
  rightIcon,
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
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            {leftIcon}
          </div>
        )}
        <input
          id={id || name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-4 py-3 rounded-lg border ${
            touched && error
              ? 'border-red-500'
              : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-[#CBDFF4] ${
            leftIcon ? 'pl-12' : ''
          } ${rightIcon ? 'pr-12' : ''} ${
            disabled ? 'bg-gray-100 cursor-not-allowed' : ''
          } ${inputClassName}`}
          {...rest}
        />
        {rightIcon && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            {rightIcon}
          </div>
        )}
      </div>
    </FormGroup>
  );
};

export default InputField;
