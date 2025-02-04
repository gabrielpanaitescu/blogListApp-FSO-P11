import { useRef, useState } from "react";
import Togglable from "../../components/ui/Togglable";
import BlogForm from "../../components/ui/BlogForm/BlogForm";
import { useBlogs } from "../../hooks/query/useBlogs";
import { Link } from "react-router-dom";
import {
  Loader,
  Center,
  Title,
  Anchor,
  Text,
  Table,
  Skeleton,
  Stack,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

const BlogList = () => {
  const blogFormRef = useRef();
  const [isBlurred, setIsBlurred] = useState(false);
  const { blogs, isGetBlogsPending, createBlogMutation } = useBlogs();

  const addBlog = async (blogObject) => {
    setIsBlurred(true);
    blogFormRef.current.toggleVisibility();

    createBlogMutation.mutate(blogObject, {
      onSuccess: (returnedBlog) => {
        setIsBlurred(false);
        notifications.show({
          title: "Info",
          message: `Added blog '${returnedBlog.title}' by '${returnedBlog.author}'`,
          position: "top-center",
          autoClose: 5000,
          color: "green",
        });
      },
      onError: () => {
        setIsBlurred(false);
      },
    });
  };

  if (isGetBlogsPending)
    return (
      <Center>
        <Loader />
      </Center>
    );

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <>
      <Stack gap={5} mb={20}>
        <Title order={3}>Blogs</Title>
        <Togglable buttonLabel="Add Blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </Stack>

      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>
              <Text fw={700}>Title</Text>
            </Table.Th>
            <Table.Th>
              <Text fw={700}>Author</Text>
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {sortedBlogs.map((blog, index) =>
            isBlurred ? (
              <Table.Tr key={index}>
                <Table.Td>
                  <Skeleton h={20} animate={true} />
                </Table.Td>
                <Table.Td>
                  <Skeleton h={20} animate={true} />
                </Table.Td>
              </Table.Tr>
            ) : (
              <Table.Tr key={blog.id}>
                <Table.Td>
                  <Anchor component={Link} to={`/blogs/${blog.id}`}>
                    {blog.title}
                  </Anchor>
                </Table.Td>
                <Table.Td>
                  <Text>{blog.author}</Text>
                </Table.Td>
              </Table.Tr>
            )
          )}
        </Table.Tbody>
      </Table>
    </>
  );
};

export default BlogList;
