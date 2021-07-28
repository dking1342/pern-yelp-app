import React, { useContext } from 'react';
import { Form, useForm } from '../hooks/useForm';
import Header from '../components/Header';
import { AppContext } from '../context/store';
import { useHistory } from 'react-router-dom';


const RestaurantDetails = (props) => {
    let { setFetchData } = useContext(AppContext);
    let id = props.match.params.id;
    let history = useHistory();

    const initialState = {
        name:'',
        location:'',
        price_range:''
    }

    const callback = () => {
        setFetchData({
            url:`http://localhost:5000/api/v1/restaurants/${id}`,
            method:'PUT',
            body:values
        });
        history.push('/')
    }

    let { 
        values,
        regex,
        onChange,
        onSubmit
    } = useForm(initialState,callback)

    return (
        <div className="container-sm">
            <Header text='Update Entry' />
            <Form className="d-flex" onSubmit={onSubmit}>
                <div className="row">
                    <div className="col-12 my-2">
                        <input 
                            type="text" 
                            name="name"
                            className="form-control" 
                            placeholder="Name"
                            value={values.name} 
                            onChange={onChange} 
                        />
                    </div>
                    <div className="col-12 my-2">
                        <input 
                            type="text" 
                            name="location"
                            className="form-control"
                            value={values.location}
                            placeholder='Location'
                            onChange={onChange}
                        />
                    </div>
                    <div className="col-12 my-2">
                        <select 
                            name="price_range" 
                            className='form-select'
                            value={values.price_range}
                            onChange={onChange}
                        >
                            {
                                [...Array(6)].map((item,index)=> (
                                    (index === 0) ? (
                                        <option key={index} value="" disabled>Price Range</option>
                                    ) : (
                                        <option key={index} value={index}>{ [...Array(index)].map((x,i)=>'$').join('') }</option>
                                    )
                                ))
                            }
                        </select>
                    </div>
                    <div className="col-12 my-2">
                        <button 
                            className="btn btn-primary" 
                            disabled={regex.test(Object.values(values)) === true || Object.values(values).includes('') === true ? true : false}
                            type='submit'
                            style={{width:'100%'}}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </Form>            
        </div>
    )
}

export default RestaurantDetails;
