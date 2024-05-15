import express, { Router } from 'express';
import { test, updateUser,deleteUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router= express.Router();

router.get('/test',test);
router.post('/update/:id', verifyToken , updateUser);//, verifyToken (has to be appled before updating to verify user )
router.delete('/delete/:id', verifyToken  , deleteUser);//, verifyToken (has to be appled before updating to verify user )


export default router; 