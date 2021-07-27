import React, { useContext } from 'react'
import { AppContext } from '../context/store';
import { Link } from 'react-router-dom';
import { Table, DeleteButton, EditButton } from './Table'
import RatingStar from './RatingStar';

const RestaurantList = () => {
    const { state:{data,loading,error},setFetchData } = useContext(AppContext);
    console.log(data)

    if(loading){
        return(
            <div className="container">
                <h5 className="font-weight-light display-4 text-center text-secondary">Loading...</h5>
            </div>
        )
    }
    if(error){
        return(
            <div className="container">
                <h5 className="font-weight-light display-4 text-center text-danger">Loading...</h5>
            </div>
        )
    }
    if(Array.isArray(data)){
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
                        {
                            data.map(item=>(
                                <tr key={item.id} className="align-middle">
                                    <td><Link to={`/restaurants/${item.rest_id}/update`} className="link-warning text-wrap text-decoration-none" >{item.name}</Link></td>
                                    <td>{item.location}</td>
                                    <td>{[...Array(item.price_range)].map((x,i)=>'$').join('')  }</td>
                                    <td><RatingStar rating={item.rating} /></td>
                                    <td><EditButton  id={item.id} /></td>
                                    <td><DeleteButton id={item.id} setFetchData={setFetchData} /></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
    return (
        <div className="container">
            <h5 className="font-weight-light display-4 text-center text-secondary">No Restaurants</h5>
        </div>

    )


}

export default RestaurantList
