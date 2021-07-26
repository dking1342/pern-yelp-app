import React from 'react'
import AddRestaurant from '../components/AddRestaurant'
import Header from '../components/Header'
import RestaurantList from '../components/RestaurantList'

const Home = () => {
    return (
        <>
            <Header text='Restaurant Finder' />
            <AddRestaurant />
            <RestaurantList />
        </>
    )
}

export default Home
