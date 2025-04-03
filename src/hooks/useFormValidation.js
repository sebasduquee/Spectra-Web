
import { useState, useCallback } from 'react';

// Validaciones comunes predefinidas
export const commonValidations = {
  required: (value) => !!value || 'Este campo es requerido',
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Email inválido',
  password: (value) => {
    if (value.length < 8) return 'La contraseña debe tener al menos 8 caracteres';
    if (!/\d/.test(value)) return 'La contraseña debe contener al menos un número';
    if (!/[a-z]/.test(value)) return 'La contraseña debe contener al menos una minúscula';
    if (!/[A-Z]/.test(value)) return 'La contraseña debe contener al menos una mayúscula';
    return true;
  },
  phone: (value) => /^\+?[\d\s-]{8,}$/.test(value) || 'Número de teléfono inválido'
};

export const useFormValidation = (initialState, validationSchema) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((name, value) => {
    const fieldValidation = validationSchema[name];
    if (!fieldValidation) return true;

    if (typeof fieldValidation === 'function') {
      const result = fieldValidation(value, values);
      return typeof result === 'string' ? result : true;
    }

    if (Array.isArray(fieldValidation)) {
      for (const validator of fieldValidation) {
        const result = validator(value, values);
        if (typeof result === 'string') return result;
      }
    }

    return true;
  }, [validationSchema, values]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    const validationResult = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: validationResult === true ? '' : validationResult
    }));
  }, [validateField]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationSchema).forEach(key => {
      const validationResult = validateField(key, values[key]);
      if (validationResult !== true) {
        newErrors[key] = validationResult;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [validateField, values, validationSchema]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    handleBlur,
    validateForm,
    setValues,
    setErrors
  };
};
