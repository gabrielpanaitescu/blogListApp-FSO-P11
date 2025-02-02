import { useBlogs } from "../../hooks/query/useBlogs";
import { useAuthState } from "../../contexts/AuthContext";
import BlogComments from "../../components/ui/BlogComments";
import ErrorElement from "./ErrorElement";
import { useNavigate } from "react-router-dom";
import {
  Anchor,
  Button,
  Card,
  Center,
  Group,
  Loader,
  rem,
  Stack,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

export const BlogDetails = ({
  blog,
  user,
  deleteBlog,
  updateLikes,
  isUpdateBlogPending,
  didUserAlreadyLiked,
}) => (
  <Card padding="lg" radius="md" maw={rem(500)}>
    <Card.Section withBorder inheritPadding py="xs" mb="xs">
      <Stack>
        <Text fw={700}>{blog.title}</Text>
        <Text fs="italic">by {blog.author}</Text>
      </Stack>
    </Card.Section>
    <Stack align="start">
      <Anchor href={blog.url}>Link</Anchor>
      <Group>
        <Text>
          {blog.likes} {blog.likes === 1 ? "like" : "likes"}
        </Text>
        <Button
          disabled={isUpdateBlogPending}
          size="compact-sm"
          color={didUserAlreadyLiked ? "gray" : "teal"}
          onClick={() => updateLikes(blog)}
        >
          {didUserAlreadyLiked ? "unlike" : "like"}
        </Button>
      </Group>
      {user.username === blog.user.username && (
        <Button
          size="compact-sm"
          color="orange"
          onClick={() => deleteBlog(blog)}
        >
          delete
        </Button>
      )}
    </Stack>
  </Card>
);

const Blog = ({ blog }) => {
  const user = useAuthState();
  const navigate = useNavigate();
  const { updateBlogMutation, deleteBlogMutation, isGetBlogsPending } =
    useBlogs();

  const { isPending: isUpdateBlogPending } = updateBlogMutation;

  const updateLikes = async (blog) => {
    updateBlogMutation.mutate(blog);
  };

  const deleteBlog = async ({ id, title, author }) => {
    const confirmation = window.confirm(
      `Delete blog '${title}' by '${author}'?`
    );
    if (!confirmation) return;

    deleteBlogMutation.mutate(id, {
      onSuccess: (_returnedBlog) => {
        notifications.show({
          title: "Info",
          message: `Successfully deleted blog '${title}'`,
          position: "top-center",
          autoClose: 5000,
          color: "green",
        });
        navigate("/blogs");
      },
    });
  };

  if (isGetBlogsPending) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }
  if (!blog)
    return <ErrorElement error={{ status: 404, statusText: "Not found" }} />;

  const didUserAlreadyLiked = Boolean(
    blog.likedBy?.find((obj) => obj.username === user.username)
  );

  return (
    <Stack direction="column" gap={50}>
      <BlogDetails
        blog={blog}
        user={user}
        updateLikes={updateLikes}
        deleteBlog={deleteBlog}
        isUpdateBlogPending={isUpdateBlogPending}
        didUserAlreadyLiked={didUserAlreadyLiked}
      />
      <BlogComments blog={blog} />
    </Stack>
  );
};

export default Blog;
