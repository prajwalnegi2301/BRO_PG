import express from 'express';
import { registerAdmin, loginAdmin, logoutAdmin,  getAdmin } from '../controllers/admin.controllers.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { getAllContactUs } from '../controllers/contactUs.controllers.js';



const router = express.Router();

router.post('/register',registerAdmin)
router.post('/login',loginAdmin);
router.get('/logout',isAuthenticated,logoutAdmin);




router.get('/getAdmin',isAuthenticated,getAdmin);

router.get('/getMessage',getAllContactUs);

export default router;