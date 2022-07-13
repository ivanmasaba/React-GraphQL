import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategoriesContext } from "../components/hooks/useCategoriesContext";

const FurnitureForm = () => {
    const { categories } = useCategoriesContext()  

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [category,setCategory] = useState('')
    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(selectedFile)

        const formData = new FormData();
        formData.append('name', name);
        formData.append('category', category);
        formData.append('description', description);
		formData.append('file', selectedFile);

        
        const response = await fetch('http://localhost:3000/furniture', {
            method: 'POST',
            body: formData,
        })

        const json = await response.json()

        if( !response.ok ){
            setError( json.error )
            setEmptyFields( json.emptyFields )
        }
        if( response.ok ){
            setName('')
            setDescription('')
            setCategory('')
            setSelectedFile()
            setError( null )
            setEmptyFields([])
            console.log('new item added...', json)
            navigate('/items')
        }
    }

    return ( 
        <form className="create" onSubmit={handleSubmit}>
            
            <h3>Add a new Furniture Item</h3>

            <label>Item Name: </label>
            <input 
            type="text"
            onChange={ (e) => setName(e.target.value) }
            value={name}
            className={emptyFields.includes('name') ? 'error' : '' }
             />

                <div>
                    <label >Category:</label>
                    <select
                     value={category}
                     onChange={ (e) => setCategory(e.target.value)}
                     className={emptyFields.includes('Category') ? 'error' : '' }
                      > <option value=''></option>
                    {categories && categories.map( (categori) => (               
                        <option
                         key={categori._id} 
                         value={categori._id}
                         >{categori.name}</option> 
                    ) )}
                </select>  
                </div>

                <label>Description:</label>
                <textarea
                 cols="30"
                 rows="10" 
                 onChange={ (e) => setDescription(e.target.value)}
                 className={emptyFields.includes('description') ? 'error' : '' }
                 ></textarea>

            <div >
            <label>Image:</label>
               <input
               type="file"
               name='file'
               onChange={(e) => {setSelectedFile(e.target.files[0]); setIsFilePicked(true);}}
               className={emptyFields.includes('file') ? 'error' : '' }
               />
                </div>

             <button type="submit">Add Item</button>
             { error && <div className="error">{error}</div> }
        </form>
     );
}
 
export default FurnitureForm;