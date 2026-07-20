import { useState } from 'react';

const AUTH_KEY = 'has_sanctuary_access';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  });

  const unlockSanctuary = () => {
    localStorage.setItem(AUTH_KEY, 'true');
    setIsAuthenticated(true);
  };

  const lockSanctuary = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    unlockSanctuary,
    lockSanctuary
  };
}
