import type { Request, Response } from 'express';
import { createTicket } from '../services/ticket.service.ts';

export const handleCreateTicket = (_req: Request, res: Response): void => {
  const ticket = createTicket();
  res.status(201).json(ticket);
}