import React, { useContext } from 'react';
import { CategoryContext } from '../context/CategoryContext';

export const useCategoriesContext = () => {
    const context = useContext(CategoryContext)

    if(!context){
        throw Error('useCategoriesContext must be used in CategoryContextProvider...')
    }

    return context
}