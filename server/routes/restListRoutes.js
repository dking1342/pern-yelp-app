import express from 'express';
import { 
    getRestaurantList,
} from '../controllers/listController.js';

const router = express.Router();

router.get('/',getRestaurantList);

export default router;