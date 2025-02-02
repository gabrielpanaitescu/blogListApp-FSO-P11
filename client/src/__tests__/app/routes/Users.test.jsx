import { screen } from "@testing-library/react";
import { render } from "../../test-utils/render";
import { UsersTable } from "../../../app/routes/Users";
import { BrowserRouter } from "react-router-dom";

describe("Users", () => {
  describe("UsersTable", () => {
    test("component renders correctly the name and nr of blogs", () => {
      const users = [
        {
          username: "dez4s",
          name: "Gabriel Panaitescu",
          blogs: [
            {
              title: "Inheritance vs. Composition",
              author: "Gaurang Shaha",
              url: "https://medium.com/@gaurang.shaha_6814/inheritance-vs-composition-cfd48fd87e06",
              id: "671991f6ad560cac3a766e9b",
            },
            {
              title: "Understanding JavaScript Prototypes",
              author: "Jim Cooper",
              url: "https://www.pluralsight.com/tech-blog/understanding-javascript-prototypes/",
              id: "671992edad560cac3a766ec1",
            },
          ],
          id: "67199128ad560cac3a766e93",
        },
        {
          username: "john_doe123",
          name: "John Doe",
          blogs: [
            {
              title: "Javascript Primitives",
              author: " Sang",
              url: "https://transang.me/javascript-primitives/",
              id: "67199348ad560cac3a766ee0",
            },
          ],
          id: "67199309ad560cac3a766ed6",
        },
      ];

      render(
        <BrowserRouter>
          <UsersTable users={users} />
        </BrowserRouter>
      );

      screen.getByText("Gabriel Panaitescu");
      screen.getByText("John Doe");
      screen.getByText("2");
      screen.getByText("1");
    });
  });
});
