
import { useState, useCallback } from 'react';

// Validaciones comunes predefinidas
export const validations = {
  required: (value) => !!value || 'Este campo es obligatorio',
  email: (value) => 
    !value || 
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 
    'Ingresa un correo electrónico válido',
  phone: (value) => 
    !value || 
    /^[\d\s()-+]{6,}$/.test(value) || 
    'Ingresa un número de teléfono válido',
  minLength: (min) => (value) => 
    !value || 
    value.length >= min || 
    `Debe tener al menos ${min} caracteres`,
  maxLength: (max) => (value) => 
    !value || 
    value.length <= max || 
    `No debe exceder ${max} caracteres`,
  passwordMatch: (getPasswordValue) => (value) => 
    value === getPasswordValue() || 
    'Las contraseñas no coinciden',
  pattern: (regex, message) => (value) => 
    !value || 
    regex.test(value) || 
    message
};

export const useFormValidation = (initialState = {}, validationSchema = {}) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validar un campo específico
  const validateField = useCallback((fieldName, fieldValue) => {
    if (!validationSchema[fieldName]) return '';
    
    // Si es array de validaciones, las evaluamos todas
    if (Array.isArray(validationSchema[fieldName])) {
      for (const validationFn of validationSchema[fieldName]) {
        const error = validationFn(fieldValue);
        if (error !== true) return error;
      }
      return '';
    }
    
    // Si es una sola función de validación
    const error = validationSchema[fieldName](fieldValue);
    return typeof error === 'string' ? error : '';
  }, [validationSchema]);

  // Validar todo el formulario
  const validateForm = useCallback(() => {
    const newErrors = {};
    
    for (const fieldName in validationSchema) {
      const value = values[fieldName];
      const error = validateField(fieldName, value);
      if (error) newErrors[fieldName] = error;
    }
    
    setErrors(newErrors);
    return newErrors;
  }, [validationSchema, values, validateField]);

  // Manejar cambios en los campos
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Si ya se tocó el campo, validamos inmediatamente
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  }, [validateField, touched]);

  // Marcar campo como tocado
  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, [validateField]);

  // Iniciar el envío del formulario
  const handleSubmit = useCallback((submitCallback) => async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Marcar todos los campos como tocados
    const allTouched = Object.keys(validationSchema).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);
    
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length === 0) {
      await submitCallback(values);
    }
    
    setIsSubmitting(false);
  }, [validateForm, values, validationSchema]);

  // Verificar si el formulario es válido
  const isValid = useCallback(() => {
    return Object.keys(errors).length === 0;
  }, [errors]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    validateForm,
    isValid,
    setValues,
    reset: () => {
      setValues(initialState);
      setErrors({});
      setTouched({});
    }
  };
};
