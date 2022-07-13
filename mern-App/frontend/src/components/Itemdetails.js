import React, { useEffect, useState } from 'react';
import './Itemdetails.css';

const Itemdetails = ({ item }) => {
    const [image, setImage] = useState(null)

    /****** GET IMAGE FROM DB ***** */
    const getImage = async (imageId) => {   
    const res = await fetch('http://localhost:3000'+imageId)
    const imageBlob = await res.blob()    
        // Then create a local URL for that image and print it 
    const imageObjectURL = URL.createObjectURL(imageBlob);
        setImage(imageObjectURL);   
    }
    /****** RUN THE IMAGE METHOD ***** */
    useEffect( () => {
        getImage( item.ImagePathe ) 
    }, [])

    return ( 
        <div className="title">
            <a target="_blank" style={{ textDecoration: "none" }} href={image}>
                <img src={image} alt="ok" />   
                <div>{ item.name }</div> 
            </a>
                          
               
        </div>
     );
}
 
export default Itemdetails;