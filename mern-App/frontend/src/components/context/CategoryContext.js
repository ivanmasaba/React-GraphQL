import React, { createContext, useReducer } from 'react';

export const CategoryContext = createContext()

export const categoryReducer = (state, action) => {
    switch(action.type){
        case 'SET_CATEGORY':
            return{
                categories: action.payload
            } 
        case 'CREATE_CATEGORY':
            return {
                categories: [action.payload, ...state.categories]
            }
        default:
            return state
    }
}

export const CategoryContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(categoryReducer, { category: null })



    return(
       <CategoryContext.Provider value={{ ...state, dispatch }}>
            { children }
       </CategoryContext.Provider>
    )
}