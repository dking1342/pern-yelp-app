import pool from '../config/postgres.js';

// ROUTE    /api/restaurants/
// METHOD   GET
// DESC     Retrieves all restaurants
// ACCESS   PUBLIC
export const getRestaurants = async (req,res) => {
    try {
        res.status(200).json({success:true,payload:'hello from the server'});
    } catch (error) {
        res.status(500).json({success:false,payload:'Bad Request'});
    }
}