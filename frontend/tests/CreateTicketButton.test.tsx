import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateTicketButton from "@/components/CreateTicketButton";

describe("CreateTicketButton", () => {
  it("renders a create ticket button", () => {
    render(<CreateTicketButton onTicketCreated={() => {}} />);

    expect(screen.getByRole("button", { name: /create ticket/i })).toBeInTheDocument();
  });

  it("calls onTicketCreated after successful creation", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        id: 1,
        code: "1A3F-C09B-44DE",
        is_used: false,
        used_at: null,
        created_at: "2026-01-01T00:00:00",
        updated_at: "2026-01-01T00:00:00",
      }),
    }) as jest.Mock;

    const onTicketCreated = jest.fn();
    render(<CreateTicketButton onTicketCreated={onTicketCreated} />);

    fireEvent.click(screen.getByRole("button", { name: /create ticket/i }));

    await waitFor(() => {
      expect(onTicketCreated).toHaveBeenCalledTimes(1);
    });
  });

  it("shows an error message when creation fails", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    }) as jest.Mock;

    render(<CreateTicketButton onTicketCreated={() => {}} />);

    fireEvent.click(screen.getByRole("button", { name: /create ticket/i }));

    await waitFor(() => {
      expect(screen.getByText(/failed to create ticket/i)).toBeInTheDocument();
    });
  });
});