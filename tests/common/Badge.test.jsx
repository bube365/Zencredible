// tests/components/Badge.test.jsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Badge, { BadgeText, BadgeColor } from "../../src/components/Badge";

describe("Badge Component", () => {
  it("renders children with default variant", () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText("Default Badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-gray-100 text-gray-700");
  });

  it("renders children with low variant", () => {
    render(<Badge variant="low">Low Badge</Badge>);
    const badge = screen.getByText("Low Badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-[#DCFCE7] text-[#016630]");
  });

  it("renders children with medium variant", () => {
    render(<Badge variant="medium">Medium Badge</Badge>);
    const badge = screen.getByText("Medium Badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-orange-100 text-orange-700");
  });

  it("renders children with high variant", () => {
    render(<Badge variant="high">High Badge</Badge>);
    const badge = screen.getByText("High Badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-red-100 text-red-700");
  });
});

describe("BadgeText Component", () => {
  it("renders BadgeText with default variant", () => {
    render(<BadgeText>Default Text</BadgeText>);
    const text = screen.getByText("Default Text");
    expect(text).toBeInTheDocument();
    expect(text).toHaveClass("text-gray-700");
  });

  it("renders BadgeText with low variant", () => {
    render(<BadgeText variant="low">Low Text</BadgeText>);
    const text = screen.getByText("Low Text");
    expect(text).toBeInTheDocument();
    expect(text).toHaveClass("text-[#016630]");
  });

  it("renders BadgeText with high variant", () => {
    render(<BadgeText variant="high">High Text</BadgeText>);
    const text = screen.getByText("High Text");
    expect(text).toBeInTheDocument();
    expect(text).toHaveClass("text-red-700");
  });
});

describe("BadgeColor utility", () => {
  it("returns correct color for low", () => {
    expect(BadgeColor("low")).toBe("text-[#016630]");
  });

  it("returns correct color for medium", () => {
    expect(BadgeColor("medium")).toBe("text-orange-700");
  });

  it("returns correct color for high", () => {
    expect(BadgeColor("high")).toBe("text-red-700");
  });

  it("returns fallback color for unknown variant", () => {
    expect(BadgeColor("unknown")).toBe("text-gray-900");
  });
});
