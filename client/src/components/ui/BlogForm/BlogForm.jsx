import { Button, TextInput, Group, rem } from "@mantine/core";
import { useForm } from "@mantine/form";

const BlogForm = ({ createBlog }) => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      author: "",
      url: "",
    },
    validate: {
      title: (value) => (value.length < 1 ? "Title can't be empty" : null),
      author: (value) => (value.length < 1 ? "Author can't be empty" : null),
      url: (value) => (value.length < 1 ? "Url can't be empty" : null),
    },
  });

  const addBlog = ({ title, author, url }) => {
    createBlog({
      title,
      author,
      url,
    });
    form.reset();
  };

  return (
    <form
      onSubmit={form.onSubmit((values) => addBlog(values))}
      style={{ maxWidth: rem(400) }}
    >
      <TextInput
        data-testid="titleInput"
        label="Title"
        placeholder="The Blog"
        key={form.key("title")}
        {...form.getInputProps("title")}
      />
      <TextInput
        data-testid="authorInput"
        label="Author"
        placeholder="Mr. Blog Writer"
        key={form.key("author")}
        {...form.getInputProps("author")}
      />
      <TextInput
        data-testid="urlInput"
        label="Url"
        placeholder="http://www.random-link.com"
        key={form.key("url")}
        {...form.getInputProps("url")}
      />
      <Group mt="md">
        <Button type="submit" data-testid="submitButton">
          Add Blog
        </Button>
      </Group>
    </form>
  );
};

export default BlogForm;
