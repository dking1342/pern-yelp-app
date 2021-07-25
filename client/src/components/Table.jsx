import React from 'react';

export const EditButton = ({id}) => {
    const handleClick = () => {
        console.log(id)
    }

    return(
        <button className="btn btn-warning" onClick={handleClick}>
            Edit
        </button>
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

const Table = ({children}) => {
    return (
        <table className="table table-hover table-dark">
            {children}
        </table>
    )
}

export default Table
