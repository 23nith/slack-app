import React, { useContext, useReducer } from "react";

export const Auth = React.createContext();
export default function AuthProvider({ reducer, initialState, children }) {
  return (
    <Auth.Provider value={useReducer(reducer, initialState)}>
      {children}
    </Auth.Provider>
  );
}
export const useAuthProvider = () => useContext(Auth);
