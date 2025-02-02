import { useNotificationState } from "../../contexts/NotificationContext";
import { Notification, rem } from "@mantine/core";

const NotificationComponent = () => {
  const info = useNotificationState();

  if (info.message === null) return;

  const color =
    info.type === "info" ? "green" : info.type === "error" ? "red" : "";

  return (
    <Notification
      withCloseButton={false}
      title={info.type}
      color={color}
      style={{
        position: "fixed",
        top: rem(70),
        left: rem(20),
      }}
    >
      {info.message}
    </Notification>
  );
};

export default NotificationComponent;
