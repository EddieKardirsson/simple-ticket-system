import type { Request, Response } from 'express';
import { createTicket, getAllTickets } from '../services/ticket.service.ts';

export const handleCreateTicket = (_req: Request, res: Response): void => {
  const ticket = createTicket();
  res.status(201).json(ticket);
}

export const handleGetAllTickets = (_req: Request, res: Response): void => {
  const tickets = getAllTickets();
  res.status(200).json(tickets);
}

