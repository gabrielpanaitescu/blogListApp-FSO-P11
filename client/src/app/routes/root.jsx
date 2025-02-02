import { Outlet } from "react-router-dom";
import "@mantine/notifications/styles.css";
import { PageLayout } from "../../components/layouts/PageLayout";

const AppRoot = () => {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
};

export default AppRoot;
