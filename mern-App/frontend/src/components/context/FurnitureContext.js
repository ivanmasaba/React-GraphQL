import React, { useReducer, createContext } from 'react';

export const FurnitureContext = createContext()

export const FurnitureReducer = (state, action) => {
    switch(action.type){
        case 'SET_FURNITURE':
            return{
                items: action.payload
            }
        case 'SET_FURNITURE_SINGLE':
            return{
                items: action.payload
            }
        case 'CREATE_FURNITURE':
            return{
                items: [action.payload, ...state.items]
            }
        case 'DELETE_ITEM':
            return{
                items: state.items.filter((i) => i._id !== action.payload._id )
            }
        default:
            return state
    }
}

export const FurnitureContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(FurnitureReducer, { item: null})
    return ( 
        <FurnitureContext.Provider value={{ ...state, dispatch }}>
            { children }
        </FurnitureContext.Provider>
     );
}
