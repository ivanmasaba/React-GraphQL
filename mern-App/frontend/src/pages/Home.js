import React, { useEffect, useState } from "react";
import { useCategoriesContext } from "../components/hooks/useCategoriesContext";

// components
import Categorydetails from '../components/Categorydetails'


const Home = () => {
    const { categories, dispatch } = useCategoriesContext()  
    // const [furnitures,setFurnitures] = useState(null)
    useEffect( () =>{
        const furniture = async () => {
            const response = await fetch('/category/')
            // const response = await fetch('/furniture/')

            const json = await response.json()

            if( response.ok ){ // if no error in api
                dispatch({ type: 'SET_CATEGORY', payload: json })
                // setFurnitures(json)
            }
        }

        furniture()
    },[] )
    
    return ( 
        <div >
            <h3>Furniture Categories</h3>
            <br />
            <div>
                {categories && categories.map( (category) => (
                    <Categorydetails key={category._id} item = { category } />
                ) )}
            </div>
        </div>
     );
}
 
export default Home; 