import React, { useContext } from "react";
import useAuthProvider from "../hooks/useAuthProvider";

const AuthContext = React.createContext();
AuthContext.displayName = "AuthContext";

export default function AuthProvider({ children }) {
  const auth = useAuthProvider();
  auth.loadJWT();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
