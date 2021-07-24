import {pool} from '../config/postgres.js';

// ROUTE    /api/v1/restaurants
// METHOD   GET
// DESC     Retrieves all restaurants
// ACCESS   PUBLIC
export const getRestaurants = async (req,res) => {
    try {
        const restaurants = await pool.query("SELECT * FROM restaurants");
        res.status(200).json({success:true,payload:restaurants.rows});
    } catch (error) {
        res.status(500).json({success:false,payload:'Bad Request'});
    }
}

// ROUTE    /api/v1/restaurants/:id
// METHOD   GET
// DESC     Retrieves single restaurant
// ACCESS   PUBLIC
export const getRestaurant = async (req,res) => {
    try {
        let { id } = req.params;
        const restaurant = await pool.query('SELECT * FROM restaurants WHERE id = $1',[id]);
        res.status(200).json({success:true,payload:restaurant.rows[0]});
    } catch (error) {
        res.status(500).json({success:false,payload:error.message});
    }
}

// ROUTE    /api/v1/restaurants
// METHOD   POST
// DESC     Saves a new restaurant
// ACCESS   PUBLIC
export const postRestaurant = async (req,res) => {
    try {
        let { name, location, price_range } = req.body;
        const newRestaurant = await pool.query("INSERT INTO restaurants(name,location,price_range) VALUES($1,$2,$3) RETURNING *",[name,location,price_range]);
        console.log(newRestaurant);
        res.status(200).json({success:true,payload:newRestaurant.rows[0]});
    } catch (error) {
        res.status(500).json({success:false,payload:error.message});
    }
}

// ROUTE    /api/v1/restaurants/:id
// METHOD   PUT
// DESC     Updates an exisiting restaurant
// ACCESS   PUBLIC
export const putRestaurant = async (req,res) => {
    try {
        const { id } = req.params;
        let bodyInputs = Object.entries(req.body);
        const { rows } = await pool.query('SELECT * FROM restaurants WHERE id = $1',[id]);

        let { name, location, price_range } = rows.map(r=>{
            bodyInputs.forEach((key,i)=> !key[1] && (bodyInputs[i][1] = r[key[0]]));
            return Object.fromEntries(bodyInputs);
        })[0];
        const updateRestaurant = await pool.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",[name,location,price_range,id]);
        res.status(200).json({success:true,payload:updateRestaurant.rows[0]});
    } catch (error) {
        res.status(500).json({success:false,payload:error.message});
    }
}

// ROUTE    /api/v1/restaurants/:id
// METHOD   DELETE
// DESC     Deletes an existing restaurant
// ACCESS   PUBLIC
export const deleteRestaurant = async (req,res) => {
    try {
        const { id } = req.params;
        let deleteRestaurant = await pool.query("DELETE FROM restaurants WHERE id = $1 RETURNING *",[id]);
        deleteRestaurant.rowCount 
            ? res.status(200).json({success:true,payload:deleteRestaurant.rows[0]}) 
            : res.status(400).json({success:false,payload:'No entry found in the database'});
    } catch (error) {
        res.status(500).json({success:false,payload:'Bad Request'});
    }
}
