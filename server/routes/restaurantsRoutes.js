import express from 'express';
import { 
    getRestaurant,
    getRestaurants,
    postRestaurant,
    putRestaurant,
    deleteRestaurant,
 } from '../controllers/restaurantController.js';

const router = express.Router();

router.get('/restaurants',getRestaurants);
router.get('/restaurants/:id',getRestaurant);
router.post('/restaurants',postRestaurant);
router.put('/restaurants/:id',putRestaurant);
router.delete('/restaurants/:id',deleteRestaurant);

export default router;