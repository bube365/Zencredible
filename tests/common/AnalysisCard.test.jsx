// tests/components/AnalysisCard.test.jsx
import { render, screen } from "@testing-library/react";
import AnalysisCard from "../../src/components/AnalysisCard";
import { CheckCircle2, AlertTriangle } from "lucide-react";

// Optional: mock lucide icons to avoid actual SVG rendering complexity
vi.mock("lucide-react", () => ({
  CheckCircle2: (props) => <div data-testid="check-icon" {...props} />,
  AlertTriangle: (props) => <div data-testid="alert-icon" {...props} />,
}));

describe("AnalysisCard Component", () => {
  it("renders positive status correctly", () => {
    render(
      <AnalysisCard status="positive" description="Everything is good!" />
    );

    // Description
    expect(screen.getByText("Everything is good!")).toBeInTheDocument();

    // Check positive icon
    const icon = screen.getByTestId("check-icon");
    expect(icon).toBeInTheDocument();

    // Icon color class
    expect(icon).toHaveClass("text-green-500");
  });

  it("renders warning status correctly", () => {
    render(<AnalysisCard status="warning" description="Be careful!" />);

    expect(screen.getByText("Be careful!")).toBeInTheDocument();

    const icon = screen.getByTestId("alert-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("text-yellow-500");
  });

  it("renders negative status correctly", () => {
    render(
      <AnalysisCard status="negative" description="Something went wrong!" />
    );

    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();

    const icon = screen.getByTestId("alert-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("text-red-700");
  });
});
