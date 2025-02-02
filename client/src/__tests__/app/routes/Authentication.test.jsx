import { screen } from "@testing-library/react";
import { render } from "../../test-utils/render";
import userEvent from "@testing-library/user-event";
import {
  AuthenticationForm,
  useMantineForm,
} from "../../../app/routes/Authentication";
import { beforeEach, expect } from "vitest";
import { useToggle } from "@mantine/hooks";

const AuthenticationMock = ({ handleSubmit }) => {
  const form = useMantineForm();
  const [type, toggle] = useToggle(["login", "register"]);

  return (
    <AuthenticationForm
      form={form}
      type={type}
      toggle={toggle}
      handleSubmit={handleSubmit}
    />
  );
};

describe("Authentication", () => {
  describe("AutheticationForm", () => {
    const handleSubmit = vi.fn();

    beforeEach(() => {
      render(<AuthenticationMock handleSubmit={handleSubmit} />);
    });

    test("the login form is correctly rendered", () => {
      const toggleFormTypeButton = screen.getByTestId("toggleFormType");
      const nameInput = screen.queryByText("Name");

      screen.getByRole("button", { name: "Login" });
      screen.getByText("Welcome to blogApp, login in order to continue");
      expect(nameInput).toBeNull();
      expect(toggleFormTypeButton).toHaveTextContent(
        "Don't have an account? Register"
      );
    });

    test("pressing the toggle form type button correctly switches to the register form", async () => {
      const user = userEvent.setup();

      const toggleFormTypeButton = screen.getByTestId("toggleFormType");

      await user.click(toggleFormTypeButton);

      screen.getByText("Welcome to blogApp, register in order to continue");
      screen.getByText("Name");
      expect(toggleFormTypeButton).toHaveTextContent(
        "Already have an account? Login"
      );
    });

    test("pressing the handleSubmit correctly submits the correct data depending on the login/register form type", async () => {
      const loginFormValues = {
        name: "",
        username: "random username",
        password: "random pass",
      };

      const registerFormValues = {
        name: "random name",
        username: "random username",
        password: "random pass",
      };

      const user = userEvent.setup();

      const usernameInput = screen.getByTestId("usernameInput");
      const passwordInput = screen.getByTestId("passwordInput");
      const submitButton = screen.getByRole("button", { name: "Login" });

      await user.type(usernameInput, "random username");
      await user.type(passwordInput, "random pass");
      await user.click(submitButton);

      expect(handleSubmit.mock.calls[0][0]).toEqual(loginFormValues);

      await user.click(screen.getByTestId("toggleFormType"));

      const nameInput = screen.getByTestId("nameInput");
      await user.type(nameInput, "random name");

      await user.click(submitButton);
      expect(handleSubmit.mock.calls[1][0]).toEqual(registerFormValues);
    });

    test("form cannot be submitted if validation fails and helpful errors are visible", async () => {
      const user = userEvent.setup();

      const usernameInput = screen.getByTestId("usernameInput");
      const passwordInput = screen.getByTestId("passwordInput");
      const submitButton = screen.getByTestId("submitButton");

      await user.type(usernameInput, "1");
      await user.type(passwordInput, "1");
      await user.click(submitButton);

      screen.getByText("Username must be at least 3 characters long");
      screen.getByText("Password should include at least 4 characters");
      expect(handleSubmit.mock.calls[2]).toBeUndefined();
    });
  });
});
