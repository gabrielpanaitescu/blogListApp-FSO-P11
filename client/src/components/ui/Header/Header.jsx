import classes from "./Header.module.css";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Link, useLocation } from "react-router-dom";
import {
  Container,
  Group,
  Burger,
  Title,
  Text,
  Button,
  Drawer,
  Stack,
  Flex,
} from "@mantine/core";
import { ColorSchemeToggle } from "../ColorSchemeToggle/ColorSchemeToggle";
import { useLogout } from "../../../hooks/query/useAuth";
import { useAuthState } from "../../../contexts/AuthContext";
import { notifications } from "@mantine/notifications";

const links = [
  { link: "/", label: "Home" },
  { link: "/users", label: "Users" },
  { link: "/blogs", label: "Blogs" },
  { link: "/login", label: "Login" },
];

export function Header() {
  const loggedUser = useAuthState();
  const { logout: handleLogout } = useLogout();
  const [opened, { toggle, close }] = useDisclosure(false);
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  const items = links.map((link) =>
    link.label !== "Login" ? (
      <Link
        to={link.link}
        key={link.label}
        className={classes.link}
        data-active={
          active === link.link ||
          (link.link === "/blogs" && active.startsWith("/blogs")) ||
          undefined
        }
        onClick={(e) => {
          close();
          if (!loggedUser && link.link !== "/") {
            if (active === "/login") e.preventDefault();
            notifications.clean();
            notifications.show({
              title: "Unauthorized",
              message: `You need to be logged in order to access the ${link.label} section`,
              position: "top-center",
              autoClose: 3000,
              color: "red",
            });
            return;
          }
          setActive(link.link);
        }}
      >
        {link.label}
      </Link>
    ) : loggedUser ? (
      <Flex gap={5} justify="center" key={link.label}>
        <Text size="sm" fs={"italic"}>
          {loggedUser.username}
        </Text>
        <Button
          color="red"
          size="compact-xs"
          onClick={() => {
            close();
            handleLogout();
          }}
        >
          logout
        </Button>
      </Flex>
    ) : (
      <Link
        to={link.link}
        key={link.label}
        className={classes.link}
        data-active={active === link.link || undefined}
        onClick={() => {
          close();
          setActive(link.link);
        }}
      >
        {link.label}
      </Link>
    )
  );

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Title order={2}>blogApp</Title>
        <Group visibleFrom="xs">
          {items}
          <ColorSchemeToggle />
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="md" />

        <Drawer
          opened={opened}
          onClose={toggle}
          title="blogApp"
          position="top"
          hiddenFrom="xs"
        >
          <Stack gap="md">
            {items}
            <Container justify="center">
              <ColorSchemeToggle />
            </Container>
          </Stack>
        </Drawer>
      </Container>
    </header>
  );
}
