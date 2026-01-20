import { describe, expect, it } from "vitest";
import HomeSection from "../../components/sections/home/HomeSection";
import { render, screen } from "@testing-library/react";

describe("Home section component tests", () => {
  it("Should render correctly", () => {
    render(<HomeSection />);

    const sloganContainer = screen.getByText("The best clothing store");

    expect(sloganContainer).toBeInTheDocument();
  });
});
