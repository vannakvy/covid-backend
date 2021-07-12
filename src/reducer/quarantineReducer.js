import { setQuarantine } from '../function/set'

export function quarantineReducer(state, action) {
    
    let item = [...state]

    switch (action.type) {
        case 'ADD_QUARANTINE':
            item.push(setQuarantine(action.payload, item.length))
            return item;
        case 'EDIT_QUARANTINE':
            let index1 = item.findIndex(e => e.id === action.payload.id)
            item[index1] = action.payload

            return item;
        case 'DELETE_QUARANTINE':
            let index = item.findIndex(e => e.id === action.payload)
            item.splice(index, 1)

            return item;
        case 'DELETE_SUB_QUARANTINE':
            item.push(setQuarantine(action.payload, item.length))
            return item;

        default:
            throw new Error();
    }
}