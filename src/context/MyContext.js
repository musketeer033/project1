import React, { createContext, useState } from "react";
import App from "../App.jsx"; // Ensure correct relative path

export const Context = createContext({ isAuthorized: false });

const AuthProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Context.Provider value={{ isAuthorized, setIsAuthorized, user, setUser }}>
      {children}
    </Context.Provider>
  );
};

export default AuthProvider;
