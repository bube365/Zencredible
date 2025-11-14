import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Dashboard from "../../src/pages/Dashboard";
import { useFetchCreditScoreQuery } from "../../src/store/api/authApi";

// Mock the API hook BEFORE importing the component
vi.mock("../../src/store/api/authApi", () => ({
  useFetchCreditScoreQuery: vi.fn(),
}));

// Mock Navbar
vi.mock("../../src/components/Navbar", () => ({
  Navbar: () => <div data-testid="navbar">Navbar</div>,
}));

// Mock BorrowerCard
vi.mock("../../src/components/BorrowerCard", () => ({
  BorrowerCard: ({ borrower }) => (
    <div data-testid="borrower-card">{borrower.user.fullName}</div>
  ),
}));

// Mock Loader
vi.mock("../../src/common/loader", () => ({
  Loader: ({ text }) => <div>{text}</div>,
}));

describe("Dashboard Component - Minimal Tests", () => {
  it("shows loader while fetching data", () => {
    // Mock return value
    useFetchCreditScoreQuery.mockReturnValue({
      data: null,
      isLoading: true,
      isFetching: true,
      error: null,
    });

    render(<Dashboard onSelectBorrower={vi.fn()} />);
    expect(screen.getByText("Please wait...")).toBeInTheDocument();
  });
});
