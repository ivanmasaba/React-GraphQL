import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import {GET_SINGLE_CATEGORY } from '../GraphQL/Queries';
import DisplayCategory from './DisplayCategory';

const GetSingleCategory = () => {
    const { error, loading, data } = useQuery(GET_SINGLE_CATEGORY);
    const [ category, setcategory ] = useState([]);
    const [ items, setItems ] = useState([]);

    useEffect(() =>{
        if(data){ // if data is returned from server
            setcategory( data.category );
            setItems( data.category.furnitureItems );
            console.log(data); 
        }        
    }, [data]);

    if(loading) return <div> loading.... </div>

    if(error) return <div>{ error.message }</div>

    return ( 
        <>
                       
                <div key={category.id}>
                    <strong>{ category.name }</strong>
                    { items.map( item =>{
                        return(
                                <p key={item.id}>
                                { item.name }
                                </p>
                            )
                        
                    })   }
                </div>

        </>
     );
}
 
export default GetSingleCategory;