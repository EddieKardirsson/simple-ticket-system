import type { Ticket } from "@/types/ticket";

interface Props {
  tickets: Ticket[];
}

export default function TicketList({ tickets }: Props) {
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
          <span
            className={`text-sm font-medium ${
              ticket.is_used ? "text-gray-400" : "text-green-600"
            }`}
          >
            {ticket.is_used ? "Used" : "Unused"}
          </span>
        </li>
      ))}
    </ul>
  );
}