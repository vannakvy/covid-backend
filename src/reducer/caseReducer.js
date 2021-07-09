import { setCase } from '../function/set'

export function caseReducer(state, action) {
    
    let item = [...state]

    switch (action.type) {
        case 'ADD_CASE':
            item.push(setCase(action.payload, item.length))
            return item;
        case 'EDIT_CASE':
            let index1 = item.findIndex(e => e.id === action.payload.id)
            item[index1] = action.payload

            return item;
        case 'DELETE_CASE':
            let index = item.findIndex(e => e.id === action.payload)
            item.splice(index, 1)

            return item;
        case 'DELETE_SUB_CASE':
            item.push(setCase(action.payload, item.length))
            return item;

        default:
            throw new Error();
    }
}