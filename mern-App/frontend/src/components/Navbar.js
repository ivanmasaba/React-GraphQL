import React from "react";
import { Link } from 'react-router-dom'
const Navbar = () => {
    return ( 
        <header>
             <div className="container">
                <Link to="/">
                    <h1> Durawood Furniture </h1>
                </Link>

                <Link to="/items">
                    <h4> View Items </h4>
                </Link>

                {/* <Link to="/furniture">
                    <h4> Create Item </h4>
                </Link> */}

                <Link to="/category">
                    <h4> Create Category </h4>
                </Link>

                <Link to="/furniture">
                    <h4> Create Item </h4>
                </Link>
            </div>
        </header>
     );
}
 
export default Navbar;