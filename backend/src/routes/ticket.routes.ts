import { Router } from 'express';
import {handleCreateTicket, handleGetAllTickets} from '../controllers/ticket.controller';

const router = Router();

router.post('/', handleCreateTicket);
router.get('/', handleGetAllTickets);

export default router;