import React from 'react';
import { Link } from 'react-router-dom';

const Categorydetails = ({ item }) => {
    return ( 
        <div className="workout-details">
             <Link style={{ textDecoration: "none" }} to={`/categoryItems/${item._id}`}>
                <h4>{ item.name }</h4>
             </Link>
        </div>
     );
}
 
export default Categorydetails;