import { createContext, useContext, useMemo, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(Cookies.get("accessToken"));

  const setToken = (token) => {
    setToken_(token);
  };

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
