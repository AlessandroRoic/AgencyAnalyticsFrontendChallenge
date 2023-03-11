import { render, screen } from "@testing-library/react";
import Gallery from "./Gallery";

test("gallery loads correctly", () => {
  render(<Gallery />);
  const headingLabel = screen.getByText("Photos");
  expect(headingLabel).toBeVisible();
});
