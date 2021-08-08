import React, { createContext, useContext } from 'react';
import * as auth from './auth.service';

const USER_KEY = 'user';

export interface UserCredentials {
  username: string;
  password: string;
}

interface AuthContextValue {
  getCredentials: () => UserCredentials | null;
  getIsAuthenticated: () => boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const authContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export function useAuth() {
  const value = useContext(authContext);
  if (value === null) {
    throw new Error('You probably forgot to put <AuthProvider>.');
  }
  return value;
}

function useProvideAuth() {
  const getCredentials = (): UserCredentials | null => {
    const data = sessionStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  };

  const getIsAuthenticated = (): boolean => {
    return getCredentials() !== null;
  };

  const login = async (username: string, password: string) => {
    const success = await auth.authenticate(username, password);
    if (!success) {
      throw new Error('bad credentials');
    }
    const data = JSON.stringify({
      username,
      password,
    } as UserCredentials);
    sessionStorage.setItem(USER_KEY, data);
  };

  const logout = async () => {
    sessionStorage.removeItem(USER_KEY);
  };

  return {
    getCredentials,
    getIsAuthenticated,
    login,
    logout,
  };
}
