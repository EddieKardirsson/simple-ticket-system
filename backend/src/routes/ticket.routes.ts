import { Router } from 'express';
import { handleCreateTicket } from '../controllers/ticket.controller';

const router = Router();

router.post('/', handleCreateTicket);

export default router;