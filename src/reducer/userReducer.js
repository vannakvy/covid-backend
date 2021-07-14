import { setUser } from '../function/set'

export function userReducer(state, action) {
    
    let item = [...state]
    let index = item.findIndex(e => e.id === action.payload)
    let index1 = item.findIndex(e => e.id === action.payload.id)

    switch (action.type) {
        case 'ADD_USER':
            item.push(setUser(action.payload, item.length))
            return item;
        case 'EDIT_USER':
            item[index1] = action.payload
            return item;
        case 'DELETE_USER':
            item.splice(index, 1)

            return item;
        case 'DELETE_SUB_CASE':
            item.push(setUser(action.payload, item.length))
            return item;
        default:
            throw new Error();
    }
}