import { pool } from '../config/postgres.js';

export const findRating = async (array) => {
    const { rows: ratings } = await pool.query("SELECT restaurant_id,restaurant, AVG(rating)::numeric(10,1) AS rating_average FROM reviews GROUP BY restaurant_id,restaurant");

    let payload = array.map(entry=>{
        let average_rating = 0;
        ratings.forEach(rate=>{
            if(entry.rest_id === rate.restaurant_id){
                average_rating = Number(rate.rating_average)
            } 
        })
        return {
            ...entry,
            rating:average_rating
        }
    })

    return payload;
}