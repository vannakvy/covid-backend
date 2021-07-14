import { setQuarantine, setSubQuarantine } from '../function/set'

export function hospitalReducer(state, action) {

    let item = [...state]
    let index1 = item.findIndex(e => e.id === action.payload.id)
    let index = item.findIndex(e => e.id === action.payload)
    switch (action.type) {
        case 'ADD_HOSPITAL':
            item.push(setQuarantine(action.payload, item.length))
            return item;
        case 'EDIT_HOSPITAL':
            item[index1] = action.payload
            return item;
        case 'DELETE_HOSPITAL':
            item.splice(index, 1)
            return item;
        case 'ADD_SUB_HOSPITAL':
            item.push(setSubQuarantine(action.payload, item.length))
            return item;
        case 'EDIT_SUB_HOSPITAL':
            item[index1] = action.payload
            return item;
        case 'DELETE_SUB_HOSPITAL':
            item.splice(index, 1)
            return item;

        default:
            throw new Error();
    }
}