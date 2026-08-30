import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RedeemTicketForm from "@/components/RedeemTicketForm";
import type { Ticket } from "@/types/ticket";

const mockTicket: Ticket = {
  id: 1,
  code: "1A3F-C09B-44DE",
  is_used: false,
  used_at: null,
  created_at: "2026-01-01T00:00:00",
  updated_at: "2026-01-01T00:00:00",
};

describe("RedeemTicketForm", () => {
  it("renders a code input and a redeem button", () => {
    render(<RedeemTicketForm onTicketRedeemed={() => {}} tickets={[mockTicket]} />);

    expect(screen.getByPlaceholderText(/enter ticket code/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /redeem/i })).toBeInTheDocument();
  });

  it("calls onTicketRedeemed after successful redemption", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ...mockTicket, is_used: true, used_at: "2026-01-02T00:00:00" }),
    }) as jest.Mock;

    const onTicketRedeemed = jest.fn();
    render(<RedeemTicketForm onTicketRedeemed={onTicketRedeemed} tickets={[mockTicket]} />);

    fireEvent.change(screen.getByPlaceholderText(/enter ticket code/i), {
      target: { value: "1A3F-C09B-44DE" },
    });
    fireEvent.click(screen.getByRole("button", { name: /redeem/i }));

    await waitFor(() => {
      expect(onTicketRedeemed).toHaveBeenCalledTimes(1);
    });
  });

  it("shows an error when the code does not match any ticket", async () => {
    render(<RedeemTicketForm onTicketRedeemed={() => {}} tickets={[mockTicket]} />);

    fireEvent.change(screen.getByPlaceholderText(/enter ticket code/i), {
      target: { value: "0000-0000-0000" },
    });
    fireEvent.click(screen.getByRole("button", { name: /redeem/i }));

    await waitFor(() => {
      expect(screen.getByText(/ticket not found/i)).toBeInTheDocument();
    });
  });

  it("shows an error when the ticket is already used", async () => {
    const usedTicket: Ticket = { ...mockTicket, is_used: true, used_at: "2026-01-02T00:00:00" };
    render(<RedeemTicketForm onTicketRedeemed={() => {}} tickets={[usedTicket]} />);

    fireEvent.change(screen.getByPlaceholderText(/enter ticket code/i), {
      target: { value: "1A3F-C09B-44DE" },
    });
    fireEvent.click(screen.getByRole("button", { name: /redeem/i }));

    await waitFor(() => {
      expect(screen.getByText(/ticket already used/i)).toBeInTheDocument();
    });
  });
});