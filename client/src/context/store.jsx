import React, { createContext, useEffect, useReducer, useState } from 'react'
import { callback, useFetch } from '../hooks/useFetch';
import { AppReducer } from './reducers/AppReducer';

const initialState = {
    data:[],
    loading:false,
    error:null
};

export const AppContext = createContext(initialState);

export const AppProvider = ({children}) => {
    const [state,dispatch] = useReducer(AppReducer,initialState);
    const [ fetchData, setFetchData ] = useState({
        url:'http://localhost:5000/api/v1/restaurants',
        method:'GET',
        body:null            
    });
    const { url, method, body } = fetchData;
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
        loadData();
    },[fetchData]);

    // data
    useEffect(()=>{
        if(method === 'GET'){
            dispatch({
                type:'GET',
                payload:data
            })
        } else if (method === 'DELETE') {
            dispatch({
                type:'DELETE',
                payload:data
            })
        } else {
            dispatch({
                type:'ADD',
                payload:data
            })
        }

    },[data,method])

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




    return(
        <AppContext.Provider
            value={{
                state,
                setFetchData,
            }}
        >
            {children}
        </AppContext.Provider>
    )

}