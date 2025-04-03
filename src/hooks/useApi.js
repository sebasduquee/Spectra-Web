
import { useState, useCallback } from 'react';
import { useToast } from '../contexts/ToastContext';

export const useApi = (apiFunction) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showError } = useToast();
  
  const execute = useCallback(async (...params) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await apiFunction(...params);
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err.message || 'Ha ocurrido un error';
      setError(errorMessage);
      showError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [apiFunction, showError]);
  
  return { data, isLoading, error, execute };
};
