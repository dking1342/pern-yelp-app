import {pool} from '../config/postgres.js';

// ROUTE    /api/v1/list
// METHOD   GET
// DESC     Retrieves all restaurant ids from the list
// ACCESS   PUBLIC
export const getRestaurantList = async (req,res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM restaurant_list");
        res.status(200).json({success:true,payload:rows});
    } catch (error) {
        res.status(500).json({success:false,payload:error.message});
    }
}