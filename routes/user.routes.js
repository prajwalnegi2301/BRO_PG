import express from 'express';
import { registerCustomer, loginCustomer, logOutCustomer, deleteCustomer, getParticularCustomer,  } from '../controllers/user.controllers.js';
import {  isAuthenticated, isCustomerAuthenticated } from '../middlewares/auth.js';
import { createContactUs, getAllContactUs, updateContactUs } from '../controllers/contactUs.controllers.js';
import { getAllComplaints } from '../controllers/contactUs.controllers.js';


const router = express.Router();

router.post('/register',registerCustomer)
router.post('/login',loginCustomer);
router.get('/logout',isCustomerAuthenticated,logOutCustomer);




router.delete('/deleteCustomerDetails',isCustomerAuthenticated,deleteCustomer);

router.get('/getCustomer',isCustomerAuthenticated,getParticularCustomer);


router.post('/createMessage', isCustomerAuthenticated,createContactUs);
router.get('/getMessages',isAuthenticated,getAllContactUs);
router.get('/getAllMessages',isAuthenticated,getAllComplaints);
router.put('/updateContactUs/:messageId',isAuthenticated,updateContactUs);
export default router;