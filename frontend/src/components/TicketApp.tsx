"use client";

import { useState, useEffect, useCallback } from "react";
import type { Ticket } from "@/types/ticket";
import TicketList from "./TicketList";
import CreateTicketButton from "./CreateTicketButton";
import RedeemTicketForm from "./RedeemTicketForm";

export default function TicketApp() {
  const [tickets, setTickets] = useState([] as Ticket[]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = useCallback(async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tickets`);
      const data = await res.json();
      setTickets(data);
    } catch {
      // silently fail for now
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return (
    <>
      <CreateTicketButton onTicketCreated={fetchTickets} />
      <RedeemTicketForm tickets={tickets} onTicketRedeemed={fetchTickets} />
      {loading ? (
        <p className="text-center text-gray-500 text-sm">Loading tickets...</p>
      ) : (
        <TicketList tickets={tickets} onTicketDeleted={fetchTickets} />
      )}
    </>
  );
}