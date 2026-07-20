import { useLocalStorage } from './useLocalStorage';

const AUTH_KEY = 'has_sanctuary_access';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage<boolean>(AUTH_KEY, false);

  const unlockSanctuary = () => {
    setIsAuthenticated(true);
  };

  const lockSanctuary = () => {
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    unlockSanctuary,
    lockSanctuary
  };
}
