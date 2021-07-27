import express from 'express';
import { 
    getReviewByRestaurant,
    getReviewListByRestaurant,
    getReviews,
    postReview, 
} from '../controllers/reviewsController.js';

const router = express.Router();

router.get('/',getReviews);
router.get('/:id',getReviewByRestaurant);
router.post('/new',postReview);
router.get('/:id/list',getReviewListByRestaurant);

export default router;