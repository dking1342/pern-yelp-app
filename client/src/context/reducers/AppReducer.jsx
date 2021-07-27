
export const AppReducer = (state,action) => {
    switch (action.type) {
        case 'GET':
            return{
                ...state,
                data:action.payload
            }
        case 'DELETE':
            return{
                ...state,
                data:state.data.filter(x=> x.id !== action.payload.id)
            }
        case 'PUT':
            const updateData = state.data.map(item=>{
                if(item.id === action.payload.id){
                    return action.payload;
                } else {
                    return item;
                }
            })
            return{
                ...state,
                data:updateData
            }
        case 'POST':
            return{
                ...state,
                data:[...state.data, action.payload]
            }
        case 'LOADING':
            return{
                ...state,
                loading:action.payload
            }
        case 'ERROR':
            return{
                ...state,
                error:action.payload
            }
    
        default:
            return state;
    }
}