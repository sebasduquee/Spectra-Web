
import { useState, useCallback } from 'react';

// Validaciones comunes predefinidas
export const validators = {
  required: (value) => !!value || 'Este campo es obligatorio',
  email: (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !value || regex.test(value) || 'Email inválido';
  },
  password: (value) => {
    return (
      !value ||
      (value.length >= 8 &&
        /[A-Z]/.test(value) &&
        /[a-z]/.test(value) &&
        /[0-9]/.test(value)) ||
      'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número'
    );
  },
  phone: (value) => {
    const regex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return !value || regex.test(value) || 'Número de teléfono inválido';
  },
  minLength: (min) => (value) =>
    !value || value.length >= min || `Mínimo ${min} caracteres`,
  maxLength: (max) => (value) =>
    !value || value.length <= max || `Máximo ${max} caracteres`,
};

export const useFormValidation = (initialState, validationRules = {}) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Función para acceder y validar campos anidados
  const getNestedValue = (obj, path) => {
    if (!path) return obj;
    const keys = path.split('.');
    return keys.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
  };

  const setNestedValue = (obj, path, value) => {
    const result = { ...obj };
    const keys = path.split('.');
    const lastKey = keys.pop();
    
    let current = result;
    keys.forEach(key => {
      if (!current[key]) current[key] = {};
      current = current[key];
    });
    
    current[lastKey] = value;
    return result;
  };

  // Función para validar un campo específico
  const validate = useCallback((fieldName, fieldValue) => {
    const rules = validationRules[fieldName];
    if (!rules) return '';
    
    if (Array.isArray(rules)) {
      for (const rule of rules) {
        const result = typeof rule === 'function' ? rule(fieldValue) : '';
        if (result !== true && result !== '') {
          return result;
        }
      }
      return '';
    }
    
    return typeof rules === 'function' ? rules(fieldValue) : '';
  }, [validationRules]);

  // Manejar cambios en campos (incluyendo anidados)
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(prevValues => setNestedValue(prevValues, name, value));
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    const error = validate(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, [validate]);

  // Validar un campo específico manualmente
  const validateField = useCallback((fieldName, customValue) => {
    const value = customValue !== undefined ? customValue : getNestedValue(values, fieldName);
    const error = validate(fieldName, value);
    
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
    
    return !error;
  }, [values, validate]);

  // Validar todos los campos
  const validateAll = useCallback(() => {
    const newErrors = {};
    let isFormValid = true;

    Object.keys(validationRules).forEach(fieldName => {
      const value = getNestedValue(values, fieldName);
      const error = validate(fieldName, value);
      
      if (error) {
        isFormValid = false;
      }
      
      newErrors[fieldName] = error;
      setTouched(prev => ({
        ...prev,
        [fieldName]: true
      }));
    });

    setErrors(newErrors);
    return isFormValid;
  }, [values, validationRules, validate]);

  // Marcar un campo como tocado
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    validateField(name);
  }, [validateField]);

  // Resetear el formulario
  const resetForm = useCallback(() => {
    setValues(initialState);
    setErrors({});
    setTouched({});
  }, [initialState]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateField,
    validateAll,
    resetForm,
    setValues
  };
};
