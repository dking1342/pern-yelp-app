
export const ReviewReducer = (state,action) => {
    switch (action.type) {
        case 'GET':
            return{
                ...state,
                reviews:action.payload
            }
        case 'POST':
            return{
                ...state,
                reviews:[...state.reviews,action.payload]
            }
    
        default:
            return state;
    }
}