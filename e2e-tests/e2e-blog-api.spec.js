import { test, expect } from "@playwright/test";
import {
  createDefaultBlogs,
  createNewUser,
  login,
} from "./e2e-helper-functions";

const initialBlogs = [
  {
    title: "Test Title 1",
    author: "Test Author 1",
    url: "Test URL 1",
  },
  {
    title: "Test Title 2",
    author: "Test Author 2",
    url: "Test URL 2",
  },
];

const defaultUser = {
  username: "testuser123",
  password: "test123",
  name: "Playwright Test User",
};

const anotherUser = {
  username: "another_testuser123",
  password: "test123",
  name: "Another Playwright Test User",
};

test.describe("navigate to root page; a user already exists", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: defaultUser,
    });

    await page.goto("/");
  });

  test("initial Home route is loaded", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Home" })).toBeVisible();
  });

  test("clicking on the Users nav button will give auth error and redirect to login screen", async ({
    page,
  }) => {
    const usersLink = page.getByRole("link", { name: "Users" });
    await usersLink.click();
    await expect(page.getByText("Unauthorized")).toBeVisible();
  });

  test("clicking on the Blogs nav button will give auth error and redirect to login screen", async ({
    page,
  }) => {
    const usersLink = page.getByRole("link", { name: "Blogs" });
    await usersLink.click();
    await expect(page.getByText("Unauthorized")).toBeVisible();
  });

  test("user can login with valid credentials", async ({ page }) => {
    await login(page, defaultUser);
  });

  test("a new user can be created by navigating to the login -> register view", async ({
    page,
  }) => {
    await createNewUser(page, anotherUser);
  });

  test.describe("when user is logged in", () => {
    test.beforeEach(async ({ page }) => {
      await login(page, defaultUser);
      await page
        .locator(".mantine-Notifications-notification")
        .getByRole("button")
        .click();
    });

    test("can navigate to Users view and see his name", async ({ page }) => {
      await page.getByRole("link", { name: "Users" }).click();

      await expect(page.getByText("Name")).toBeVisible();

      await expect(
        page.getByRole("link", { name: "Playwright Test User" })
      ).toBeVisible();
    });

    test.describe("can navigate to Blogs view", () => {
      test.beforeEach(async ({ page }) => {
        await page.getByRole("link", { name: "Blogs" }).click();
        await expect(page.getByText("Blogs")).toBeVisible();
      });

      test("two blogs can be added consecutively", async ({ page }) => {
        await createDefaultBlogs(page, initialBlogs);
      });

      test.describe("and add a new blog", () => {
        test.beforeEach("and add a new blog", async ({ page }) => {
          await createDefaultBlogs(page, [initialBlogs[0]]);
        });

        test("can navigate to single blog view and add/remove like", async ({
          page,
        }) => {
          await page
            .getByRole("link", {
              name: initialBlogs[0].title,
            })
            .click();
          await expect(page.getByText("0 likes")).toBeVisible();
          await page.getByRole("button", { name: "like" }).click();
          await expect(page.getByText("1 like")).toBeVisible();
          await page.getByRole("button", { name: "unlike" }).click();
          await expect(page.getByText("0 likes")).toBeVisible();
        });

        test("can navigate to single blog view and remove it", async ({
          page,
        }) => {
          page.on("dialog", async (dialog) => {
            if (dialog.type() === "confirm") await dialog.accept();
          });

          const blog = page.getByRole("link", {
            name: initialBlogs[0].title,
          });

          await blog.click();

          await page.getByRole("button", { name: "delete" }).click();

          await expect(
            page.getByText(
              `Successfully deleted blog '${initialBlogs[0].title}'`
            )
          ).toBeVisible();

          await expect(blog).not.toBeVisible();
        });

        test.describe("and navigate to a blog to add a new comment", () => {
          test.beforeEach(async ({ page }) => {
            await page
              .getByRole("link", { name: initialBlogs[0].title })
              .click();

            await page.getByRole("button", { name: "new" }).click();

            await page
              .getByTestId("addCommentTextarea")
              .fill("Test comment from Playwright!");

            await page.getByRole("button", { name: "Post" }).click();
          });

          test("comment was added", async ({ page }) => {
            await expect(
              page.getByText("Test comment from Playwright!")
            ).toBeVisible();
          });

          test("comment can be deleted", async ({ page }) => {
            page.on("dialog", async (dialog) => {
              if (dialog.type() === "confirm") await dialog.accept();
            });

            await page.getByTestId("deleteCommentButton").click();

            await expect(
              page.getByText("Test comment from Playwright!")
            ).not.toBeVisible();
          });

          test("comment can be edited", async ({ page }) => {
            await page.getByTestId("editCommentButton").click();

            const editInput = page.getByTestId("editCommentTextarea");

            await editInput.press("Control+A");
            await editInput.press("Backspace");
            await editInput.fill("Edited comment from Playwright!");

            await page.getByRole("button", { name: "Confirm" }).click();

            await expect(
              page.getByText("Test comment from Playwright!")
            ).not.toBeVisible();
            await expect(
              page.getByText("Edited comment from Playwright!", {})
            ).toBeVisible();
          });
        });

        test("if user logs out and back again in with another user, cannot remove blog added by other user", async ({
          page,
        }) => {
          await page.getByRole("button", { name: "logout" }).click();
          await createNewUser(page, anotherUser);

          await page.getByRole("link", { name: "Blogs" }).click();

          await page.getByRole("link", { name: initialBlogs[0].title }).click();

          await expect(
            page.getByRole("button", { name: "remove" })
          ).not.toBeVisible();
        });
      });
    });
  });
});
