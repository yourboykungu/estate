import express, { Router } from 'express';
import { test, updateUser,deleteUser ,getUserListings } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { get } from 'mongoose';

const router= express.Router();

router.get('/test',test);
router.post('/update/:id', verifyToken , updateUser);//, verifyToken (has to be appled before updating to verify user )
router.delete('/delete/:id', verifyToken  , deleteUser);//, verifyToken (has to be appled before updating to verify user )
router.get('/listings/:id', verifyToken, getUserListings);

export default router; 