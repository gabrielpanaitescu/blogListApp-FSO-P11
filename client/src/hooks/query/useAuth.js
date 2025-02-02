import loginService from "../../services/login";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import blogService from "../../services/blog";
import { useAuthDispatch, useAuthState } from "../../contexts/AuthContext";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { AxiosError } from "axios";

export const useLogout = () => {
  const { clearUser } = useAuthDispatch();

  const logout = () => {
    clearUser();
    localStorage.removeItem("loggedUserBlogAppReactQuery");
  };

  return {
    logout,
  };
};

export const useLogin = () => {
  const { setUser } = useAuthDispatch();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: loginService.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Blog"] });
    },
  });

  const handleLogin = async (credentials) => {
    try {
      const user = await loginMutation.mutateAsync(credentials);
      window.localStorage.setItem(
        "loggedUserBlogAppReactQuery",
        JSON.stringify(user)
      );
      blogService.setToken(user.token);
      setUser(user);

      notifications.show({
        title: "Info",
        message: `Logged in as '${user.username}'`,
        position: "top-center",
        autoClose: 5000,
        color: "green",
      });
    } catch (error) {
      console.log(error);

      let errorMessage;

      if (error instanceof AxiosError && error.response.data?.error) {
        errorMessage = error.response.data?.error;
      } else if (error.message) {
        errorMessage = error.message;
      } else {
        errorMessage = "Unknown authentication error. Please try again.";
      }

      notifications.show({
        title: "Info",
        message: `Login failed. Error: ${errorMessage}`,
        position: "top-center",
        autoClose: 5000,
        color: "red",
      });
    }
  };

  return {
    handleLogin,
  };
};

export const useInitializeAuth = () => {
  const user = useAuthState();
  const [authInitializing, setAuthInitializing] = useState(true);

  const { setUser } = useAuthDispatch();

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("loggedUserBlogAppReactQuery");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setAuthInitializing(false);
      blogService.setToken(user.token);
    } else if (!loggedUserJSON) {
      setAuthInitializing(false);
    }
    // eslint-disable-next-line
  }, []);

  return { user, authInitializing };
};
