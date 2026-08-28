import db from "../config/database.ts";
import { generateUniqueTicketCode } from "../utils/ticketCodeGenerator.ts";
import type { Ticket, CreateTicketResponse } from "../models/ticket.model.ts";

const toResponse = (ticket: Ticket): CreateTicketResponse => ({
  id: ticket.id,
  code: ticket.code,
  is_used: ticket.is_used === 1,
  used_at: ticket.used_at,
  created_at: ticket.created_at,
  updated_at: ticket.updated_at,
});

export const createTicket = (): CreateTicketResponse => {
  const code = generateUniqueTicketCode();

  const result = db.query<Ticket, [string]>(
    `INSERT INTO tickets (code) VALUES (?) RETURNING *`
  ).get(code);

  if(!result) throw new Error("Failed to create ticket");

  return toResponse(result);
};