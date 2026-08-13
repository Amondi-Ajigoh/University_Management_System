import { useMemo, useState, type PropsWithChildren } from 'react';
import { AuthContext, type AuthUser } from './auth-context';

const TOKEN_KEY = 'ums_access_token';
const USER_KEY = 'ums_user';

function readStoredUser(): AuthUser | null {
  const storedUser = localStorage.getItem(USER_KEY);
  if (!storedUser) return null;
  try {
    return JSON.parse(storedUser) as AuthUser;
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [accessToken, setAccessToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState<AuthUser | null>(readStoredUser);

  const signIn = (authenticatedUser: AuthUser, token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(authenticatedUser));
    setAccessToken(token);
    setUser(authenticatedUser);
  };

  const signOut = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setAccessToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, accessToken, isAuthenticated: Boolean(accessToken && user), signIn, signOut }),
    [user, accessToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
