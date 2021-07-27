import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { ReviewContext } from '../context/reviews';
import { Form, useForm } from '../hooks/useForm';
import { Link } from 'react-router-dom';

const Review = (props) => {
    let { id } = props.match.params;
    let [header,setHeader] = useState(null);
    let [reviewList, setReviewList]=useState(null);    
    const { reviewState, setFetchReviews } = useContext(ReviewContext);
    let { loading, error, reviews } = reviewState;

    useEffect(()=>{
        setFetchReviews({
            url:`http://localhost:5000/api/v1/reviews/${id}/list`,
            method:'GET',
            body:null
        })
    },[]);

    useEffect(()=>{
        setHeader(reviews.header);
        setReviewList(reviews.reviews);
    },[reviews])

    // state for useForm hook
    const initialState={
        username:'',
        rating:'',
        review:''
    };
    // callback for useForm hook
    const callback = () => {
        setFetchReviews({
            url:'http://localhost:5000/api/v1/reviews/new',
            method:'POST',
            body:{...values,restaurant:reviews[0].restaurant,restaurant_id:id}
        })
    }
    let {
        values,
        onChange,
        onSubmit
    } = useForm(initialState,callback);

    if(loading){
        return(
            <Header text='Loading...' />
        )
    }
    if(error){
        return(
            <Header text={error} />
        )
    }
    if(reviews && header){
        return(
            <>
                <div className="container mt-3">
                    <Header text={header.restaurant} />
                    <div className="text-center">
                        Rating:{header.rating_average}({header.rating_count})
                    </div>
                    <div className="row mt-3">
                        <p>
                            <button className="btn btn-primary mx-2">
                                <Link to="/" className="text-light text-decoration-none">Home</Link>
                            </button>
                            <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                Leave A Review
                            </button>
                        </p>

                         <div className="collapse" id="collapseExample">
                             <div className="card card-body">
                                 <Form onSubmit={onSubmit}>
                                     <div className="row">
                                         <h5>Add a review</h5>
                                         <div className="col-12 my-2">
                                             <input 
                                                 type="text" 
                                                 name="username"
                                                 className="form-control"
                                                 value={values.username}
                                                 placeholder='Username'
                                                 onChange={onChange}
                                             />
                                         </div>
                                         <div className="col-12 my-2">
                                             <select 
                                                 name="rating" 
                                                 className='form-select'
                                                 value={values.rating}
                                                 onChange={onChange}
                                             >
                                                {
                                                    [...Array(6)].map((item,index)=> (
                                                        (index === 0) ? (
                                                            <option key={index} value="" disabled>Rating</option>
                                                        ) : (
                                                            <option key={index} value={index}>{ [...Array(index)].map((x)=>'⭐️').join('') }</option>
                                                        )
                                                    ))
                                                }
                                            </select>
                                        </div>    
                                        <div className="col-12 my-2">
                                            <div className="form-floating">
                                                <textarea 
                                                    className="form-control" 
                                                    placeholder="Leave a review here" 
                                                    id="floatingTextarea"
                                                    name="review"
                                                    value={values.review}
                                                    onChange={onChange}
                                                ></textarea>
                                                <label htmlFor="floatingTextarea">Review</label>
                                            </div>
                                        </div>                            
                                        <div className="col-12 my-2">
                                            <button 
                                                className="btn btn-primary" 
                                                type="submit" 
                                                data-bs-toggle="collapse" 
                                                data-bs-target="#collapseExample" 
                                                aria-expanded="false" 
                                                aria-controls="collapseExample"
                                                style={{width:'100%'}}
                                                disabled={!Object.values(values).every(x=> x !== '' && x.trim() !== '')}
                                            >
                                                Add
                                            </button>                                   
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>     
                    <div className="row mt-3">
                        {
                            reviewList.length ? (                                
                                reviewList.map((item)=>(
                                    <div className="card cols" style={{margin:'7px 7px'}} key={item.review_id}>
                                        <div className="card-body">
                                            <h5 className="card-title">{item.username}</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">{item.rating}</h6>
                                            <p className="card-text">{item.review.substring(0,20)} ...Read More</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="fs-6 fst-italic">There are no reviews yet. Be the first to leave a review</div>
                            )
                        }



                    </div>





        
                </div>

            </>
        )
    }
                 
    //                 <div className="row my-3">
    //                     {
    //                         reviews.map((item)=>(
    //                             <div className="card cols" style={{margin:'7px 7px'}} key={item.review_id}>
    //                                 <div className="card-body">
    //                                     <h5 className="card-title">{item.username}</h5>
    //                                     <h6 className="card-subtitle mb-2 text-muted">{item.rating}</h6>
    //                                     <p className="card-text">{item.review.substring(0,20)} ...Read More</p>
    //                                 </div>
    //                             </div>
    //                         ))
    //                     }
    //                 </div>
    //             </div>
    //         </>
    //     )
    // }
    return(
        <div>
            no entries
        </div>
    )
    

}

export default Review
