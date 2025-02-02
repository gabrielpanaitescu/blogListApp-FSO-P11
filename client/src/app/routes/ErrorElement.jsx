import { useRouteError } from "react-router-dom";
import { Stack } from "@mantine/core";

const ErrorElement = ({ error }) => {
  const routerError = useRouteError();
  const displayError = routerError || error;

  console.log(displayError);

  return (
    <Stack align="center" gap={0} justify="center">
      <h2>Ooopsss!</h2>
      <p>An error has occurred:</p>
      <p>
        <i>{displayError.statusText || displayError.message} </i>
      </p>
    </Stack>
  );
};

export default ErrorElement;
