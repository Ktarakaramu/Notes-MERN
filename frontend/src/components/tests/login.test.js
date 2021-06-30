import { render, fireEvent } from "@testing-library/react";
import Login from "../Login";

it("User logged in successfully", () => {
  const { queryByTitle, queryByPlaceholderText } = render(<Login />);
  expect(queryByTitle("login")).toBeTruthy();
  expect(queryByPlaceholderText("example@xyz.com")).toBeTruthy();
  expect(queryByPlaceholderText("password")).toBeTruthy();
});
