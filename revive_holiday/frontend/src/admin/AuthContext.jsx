import { createContext, useContext, useState } from "react";
import { login as apiLogin } from "./api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("admin_token"));

  const login = async (username, password) => {
    const res = await apiLogin(username, password);
    const t = res.data.access_token;
    localStorage.setItem("admin_token", t);
    setToken(t);
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
