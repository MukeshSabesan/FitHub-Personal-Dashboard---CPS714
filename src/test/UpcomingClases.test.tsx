import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import UpcomingClasses from "../components/UpcomingClasses";

describe("UpcomingClasses", () => {
  it("TC-Class-A: shows 5 upcoming classes", () => {
    render(<UpcomingClasses />);
    expect(screen.getAllByText(/instructor:/i)).toHaveLength(5);
  });

  it("renders View All Available Classes button", () => {
    render(<UpcomingClasses />);
    expect(
      screen.getByRole("button", { name: /view all available classes/i })
    ).toBeInTheDocument();
  });
});
