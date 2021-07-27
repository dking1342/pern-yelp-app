import React, { createContext, useEffect, useReducer, useState } from 'react'
import { callback, useFetch } from '../hooks/useFetch';
import { ReviewReducer } from './reducers/ReviewReducer';

const initialState = {
    reviews:[],
    loading:false,
    error:null
};

export const ReviewContext = createContext(initialState);

export const ReviewProvider = ({children}) => {
    const [reviewState,dispatch]= useReducer(ReviewReducer,initialState);
    const [fetchReview,setFetchReviews]=useState({
        url:'http://localhost:5000/api/v1/reviews/',
        method:'GET',
        body:null
    });
    const { url, method, body } = fetchReview;
    let {
        loading,
        error,
        data,
        loadData
    } = useFetch({
        fetchFn:()=>callback(url,method,body)
    })

    // actions
    useEffect(()=>{
        loadData()
    },[fetchReview]);

    // data
    useEffect(()=>{
        switch (method) {
            case 'GET':
                return dispatch({
                    type:'GET',
                    payload:data
                })
            case 'POST':
                return dispatch({
                    type:'POST',
                    payload:data
                })
        
            default:
                return;
        }
    },[data])

    // loading
    useEffect(()=>{
        dispatch({
            type:'LOADING',
            payload:loading
        })
    },[loading])

    // error
    useEffect(()=>{
        dispatch({
            type:'ERROR',
            payload:error
        })
    },[error])

    // get header data
    const getHeaderData = (id) => {
        setFetchReviews({
            url:`http://localhost:5000/api/v1/reviews/${id}/list`,
            method:'GET',
            body:null
        })
    }

    return(
        <ReviewContext.Provider
            value={{
                reviewState,
                setFetchReviews,
                getHeaderData
            }}
        >
            {children}
        </ReviewContext.Provider>
    )

}