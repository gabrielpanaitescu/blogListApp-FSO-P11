/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useReducer } from "react";

export const NotificationContext = createContext();

export const useNotify = () => {
  const { dispatch } = useContext(NotificationContext);

  return (message, type = "info", seconds = 5) => {
    dispatch({ type: "set_notification", payload: { message, type } });

    setTimeout(() => {
      dispatch({ type: "set_notification", payload: { message: null } });
    }, seconds * 1000);
  };
};

export const useNotificationState = () => {
  const { state } = useContext(NotificationContext);

  return state;
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "set_notification":
      return action.payload;
    case "clear_notification":
      return { message: null };
    default:
      return state;
  }
};

export const NotificationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, { message: null });

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};
