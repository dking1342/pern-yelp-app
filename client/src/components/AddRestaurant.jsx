import React, { useContext } from 'react'
import { AppContext } from '../context/store'
import { useForm } from '../hooks/useForm'

const AddRestaurant = () => {
    const { setFetchData } = useContext(AppContext);
    const initialState = {
        name:'',
        location:'',
        price_range:''
    }

    const callback = () => {
        setFetchData({
            url:'http://localhost:5000/api/v1/restaurants/',
            method:'POST',
            body:values
        })
    }

    const { 
        values,
        onChange,
        onSubmit
    } = useForm(initialState,callback)


    return (
        <div className="mb-4 container">
            <form onSubmit={onSubmit}>
                <div className="row">
                    <div className="col-12 col-md-3 my-2">
                        <input 
                            type="text" 
                            name="name"
                            className="form-control"
                            value={values.name}
                            placeholder='Name'
                            onChange={onChange}
                        />
                    </div>
                    <div className="col-12 col-md-3 my-2">
                        <input 
                            type="text" 
                            name="location"
                            className="form-control"
                            value={values.location}
                            placeholder='Location'
                            onChange={onChange}
                        />
                    </div>
                    <div className="col-12 col-md-3 my-2">
                        <select 
                            name="price_range" 
                            className='form-select'
                            value={values.price_range}
                            onChange={onChange}
                        >
                            {
                                [...Array(6)].map((item,index)=> (
                                    (index === 0) ? (
                                        <option key={index} value="1" disabled>Price Range</option>
                                    ) : (
                                        <option key={index} value={index}>{ [...Array(index)].map((x,i)=>'$').join('') }</option>
                                    )
                                ))
                            }
                        </select>
                    </div>
                    <div className="col-12-auto col-md-3 my-2">
                        <button className="btn btn-primary" style={{width:'100%'}}>
                            Add
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddRestaurant
