
import React from 'react';

const FormGroup = ({ label, error, children, required }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {children}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormGroup;
