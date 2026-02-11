import { createContext, useContext, useState } from "react";
import authStorage from "./authStorage";

/* ✅ Context यही फाइलमै बनाउने */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(authStorage.getToken());
  const [user, setUser] = useState(authStorage.getUser());

  const login = (data) => {
    authStorage.setAuth(data);
    setToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    authStorage.clearAuth();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

/* ✅ useAuth यहीँबाट export */
export const useAuth = () => useContext(AuthContext);
