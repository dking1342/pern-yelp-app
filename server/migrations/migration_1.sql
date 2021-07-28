-- for help \?

-- creates the database
CREATE DATABASE yelp;

-- create restauarnts table
CREATE TABLE restaurants(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL CHECK(price_range >= 1 AND price_range <= 5),
    rest_id uuid NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_restaurants FOREIGN KEY(rest_id) REFERENCES restaurant_list(restaurant_id) ON DELETE SET NULL
);

-- create reviews table
CREATE TABLE reviews(
    review_id uuid NOT NULL DEFAULT uuid_generate_v4(),
    restaurant VARCHAR(50) NOT NULL,
    restaurant_id uuid NOT NULL,
    username VARCHAR(100) NOT NULL,
    rating INT NOT NULL CHECK(rating >=1 AND rating <= 5),
    review TEXT,
    createdAt TIMESTAMP DEFAULT NOW()
    PRIMARY KEY(review_id),
    CONSTRAINT fk_reviews FOREIGN KEY(restaurant_id) REFERENCES restaurant_list(restaurant_id) ON DELETE SET NULL
);

-- create a restaurant list
CREATE TABLE restaurant_list(
    restaurant_id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    restaurant_name VARCHAR(100) NOT NULL
);


-----------------------------------------
-- CRUD
-- restaurants

-- inserts item into the restaurants table
INSERT INTO restaurants(
    name,
    location,
    price_range,
    rest_id
) VALUES(
    'Pizza Hut',
    'Dallas',
    3,
    '1234'
);

-- gets all records from restaurants table
SELECT *
FROM restaurants;

-- gets a single restaurant based on the id
SELECT *
FROM restaurants
WHERE id = id;

-- updates a restaurant entry
UPDATE restaurants
SET name = 'New restauarnt name',
    location = 'New location',
    price_range = 5
WHERE id = id;

-- deletes a restaurant entry
DELETE FROM restaurants 
WHERE id = id;

------------------------------------------
-- CRUD
-- reviews

-- inserts item into the reviews table
INSERT INTO reviews(
    restaurant,
    restaurant_id,
    username,
    rating,
    review
) VALUES(
    'Hardees',
    '7ebe7e60-8410-4b37-bc17-6ceed37baf2a',
    'Kavooce',
    4,
    'This is my review'
);

-- gets all reviews
SELECT *
FROM reviews;

-- gets all reviews based on restaurant id
SELECT * 
FROM reviews
WHERE restaurant_id = '1c6a1a7b-104c-4d93-9177-35ff94c26661';

-- queries the restaurants and returns the average and count
SELECT restaurant, AVG(rating)::numeric(10,1) AS average, COUNT(rating) AS count
FROM reviews
GROUP BY restaurant;

-- queries restaurants then filters by restaurant the avg and count
SELECT restaurant, AVG(rating)::numeric(10,1) AS rating_average, COUNT(rating) AS rating_count
FROM reviews
WHERE restaurant_id = '9d15cd53-22ec-4a69-b0b2-c65ea13d40d9'
GROUP BY restaurant;


------------------------------------------
-- practice
-- joins
 SELECT reviews.restaurant_id,reviews.restaurant, reviews.username, reviews.rating
 FROM restaurants
 RIGHT JOIN reviews
 ON reviews.restaurant_id = restaurants.id;

SELECT restaurants.id,restaurants.name,restaurants.location, restaurants.price_range, AVG(reviews.rating)
FROM reviews
LEFT JOIN restaurants
ON reviews.restaurant_id = restaurants.rest_id
GROUP BY restaurants.id,restaurants.name,restaurants.location,restaurants.price_range,reviews.rating;
