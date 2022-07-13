import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';

const ItemProfile = () => {
        // 👇️ get ID from url
        const {id} = useParams();        
        const [image, setImage] = useState(null);
        const [furnitures,setFurnitures] = useState('');

    useEffect( () =>{
        const furniture = async () => {
            const response = await fetch('/furniture/one/' + id)

            const json = await response.json()

            if( response.ok ){ // if no error in api
                setFurnitures(json)
                console.log(json)
            }
        }

        furniture()
    },[] )


    /****** GET IMAGE FROM DB ***** */
    // const getImage = async (imageId) => {   
    // const res = await fetch('http://localhost:3000'+imageId)
    // const imageBlob = await res.blob()    
    //     // Then create a local URL for that image and print it 
    // const imageObjectURL = URL.createObjectURL(imageBlob);
    //     setImage(imageObjectURL);   
    // }
    // /****** RUN THE IMAGE METHOD ***** */
    // useEffect( () => {
    //     getImage( furnitures.ImagePathe ) 
    // }, [])
      
      
      

    return ( 
        <div>
             <h3>Item Details {id}</h3>
        <br />
            {/* <div className="items">
                <div >
                            <img src={image} />    
                            <div>
                                <h4>{ furnitures.name }</h4> 
                                <div className='describe'>
                                    <p><strong>Category: </strong> { furnitures.ImagePathe }</p> 
                                    <p><strong>Description: </strong> { furnitures.description }</p> 
                                    </div>
                            </div>
                    </div>
            </div> */}
        </div>
     );
}
 
export default ItemProfile; 