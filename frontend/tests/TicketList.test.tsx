import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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
    render(<TicketList tickets={mockTickets} onTicketDeleted={() => {}} />);

    expect(screen.getByText("1A3F-C09B-44DE")).toBeInTheDocument();
    expect(screen.getByText("9F2A-B301-CC87")).toBeInTheDocument();
  });

  it("shows unused status for unused tickets", () => {
    render(<TicketList tickets={mockTickets} onTicketDeleted={() => {}} />);

    expect(screen.getByText("Unused")).toBeInTheDocument();
  });

  it("shows used status for used tickets", () => {
    render(<TicketList tickets={mockTickets} onTicketDeleted={() => {}} />);

    expect(screen.getByText("Used")).toBeInTheDocument();
  });

  it("renders empty state when no tickets exist", () => {
    render(<TicketList tickets={[]} onTicketDeleted={() => {}} />);

    expect(screen.getByText("No tickets yet.")).toBeInTheDocument();
  });

  it("shows a delete button only for unused tickets", () => {
    render(<TicketList tickets={mockTickets} onTicketDeleted={() => {}} />);

    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    expect(deleteButtons).toHaveLength(1);
  });

  it("calls onTicketDeleted after successful deletion", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
    }) as jest.Mock;

    const onTicketDeleted = jest.fn();
    render(<TicketList tickets={mockTickets} onTicketDeleted={onTicketDeleted} />);

    fireEvent.click(screen.getByRole("button", { name: /delete/i }));

    await waitFor(() => {
      expect(onTicketDeleted).toHaveBeenCalledTimes(1);
    });
  });
});