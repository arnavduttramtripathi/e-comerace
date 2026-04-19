
import express from 'express';
import {
    saveAddress,
    getAddress
} from '../controllers/AddressController.js';

const router = express.Router();

// Router to save a new address
router.post('/add', saveAddress);
router.get('/:userId', getAddress);

export default router;