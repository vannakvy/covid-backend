export const headerReducer = (state, action) => {
    switch(action.type){
        case 'SET_DATA_BACK':
            return action.payload
        default:
            return state
    }
}