import React from 'react'
import Table, { TableButton } from './Table'

const RestaurantList = () => {
    return (
        <div className="list-group container">
            <Table>
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Wendy's</td>
                        <td>Dallas</td>
                        <td>$</td>
                        <td>Rating</td>
                        <td><TableButton type='Edit' btnType='warning' /></td>
                        <td><TableButton type='Delete' btnType='danger' /></td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default RestaurantList
