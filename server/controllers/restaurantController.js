import {pool} from '../config/postgres.js';

// ROUTE    /api/v1/restaurants
// METHOD   GET
// DESC     Retrieves all restaurants
// ACCESS   PUBLIC
export const getRestaurants = async (req,res) => {
    try {
        const { rows: restaurants} = await pool.query("SELECT * FROM restaurants");
        const { rows: ratings } = await pool.query("SELECT restaurant_id,restaurant, AVG(rating)::numeric(10,1) AS rating_average FROM reviews GROUP BY restaurant_id,restaurant");

        let payload = restaurants.map(entry=>{
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
        
        res.status(200).json({success:true,payload});
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
        let rId;

        const { rows } = await pool.query("SELECT * FROM restaurant_list WHERE restaurant_name = $1",[name]);
        if(!rows.length){
            const { rows: restList } = await pool.query("INSERT INTO restaurant_list(restaurant_name) VALUES($1) RETURNING *",[name]);
            rId = restList[0].restaurant_id;
        } else {
            rId = rows[0].restaurant_id;
        }

        const { rows: newRestaurant } = await pool.query("INSERT INTO restaurants(name,location,price_range,rest_id) VALUES($1,$2,$3,$4) RETURNING *",[name,location,price_range,rId]);
        res.status(200).json({success:true,payload:newRestaurant[0]});
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
        const { rows } = await pool.query('SELECT * FROM restaurants WHERE id = $1',[id]);
        let bodyInputs = Object.entries(req.body);
        let rId;
        let newName = bodyInputs[0][1];

        let { rows: listId } = await pool.query("SELECT * FROM restaurant_list WHERE restaurant_name = $1",[newName]);
        if(!listId.length){
            const { rows: restList } = await pool.query("INSERT INTO restaurant_list(restaurant_name) VALUES($1) RETURNING *",[newName]);
            rId = restList[0].restaurant_id;
        } else {
                console.log('entry exists')
                rId = listId[0].restaurant_id;
        }
        bodyInputs = [...bodyInputs,['rest_id',rId]]

        let { name, location, price_range, rest_id } = rows.map(r=>{
            bodyInputs.forEach((key,i)=> !key[1] && (bodyInputs[i][1] = r[key[0]]));
            return Object.fromEntries(bodyInputs);
        })[0];

        const { rows: updateRestaurant } = await pool.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3, rest_id = $4 WHERE id = $5 RETURNING *",[name,location,price_range,rest_id,id]);
        res.status(200).json({success:true,payload:updateRestaurant[0]});
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

