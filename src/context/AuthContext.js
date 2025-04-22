import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const res = await axios.post("127.0.0.1:8000/api/users", { username, password });
      setUser(res.data.user);
      return res.data;
    } catch (error) {
      console.log("Login failed:", error);
      throw error;
    }
  };

  const register = async (data) => {
    try {
      const res = await axios.post("127.0.0.1:8000:api/users", data);
      return res.data;
    } catch (error) {
      console.log("Register failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
