import { Router } from 'express';
import { handleCreateTicket, handleGetAllTickets, handleRedeemTicket } from '../controllers/ticket.controller';

const router = Router();

router.post('/', handleCreateTicket);
router.get('/', handleGetAllTickets);
router.patch('/:id/redeem', handleRedeemTicket);

export default router;