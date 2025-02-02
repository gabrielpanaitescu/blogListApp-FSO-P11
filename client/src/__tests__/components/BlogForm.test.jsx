import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "../../components/ui/BlogForm/BlogForm";
import { render } from "../test-utils/render";

test("BlogForm calls the createBlog prop with correct info", async () => {
  const createBlog = vi.fn();

  render(<BlogForm createBlog={createBlog} />);

  const titleInput = screen.getByTestId("titleInput");
  const authorInput = screen.getByTestId("authorInput");
  const urlInput = screen.getByTestId("urlInput");
  const submitButton = screen.getByTestId("submitButton");

  const user = userEvent.setup();

  await user.type(titleInput, "random title");
  await user.type(authorInput, "random author");
  await user.type(urlInput, "random url");

  await user.click(submitButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toStrictEqual({
    title: "random title",
    author: "random author",
    url: "random url",
  });

  await user.click();
});
