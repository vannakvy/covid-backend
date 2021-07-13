import { setQuarantine, setSubQuarantine } from '../function/set'

export function quarantineReducer(state, action) {

    let item = [...state]
    let index1 = item.findIndex(e => e.id === action.payload.id)
    switch (action.type) {
        case 'ADD_QUARANTINE':
            item.push(setQuarantine(action.payload, item.length))
            return item;
        case 'EDIT_QUARANTINE':
            item[index1] = action.payload
            return item;
        case 'DELETE_QUARANTINE':
            let index = item.findIndex(e => e.id === action.payload)
            item.splice(index, 1)
            return item;
        case 'ADD_SUB_QUARANTINE':
            item.push(setSubQuarantine(action.payload, item.length))
            return item;
        case 'EDIT_SUB_QUARANTINE':
            item[index1] = action.payload
            return item;
        case 'DELETE_SUB_QUARANTINE':
            item.push(setQuarantine(action.payload, item.length))
            return item;

        default:
            throw new Error();
    }
}