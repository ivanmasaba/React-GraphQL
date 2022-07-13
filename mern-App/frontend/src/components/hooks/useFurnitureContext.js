import React, { useContext } from 'react';
import { FurnitureContext } from '../context/FurnitureContext';

export const useFurnitureContext = () => {
    const context = useContext(FurnitureContext)

    if(!context){
        throw Error('useFurnitureContext must be used in FurnitureContextProvider...')
    }

    return context
}