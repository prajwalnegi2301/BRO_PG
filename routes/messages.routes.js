import express from 'express';
import { isAuthenticated, isCustomerAuthenticated } from '../middlewares/auth.js';
import { createMessage, getAllMessages } from '../controllers/message.controllers.js';

const router = express.Router();


router.get('/getMessages',isAuthenticated,getAllMessages);
router.post('/createMessage/:id',isCustomerAuthenticated,createMessage);

export default router;
