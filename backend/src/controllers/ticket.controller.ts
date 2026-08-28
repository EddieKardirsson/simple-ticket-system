import type { Request, Response, NextFunction } from 'express';
import { createTicket, getAllTickets, redeemTicket } from '../services/ticket.service.ts';

export const handleCreateTicket = (_req: Request, res: Response, next: NextFunction): void => {
  try {
    const ticket = createTicket();
    res.status(201).json(ticket);
  } catch (error) {
    next(error);
  }
};

export const handleGetAllTickets = (_req: Request, res: Response, next: NextFunction): void => {
  try {
    const tickets = getAllTickets();
    res.status(200).json(tickets);
  } catch (error) {
    next(error);
  }
};

export const handleRedeemTicket = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const id = Number(req.params.id);
    const ticket = redeemTicket(id);
    res.status(200).json(ticket);
  } catch (error) {
    next(error);
  }
};
