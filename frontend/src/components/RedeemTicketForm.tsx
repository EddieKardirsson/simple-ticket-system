"use client";

import { useState } from "react";
import type { Ticket } from "@/types/ticket";

interface Props {
  tickets: Ticket[];
  onTicketRedeemed: () => void;
}

export default function RedeemTicketForm({ tickets, onTicketRedeemed }: Props) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(null as string | null);
  const [loading, setLoading] = useState(false);

  const handleRedeem = async () => {
    setError(null);

    const ticket = tickets.find((t) => t.code === code);

    if (!ticket) {
      setError("Ticket not found");
      return;
    }

    if (ticket.is_used) {
      setError("Ticket already used");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tickets/${ticket.id}/redeem`,
        { method: "PATCH" }
      );

      if (!res.ok) throw new Error("Failed to redeem ticket");

      setCode("");
      onTicketRedeemed();
    } catch {
      setError("Failed to redeem ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
    <input
      type="text"
  value={code}
  onChange={(e) => setCode(e.target.value)}
  placeholder="Enter ticket code"
  className="w-full border-2 border-gray-900 rounded-2xl px-4 py-3 font-mono tracking-widest text-gray-900 bg-white focus:outline-none"
  />
  <button
    onClick={handleRedeem}
  disabled={loading || code.trim() === ""}
  className="w-full bg-white border-2 border-gray-900 rounded-2xl py-4 font-bold uppercase tracking-wide text-gray-900 active:scale-95 transition-transform disabled:opacity-50"
    >
    {loading ? "Redeeming..." : "Redeem"}
    </button>
  {error && (
    <p className="text-red-500 text-sm text-center">{error}</p>
  )}
  </div>
);
}