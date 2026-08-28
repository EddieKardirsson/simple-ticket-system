import { Router } from 'express';
import { handleCreateTicket, handleGetAllTickets, handleRedeemTicket, handleDeleteTicket } from '../controllers/ticket.controller';

const router = Router();

router.post('/', handleCreateTicket);
router.get('/', handleGetAllTickets);
router.patch('/:id/redeem', handleRedeemTicket);
router.delete('/:id', handleDeleteTicket);

export default router;