import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/query/useAuth";
import { useEffect } from "react";
import { useAuthState } from "../../contexts/AuthContext";
import { useCreateUser } from "../../hooks/query/useUsers";

import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Anchor,
  Stack,
  rem,
} from "@mantine/core";

export const AuthenticationForm = ({ form, toggle, type, handleSubmit }) => (
  <Paper radius="md" p="xl" withBorder maw={rem(500)} mr={"auto"} ml={"auto"}>
    <Text size="lg" fw={500} mb={rem(10)}>
      Welcome to blogApp, {type} in order to continue
    </Text>

    <form
      onSubmit={form.onSubmit((values) => {
        handleSubmit(values);
      })}
    >
      <Stack>
        {type === "register" && (
          <TextInput
            data-testid="nameInput"
            required
            label="Name"
            placeholder="Your name"
            value={form.values.name}
            onChange={(event) =>
              form.setFieldValue("name", event.currentTarget.value)
            }
            radius="md"
          />
        )}

        <TextInput
          data-testid="usernameInput"
          required
          label="Username"
          name="username"
          placeholder="john_doe123"
          value={form.values.username}
          onChange={(event) =>
            form.setFieldValue("username", event.currentTarget.value)
          }
          error={form.errors.username}
          radius="md"
        />

        <PasswordInput
          data-testid="passwordInput"
          required
          label="Password"
          placeholder="Your password"
          value={form.values.password}
          onChange={(event) =>
            form.setFieldValue("password", event.currentTarget.value)
          }
          error={
            form.errors.password &&
            "Password should include at least 4 characters"
          }
          radius="md"
        />
      </Stack>

      <Group justify="space-between" mt="xl">
        <Anchor
          data-testid="toggleFormType"
          component="button"
          type="button"
          c="dimmed"
          onClick={() => toggle()}
          size="xs"
        >
          {type === "register"
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </Anchor>
        <Button type="submit" radius="xl" data-testid="submitButton">
          {upperFirst(type)}
        </Button>
      </Group>
    </form>
  </Paper>
);

// eslint-disable-next-line
export const useMantineForm = () => {
  return useForm({
    initialValues: {
      name: "",
      username: "",
      password: "",
    },
    validate: {
      username: (val) =>
        val.length < 3 ? "Username must be at least 3 characters long" : null,
      password: (val) =>
        val.length <= 3
          ? "Password should include at least 4 characters"
          : null,
    },
  });
};

const Authentication = () => {
  const user = useAuthState();
  const { handleLogin } = useLogin();
  const [type, toggle] = useToggle(["login", "register"]);
  const createUserMutation = useCreateUser();

  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const form = useMantineForm();

  const handleSubmit = (values) => {
    const { name, username, password } = values;
    const credentials = {
      username,
      password,
    };

    if (type === "login") {
      handleLogin(credentials);
      return;
    }

    if (type === "register") {
      const newUser = {
        name,
        username,
        password,
      };

      createUserMutation.mutate(newUser, {
        onSuccess() {
          handleLogin(credentials);
        },
      });
    }
  };

  return (
    <AuthenticationForm
      form={form}
      type={type}
      toggle={toggle}
      handleSubmit={handleSubmit}
    />
  );
};

export default Authentication;
