import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import Itemdetails from './Itemdetails';

const CategoryItems = () => {
        // 👇️ get ID from url
        const {id} = useParams();
        const [furnitures,setFurnitures] = useState(null)

    useEffect( () =>{
        const furniture = async () => {
            const response = await fetch('/furniture/' + id)

            const json = await response.json()

            if( response.ok ){ // if no error in api
                setFurnitures(json)
            }
        }

        furniture()
    },[] )
      
      
      

    return ( 
        <div>
             <h3>Items</h3>
        <br />
        <div className="items">
            {furnitures && furnitures.map( (item) => (
                <Itemdetails key={item._id} item = { item } />
            ) )}
        </div>
        </div>
     );
}
 
export default CategoryItems; 