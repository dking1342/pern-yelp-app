-- for help \?

-- creates the database
CREATE DATABASE yelp;

-- create table
CREATE TABLE restaurants(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL CHECK(price_range >= 1 AND price_range <= 5)
);

-- inserts item into the restaurants table
INSERT INTO restaurants(
    name,
    location,
    price_range
) VALUES(
    'Pizza Hut',
    'Dallas',
    3
);


