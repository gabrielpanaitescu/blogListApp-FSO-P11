import { NotificationContextProvider } from "../contexts/NotificationContext.jsx";
import { AuthContextProvider } from "../contexts/AuthContext.jsx";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

export const AppProvider = ({ children }) => {
  return (
    <AuthContextProvider>
      <NotificationContextProvider>
        <MantineProvider>{children}</MantineProvider>
      </NotificationContextProvider>
    </AuthContextProvider>
  );
};
