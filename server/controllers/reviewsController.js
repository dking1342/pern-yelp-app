import {pool} from '../config/postgres.js';

// ROUTE    /api/v1/reviews/
// METHOD   GET
// DESC     Retrieves all reviews
// ACCESS   PUBLIC
export const getReviews = async (req,res) => {
    try {
        let {rows: reviews} = await pool.query("SELECT * FROM reviews");
        res.status(200).json({success:true,payload:reviews})
    } catch (error) {
        res.status(500).json({success:false,payload:error.message});
    }
}

export const getReviewByRestaurant = async (req,res) => {
    try {
        let { id } = req.params;
        let { rows: reviews } = await pool.query("SELECT * FROM reviews WHERE restaurant = $1",[id]);
        res.status(200).json({success:true,payload:reviews})
    } catch (error) {
        res.status(500).json({success:false,payload:error.message});        
    }
}

export const postReview = async (req,res) => {
    try {
        let { restaurant, restaurant_id, username, rating, review } = req.body;
        let { rows: newReview } = await pool.query("INSERT INTO reviews(restaurant,restaurant_id,username,rating,review) VALUES($1,$2,$3,$4,$5) RETURNING *",[restaurant,restaurant_id,username,rating,review]);
        console.log(newReview);
        res.status(201).json({success:true,payload:newReview[0]});
    } catch (error) {
        res.status(500).json({success:false,payload:error.message});
    }
}

export const getReviewListByRestaurant = async (req,res) => {
    try {
        let { id } = req.params;
        let { rows } = await pool.query("SELECT restaurant, AVG(rating)::numeric(10,1) AS average_rating, COUNT(*) AS restaurant_count FROM reviews WHERE restaurant_id = $1 GROUP BY restaurant",[id]);
        res.status(200).json({success:true,payload:rows[0]})
    } catch (error) {
        res.status(500).json({success:false,payload:error.message});        
    }
}