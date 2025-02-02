import userService from "../../services/users";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { AxiosError } from "axios";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["User"] });
      notifications.show({
        title: "Info",
        message: "New user created successfully",
        position: "top-center",
        autoClose: 5000,
        color: "green",
      });
    },
    onError: (error) => {
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
        message: `Failed to create user. Error: ${errorMessage}`,
        position: "top-center",
        autoClose: 5000,
        color: "red",
      });
    },
  });

  return createUserMutation;
};

export const useGetUsers = () => {
  const {
    data: users = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["User"],
    queryFn: userService.getUsers,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return { users, isPending, isError, error };
};
