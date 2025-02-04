import { expect } from "@playwright/test";

export const login = async (page, { username, password }) => {
  await page.getByRole("link", { name: "Login" }).click();

  await page
    .getByRole("textbox", { name: "Username", exact: true })
    .fill(username);
  await page.getByRole("textbox", { name: "Password" }).fill(password);

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Logged in as")).toBeVisible();
};

export const createNewUser = async (page, { name, username, password }) => {
  await page.getByRole("link", { name: "Login" }).click();

  await page
    .getByRole("button", { name: "Don't have an account? Register" })
    .click();

  await page.getByRole("textbox", { name: "Name", exact: true }).fill(name);
  await page
    .getByRole("textbox", { name: "Username", exact: true })
    .fill(username);
  await page.getByRole("textbox", { name: "Password" }).fill(password);

  await page.getByRole("button", { name: "Register" }).click();

  await expect(page.getByText("Logged in as")).toBeVisible();
};

export const createDefaultBlogs = async (page, initialBlogs) => {
  for (let i = 0; i < initialBlogs.length; i++) {
    const blogToAdd = initialBlogs[i];

    await page.getByRole("button", { name: "Add Blog" }).click();

    await page.getByRole("textbox", { name: "Title" }).fill(blogToAdd.title);
    await page.getByRole("textbox", { name: "Author" }).fill(blogToAdd.author);
    await page.getByRole("textbox", { name: "Url" }).fill(blogToAdd.url);

    await page.getByRole("button", { name: "Add Blog" }).click();

    await expect(
      page.getByText(`Added blog '${blogToAdd.title}' by '${blogToAdd.author}'`)
    ).toBeVisible();
  }
};
