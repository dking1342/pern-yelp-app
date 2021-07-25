import React from 'react';

export const TableButton = ({type, btnType, id}) => {
    const handleClick = () => {
        console.log('edit clicked')
    }

    return(
        <button className={`btn btn-${btnType}`} onClick={handleClick}>
            { type }
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
