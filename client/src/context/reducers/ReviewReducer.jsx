
export const ReviewReducer = (state,action) => {
    switch (action.type) {
        case 'GET':
            return{
                ...state,
                reviews:action.payload
            }
        case 'POST':
            console.log('post',state,state.reviews.header);
            return{
                ...state,
                reviews:{
                    header:action.payload.header,
                    reviews:[...state.reviews.reviews,action.payload.reviews]
                }
            }
    
        default:
            return state;
    }
}