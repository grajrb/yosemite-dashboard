import { render, screen } from "@testing-library/react";
import { KpiCard } from "@/components/analytics/KpiCard";

describe("KpiCard", () => {
  it("renders label and value", () => {
    render(<KpiCard label="DAU" value="9,125" />);

    expect(screen.getByText("DAU")).toBeInTheDocument();
    expect(screen.getByText("9,125")).toBeInTheDocument();
  });
});
