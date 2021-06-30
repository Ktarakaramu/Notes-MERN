import { render, fireEvent } from "@testing-library/react";
import Register from "../Register";

it("User registration sucessfull", () => {
  const { queryByTitle } = render(<Register />);
  const btn = queryByTitle("register");
  expect(btn).toBeTruthy();
});

describe("Input value", () => {
  it("Update the text", () => {
    const { queryByPlaceholderText } = render(<Register />);

    const displayName = queryByPlaceholderText("username");

    fireEvent.change(displayName, { target: { value: "text" } });

    expect(displayName.value).toBe("text");
  });
});
