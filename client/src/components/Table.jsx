import React from 'react';



export const DeleteButton = ({id, setFetchData}) => {
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
