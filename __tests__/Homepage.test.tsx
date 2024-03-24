import { render, screen } from "@testing-library/react";
import Homepage from "@/components/homepage";

it("should have Welcome text", () => {
  render(<Homepage />);

  const myElem = screen.getByText((content, element) => {
    return (
      //@ts-ignore
      content.includes("Welcome") && element.tagName.toLowerCase() === "span"
    );
  });

  expect(myElem).toBeInTheDocument();
});
