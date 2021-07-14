import { setCase, setSubCase } from '../function/set'

export function caseReducer(state, action) {

    let item = [...state]
    let index = item.findIndex(e => e.id === action.payload)
    let index1 = item.findIndex(e => e.id === action.payload.id)

    switch (action.type) {
        case 'ADD_CASE':
            item.push(setCase(action.payload, item.length))
            return item;
        case 'EDIT_CASE':
            item[index1] = action.payload

            return item;
        case 'DELETE_CASE':
            item.splice(index, 1)

            return item;
        case 'ADD_SUB_CASE':
            item.push(setSubCase(action.payload, item.length))

            return item;
        case 'EDIT_SUB_CASE':
            item[index1] = action.payload

            return item;
        case 'DELETE_SUB_CASE':
            item.splice(index, 1)
            return item;

        default:
            throw new Error();
    }
}