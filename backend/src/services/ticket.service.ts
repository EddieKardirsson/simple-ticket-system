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

export const getAllTickets = (): CreateTicketResponse[] => {
  const rows = db.query<Ticket, []>("SELECT * FROM tickets ORDER BY created_at DESC").all();

  return rows.map(toResponse);
};

export const redeemTicket = (id: number): CreateTicketResponse => {
  const existing = db
    .query<Ticket, [number]>("SELECT * FROM tickets WHERE id = ?")
    .get(id);

  if (!existing) throw { status: 404, message: "Ticket not found" };
  if (existing.is_used === 1) throw { status: 409, message: "Ticket already used" };

  const result = db
    .query<Ticket, [number]>(
      `UPDATE tickets
       SET is_used = 1, used_at = datetime('now'), updated_at = datetime('now')
       WHERE id = ?
       RETURNING *`
    )
    .get(id);

  if (!result) throw new Error("Failed to redeem ticket");

  return toResponse(result);
};