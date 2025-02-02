import { Link } from "react-router-dom";
import { useGetUsers } from "../../hooks/query/useUsers";

import { useEffect } from "react";
import { Anchor, Loader, Table, Text, Center } from "@mantine/core";
import { notifications } from "@mantine/notifications";

export const UsersTable = ({ users }) => (
  <Table striped highlightOnHover withTableBorder withColumnBorders>
    <Table.Thead>
      <Table.Tr>
        <Table.Th>
          <Text fw={700}>Name</Text>
        </Table.Th>
        <Table.Th>
          <Text fw={700}>Nr of Blogs</Text>
        </Table.Th>
      </Table.Tr>
    </Table.Thead>
    <Table.Tbody>
      {users.map((user) => (
        <Table.Tr key={user.id}>
          <Table.Td>
            <Anchor component={Link} to={`/users/${user.id}`}>
              {user.name}
            </Anchor>
          </Table.Td>
          <Table.Td>
            <Text>{user.blogs.length}</Text>
          </Table.Td>
        </Table.Tr>
      ))}
    </Table.Tbody>
  </Table>
);

const Users = () => {
  const { users, isPending, isError, error } = useGetUsers();

  useEffect(() => {
    if (isError)
      notifications.show({
        title: "Info",
        message: `${error.message}. Failed to get users`,
        position: "top-center",
        autoClose: 5000,
        color: "red",
      });
  }, [isError, error]);

  if (isPending)
    return (
      <Center>
        <Loader />
      </Center>
    );

  return <UsersTable users={users} />;
};

export default Users;
