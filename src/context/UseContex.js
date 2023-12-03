// @function  UserContext

import React from "react";
const UserContext = React.createContext({ email: "", auth: false });
const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({ email: "", auth: false });
  const loginContext = (email, token) => {
    setUser((user) => ({
      email: email,
      auth: true,
    }));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser((user) => ({
      email: "",
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
