import React from 'react'

const RatingStar = ({rating}) => {
    let roundedRating = Math.round(rating * (1 / 0.5)) / (1 / 0.5);

    switch (roundedRating) {
        case 0:
            return(
                <span></span>
            )
        case 0.5:
            return(
                <>
                   <i className="fas fa-star-half text-warning"></i>
                </>
            )
        case 1:
            return(
                <>
                   <i className="fas fa-star text-warning"></i>
                </>
            )
        case 1.5:
            return(
                <>
                   <i className="fas fa-star text-warning"></i>
                   <i className="fas fa-star-half text-warning"></i>
                </>
            )
        case 2:
            return(
                <>
                   <i className="fas fa-star text-warning"></i>
                   <i className="fas fa-star text-warning"></i>
                </>
            )
        case 2.5:
            return(
                <>
                   <i className="fas fa-star text-warning"></i>
                   <i className="fas fa-star text-warning"></i>
                   <i className="fas fa-star-half text-warning"></i>
                </>
            )
        case 3:
            return(
                <>
                   <i className="fas fa-star text-warning"></i>
                   <i className="fas fa-star text-warning"></i>
                   <i className="fas fa-star text-warning"></i>
                </>
            )
        case 3.5:
            return(
                <>
                   <i className="fas fa-star text-warning"></i>
                   <i className="fas fa-star text-warning"></i>
                   <i className="fas fa-star text-warning"></i>
                   <i className="fas fa-star-half text-warning"></i>
                </>
            )
        case 4:
            return(
                <>
                   <i className="fas fa-star text-warning"></i>
                   <i className="fas fa-star text-warning"></i>
                   <i className="fas fa-star text-warning"></i>
                   <i className="fas fa-star text-warning"></i>
                </>
            )
        case 4.5:
            return(
                <>
                   <i className="fas fa-star text-warning"></i>
                   <i className="fas fa-star text-warning"></i>
                   <i className="fas fa-star text-warning"></i>
                   <i className="fas fa-star text-warning"></i>
                   <i className="fas fa-star-half text-warning"></i>
                </>
            )
        case 5:
            return(
                <>
                   <i className="fas fa-star text-warning"></i>
                   <i className="fas fa-star text-warning"></i>
                   <i className="fas fa-star text-warning"></i>
                   <i className="fas fa-star text-warning"></i>
                   <i className="fas fa-star text-warning"></i>
                </>
            )









        default:
            return(<></>);
    }
}

export default RatingStar
