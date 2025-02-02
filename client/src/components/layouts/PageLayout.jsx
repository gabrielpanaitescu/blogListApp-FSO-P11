import Footer from "../../components/ui/Footer/Footer";
import { Header } from "../../components/ui/Header/Header";
import { Container, rem, Stack } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";

export const PageLayout = ({ children }) => {
  return (
    <Stack mih="100dvh">
      <Header />
      <Notifications />
      <Container mt={rem(50)} mb="auto" w="100%" size="sm">
        {children}
      </Container>
      <Footer />
    </Stack>
  );
};
