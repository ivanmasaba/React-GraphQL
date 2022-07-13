import React, { useState, useEffect } from 'react';
import './Items.css'
// context components
import {useFurnitureContext} from '../components/hooks/useFurnitureContext';

// components
import Itemdetails from '../components/Itemdetails';

const Items = () => {
    // const [items,setItems] = useState(null) 
    const { items, dispatch } = useFurnitureContext()  

    useEffect( () =>{
        const furn = async () => {
            const response = await fetch('/furniture')

            const json = await response.json()

            if( response.ok ){ // if no error in api
                dispatch({ type: 'SET_FURNITURE', payload: json })
                // setItems(json)
            }
        }

        furn()
    },[] )
        
    return ( 
        <div >
        <h3>Furniture Items</h3>
        <br />
        <div className="items">
            {items && items.map( (item) => (
                <Itemdetails key={item._id} item = { item } />
            ) )}
        </div>
    </div>
     );   
}
 
export default Items;