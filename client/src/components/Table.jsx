import React, { useContext } from 'react';
import { AppContext } from '../context/store';
import { Form, useForm } from '../hooks/useForm';

export const EditButton = ({id}) => {
    const { setFetchData } = useContext(AppContext);
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
        })
    }

    let { 
        values,
        regex,
        onChange,
        onSubmit
    } = useForm(initialState,callback)

    return(
        <>
            <button type="button" className="btn btn-warning" data-toggle="modal" data-target="#myModal">
                Edit
            </button>
            
            <div className="modal " id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title text-dark">Update Restaurant</h4>
                            <button type="button" className="close btn" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <Form className="d-flex">
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
                                            data-dismiss="modal" 
                                            disabled={regex.test(Object.values(values)) === true || Object.values(values).includes('') === true ? true : false}
                                            type='submit'
                                            style={{width:'100%'}}
                                            onClick={onSubmit}
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>            
                    </div>
                </div>
            </div>

        </>
    )
}

export const DeleteButton = ({id, setFetchData,getAll}) => {
    const handleClick = () => {
        setFetchData({
            url:`http://localhost:5000/api/v1/restaurants/${id}`,
            method:'DELETE',
            body:{}
        });
    }

    return(
        <button className="btn btn-danger" onClick={handleClick}>
            Delete
        </button>
    )
}

export const Table = ({children}) => {
    return (
        <table className="table table-hover table-dark">
            {children}
        </table>
    )
}
