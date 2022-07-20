import React from 'react';

const DisplayCategory = ({ category }) => {
    

    return ( 
        <>

         { category.map( category => {
            return(
                <div key={category.id}>
                    <strong>{ category.name }</strong>
                    { (category.furnitureItems).map( item => { 
                        return(
                                <p key={item.id}>
                                    {item.name}
                                </p>
                             )
                          }) }
                </div>
            ) 
        }) }
        
        </>
     );
}
 
export default DisplayCategory;