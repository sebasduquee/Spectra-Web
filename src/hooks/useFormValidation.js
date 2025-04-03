
import { useState, useCallback } from 'react';

export const useFormValidation = (initialState, validationRules) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validate = useCallback((fieldName, value) => {
    const rule = validationRules[fieldName];
    if (!rule) return true;
    
    const isValid = rule(value);
    setErrors(prev => ({
      ...prev,
      [fieldName]: isValid ? '' : `${fieldName} is invalid`
    }));
    return isValid;
  }, [validationRules]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
    validate(name, value);
  }, [validate]);

  const isValid = useCallback(() => {
    return Object.keys(validationRules).every(key => 
      validate(key, values[key])
    );
  }, [validate, values, validationRules]);

  return {
    values,
    errors,
    handleChange,
    isValid,
    setValues
  };
};
