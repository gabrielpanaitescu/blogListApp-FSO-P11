/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext } from "react";
import { useReducer } from "react";

export const AuthContext = createContext();

export const useAuthState = () => {
  const { state } = useContext(AuthContext);

  return state;
};

export const useAuthDispatch = () => {
  const { dispatch } = useContext(AuthContext);

  const setUser = (credentials) => {
    dispatch({ type: "set_user", payload: credentials });
  };

  const clearUser = () => {
    dispatch({ type: "clear_user" });
  };

  return {
    setUser,
    clearUser,
  };
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "set_user":
      return action.payload;
    case "clear_user":
      return null;
    default:
      console.error(`Unhandled action type: ${action.type}`);
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, null);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
