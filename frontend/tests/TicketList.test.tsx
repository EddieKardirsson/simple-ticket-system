import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TicketList from "@/components/TicketList";
import type { Ticket } from "@/types/ticket";

const mockTickets: Ticket[] = [
  {
    id: 1,
    code: "1A3F-C09B-44DE",
    is_used: false,
    used_at: null,
    created_at: "2026-01-01T00:00:00",
    updated_at: "2026-01-01T00:00:00",
  },
  {
    id: 2,
    code: "9F2A-B301-CC87",
    is_used: true,
    used_at: "2026-01-02T00:00:00",
    created_at: "2026-01-01T00:00:00",
    updated_at: "2026-01-02T00:00:00",
  },
];

describe("TicketList", () => {
  it("renders a list of tickets", () => {
    render(<TicketList tickets={mockTickets} />);

    expect(screen.getByText("1A3F-C09B-44DE")).toBeInTheDocument();
    expect(screen.getByText("9F2A-B301-CC87")).toBeInTheDocument();
  });

  it("shows unused status for unused tickets", () => {
    render(<TicketList tickets={mockTickets} />);

    expect(screen.getByText("Unused")).toBeInTheDocument();
  });

  it("shows used status for used tickets", () => {
    render(<TicketList tickets={mockTickets} />);

    expect(screen.getByText("Used")).toBeInTheDocument();
  });

  it("renders empty state when no tickets exist", () => {
    render(<TicketList tickets={[]} />);

    expect(screen.getByText("No tickets yet.")).toBeInTheDocument();
  });
});