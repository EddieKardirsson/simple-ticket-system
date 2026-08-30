"use client";

import { useState } from "react";

interface Props {
  onTicketCreated: () => void;
}

export default function CreateTicketButton({ onTicketCreated }: Props) {
  const [error, setError] = useState(null as string | null);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tickets`,
        { method: "POST" }
      );

      if (!res.ok) throw new Error("Failed to create ticket");

      onTicketCreated();
    } catch {
      setError("Failed to create ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleClick}
        disabled={loading}
        className="w-full bg-white border-2 border-gray-900 rounded-2xl py-4 font-bold uppercase tracking-wide text-gray-900 active:scale-95 transition-transform disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Ticket"}
      </button>
      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}
    </div>
  );
}