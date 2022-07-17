import React, { useState} from 'react';

import { useMutation, gql } from '@apollo/client';

const UPLOAD_FILE = gql`
    mutation uploadFile($file: Upload!){
        uploadFile(file: $file){
            url
        }
       
    }
`

const FurnitureForm = () => { 

    const [uploadFile] = useMutation(UPLOAD_FILE, {
        onCompleted: data => console.log(data)
    })

    
    const [selectedFile, setSelectedFile] = useState();

    const h = (e) => {
        let f = e.target.files[0]
        console.log( f )
        if(!f){
            return
        }else{
            uploadFile({ variables: { f } })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log( selectedFile )

        if(!selectedFile){
            return
        }

        uploadFile({ variables: { selectedFile }})
     
    }

    return ( 
       
                <form onSubmit={handleSubmit}>
                
                <h3>Add a new Furniture Item</h3>

                <div >
                <label>Image:</label>
                <input
                type="file"
                name='file'
                onChange={h}
                // onChange={(e) => {setSelectedFile(e.target.files[0]); }}
                />
                    </div>

                <button type="submit">Add Item</button>
            </form>
        
       
     );
}
 
export default FurnitureForm;