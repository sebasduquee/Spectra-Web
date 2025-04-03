
import React from 'react';

export const FormGroup = ({ 
  label, 
  htmlFor, 
  error, 
  touched, 
  children, 
  required = false,
  className = "",
  labelClassName = "",
  errorClassName = ""
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label 
          htmlFor={htmlFor} 
          className={`block text-sm font-medium mb-2 ${labelClassName}`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {children}
      {touched && error && (
        <p className={`text-red-500 text-xs mt-1 ${errorClassName}`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormGroup;
