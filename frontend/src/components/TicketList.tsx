"use client";

import { useState } from "react";
import type { Ticket } from "@/types/ticket";

interface Props {
  tickets: Ticket[];
  onTicketDeleted: () => void;
}

export default function TicketList({ tickets, onTicketDeleted }: Props) {
  const [deletingId, setDeletingId] = useState(null as number | null);

  const handleDelete = async (id: number) => {
    setDeletingId(id);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tickets/${id}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Failed to delete ticket");

      onTicketDeleted();
    } catch {
      // silently fail for now
    } finally {
      setDeletingId(null);
    }
  };

  if (tickets.length === 0) {
    return (
      <p className="text-center text-gray-500 text-sm">No tickets yet.</p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {tickets.map((ticket) => (
        <li
          key={ticket.id}
          className="bg-white rounded-2xl border border-gray-200 px-4 py-3 flex flex-col gap-1 shadow-sm"
        >
          <span className="font-mono font-bold tracking-widest text-gray-900">
            {ticket.code}
          </span>
          <div className="flex items-center justify-between">
            <span
              className={`text-sm font-medium ${
                ticket.is_used ? "text-gray-400" : "text-green-600"
              }`}
            >
              {ticket.is_used ? "Used" : "Unused"}
            </span>
            {!ticket.is_used && (
              <button
                onClick={() => handleDelete(ticket.id)}
                disabled={deletingId === ticket.id}
                className="text-sm text-red-500 font-medium disabled:opacity-50"
              >
                {deletingId === ticket.id ? "Deleting..." : "Delete"}
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}