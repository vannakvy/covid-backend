import { setPeople } from '../function/set'

export function peopleReducer(state, action) {
    
    let item = [...state]
    let index = item.findIndex(e => e.id === action.payload)
    let index1 = item.findIndex(e => e.id === action.payload.id)

    switch (action.type) {
        case 'ADD_PEOPLE':
            item.push(setPeople(action.payload, item.length))
            return item;
        case 'EDIT_PEOPLE':
            item[index1] = action.payload

            return item;
        case 'DELETE_PEOPLE':
            item.splice(index, 1)

            return item;
        default:
            throw new Error();
    }
}