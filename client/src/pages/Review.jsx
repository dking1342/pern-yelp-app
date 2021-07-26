import React from 'react'
import Header from '../components/Header'

const Review = (props) => {
    let { id } = props.match.params;


    return (
        <>
            <Header text={id} />
                <div className="container mt-5">
                    the review page for {id}

                </div>
        </>
    )
}

export default Review
