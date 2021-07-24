import express from 'express';
import { 
    getRestaurants,
 } from '../controllers/restaurantController';

const router = express.Router();

router.get('/',getRestaurants);

export default router;