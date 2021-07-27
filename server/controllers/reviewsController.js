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
        let { rows: reviews } = await pool.query("SELECT * FROM reviews WHERE restaurant_id = $1",[id]);
        res.status(200).json({success:true,payload:reviews})
    } catch (error) {
        res.status(500).json({success:false,payload:error.message});        
    }
}

export const postReview = async (req,res) => {
    try {
        let { restaurant, restaurant_id, username, rating, review } = req.body;
        let { rows: newReview } = await pool.query("INSERT INTO reviews(restaurant,restaurant_id,username,rating,review) VALUES($1,$2,$3,$4,$5) RETURNING *",[restaurant,restaurant_id,username,rating,review]);
        // get header data 
        let { rows: headerFull } = await pool.query("SELECT restaurant, AVG(rating)::numeric(10,1) AS rating_average, COUNT(*) AS rating_count FROM reviews WHERE restaurant_id = $1 GROUP BY restaurant",[restaurant_id]);

        let payload = {
            header:headerFull[0],
            reviews:newReview[0]
        }

        res.status(201).json({success:true,payload});
    } catch (error) {
        res.status(500).json({success:false,payload:error.message});
    }
}

export const getReviewListByRestaurant = async (req,res) => {
    try {
        // check to see if there are any reviews
        let { id } = req.params;
        const { rows: isReviews} = await pool.query("SELECT * FROM reviews WHERE restaurant_id = $1",[id]);
        if(!isReviews.length){
            // no review yet for the restaurant
            // return a header with restaurant info
            const { rows: restaurantName } = await pool.query("SELECT * FROM restaurant_list WHERE restaurant_id = $1",[id]);
            let payloadEmpty = {
                header:{
                    restaurant:restaurantName[0].restaurant_name,
                    rating_average:0,
                    rating_count:0
                },
                reviews:[]
            }
            res.status(200).json({success:true,payload:payloadEmpty});
        } else {
            // get header data 
            let { rows: headerFull } = await pool.query("SELECT restaurant, AVG(rating)::numeric(10,1) AS rating_average, COUNT(*) AS rating_count FROM reviews WHERE restaurant_id = $1 GROUP BY restaurant",[id]);
            // get review data
            let { rows: reviews } = await pool.query("SELECT * FROM reviews WHERE restaurant_id = $1",[id]);

            // object with payload
            let payload = {
                header:headerFull[0],
                reviews
            }
            
            res.status(200).json({success:true,payload})
        }


    } catch (error) {
        res.status(500).json({success:false,payload:error.message});        
    }
}