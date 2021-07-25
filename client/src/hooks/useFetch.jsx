import { useCallback, useEffect, useState } from "react";


export const callback = (url,method='GET',body=null) => {
    if(method === 'GET'){
        return fetch(url);
    } else {
        return fetch(url,{
            method,
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(body)
        });
    }
}

export const useFetch = ({
    loadOnMount =false,
    resetData = false,
    fetchFn = null
} = {}) => {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ data, setData ] = useState(null);

    const loadData = useCallback( async (e)=>{
        setLoading(true);
        setError();
        if(resetData === true) setData();

        try {
            const response = await fetchFn(e);
            let result = await response.json();
            setData(result.payload);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    },[resetData,fetchFn]);

    useEffect(()=>{
        if(loadOnMount && fetchFn !== null) return loadData();
    },[fetchFn,loadData,loadOnMount])

    return {
        data,
        loading,
        error,
        loadData
    }
};