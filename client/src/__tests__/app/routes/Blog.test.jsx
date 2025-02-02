import { screen } from "@testing-library/react";
import { render } from "../../test-utils/render";
import userEvent from "@testing-library/user-event";
import { BlogDetails } from "../../../app/routes/Blog";

describe("Blog", () => {
  const updateLikes = vi.fn();
  const deleteBlog = vi.fn();

  describe("BlogDetails. User who added Blog === logged user", () => {
    beforeEach(() => {
      const blog = {
        title: "Testing blog details component",
        author: "React testing library",
        url: "random-link.test",
        likes: 10,
        user: {
          username: "dez",
          name: "Gabriel Panaitescu",
        },
      };

      const user = {
        username: "dez",
      };

      render(
        <BlogDetails
          blog={blog}
          user={user}
          updateLikes={updateLikes}
          deleteBlog={deleteBlog}
        />
      );
    });

    test("correctly renders title, author, url and likes", () => {
      screen.getByText("Testing blog details component");
      screen.getByText("by React testing library");
      expect(screen.getByText("Link")).toHaveAttribute(
        "href",
        "random-link.test"
      );
      screen.getByText("10 likes");
    });

    test("correctly displays delete button as username of blog === username of logged user => button can be clicked to call deleteBlog fn", async () => {
      const deleteButton = screen.getByRole("button", { name: "delete" });

      const mockedUser = userEvent.setup();
      await mockedUser.click(deleteButton);

      expect(deleteBlog.mock.calls).toHaveLength(1);
    });

    test("correctly displays like button => button can be clicked to call updateLikes fn", async () => {
      const likesButton = screen.getByRole("button", { name: "like" });

      const mockedUser = userEvent.setup();
      await mockedUser.click(likesButton);

      expect(updateLikes.mock.calls).toHaveLength(1);
    });
  });

  describe("BlogDetails. User who added Blog !== logged user", () => {
    test("delete button is not visible if username of blog !== username of logged user", () => {
      const blog = {
        title: "Testing blog details component",
        author: "React testing library",
        url: "random-link.test",
        likes: 10,
        user: {
          username: "Llama",
          name: "Gabriel Panaitescu",
        },
      };

      const user = {
        username: "notALlamma",
      };

      render(
        <BlogDetails
          blog={blog}
          user={user}
          updateLikes={updateLikes}
          deleteBlog={deleteBlog}
        />
      );

      const deleteButton = screen.queryByText("delete");
      expect(deleteButton).toBeNull();
    });
  });
});
