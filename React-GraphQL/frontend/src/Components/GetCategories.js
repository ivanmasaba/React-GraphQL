import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { GET_CATEGORIES } from '../GraphQL/Queries';
import { useEffect } from 'react';
import DisplayCategory from './DisplayCategory';

const GetCategories = () => {
    const { error, loading, data } = useQuery(GET_CATEGORIES);
    const [ categories, setcategories ] = useState([]);

    useEffect(() =>{
        if(data){ // if data is returned from server
            setcategories(data.categories);
            console.log(data);
        }        
    }, [data]);

    if(loading) return <div> loading.... </div>

    if(error) return <div>{ error.message }</div>

    return ( 
        <>
            <DisplayCategory category={ categories } />
        </>
     );
}
 
export default GetCategories;