import { useState } from 'react';

function useLocalStorage(key, initialValue) {
  // Vérifier si window est défini avant d'accéder à localStorage
  const isClient = typeof window !== 'undefined';

  const [storedValue, setStoredValue] = useState(() => {
    if (isClient) {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error(error);
      }
    }
    return initialValue;
  });

  const setValue = (value) => {
    if (isClient) {
      try {
        setStoredValue(value);
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;