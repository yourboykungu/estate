import express, { Router } from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createListening } from '../controllers/listing.controller.js';


const router= express.Router();

router.post('/create', verifyToken, createListening);

export default router;