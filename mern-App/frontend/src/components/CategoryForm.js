import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useCategoriesContext } from "../components/hooks/useCategoriesContext";


const CategoryForm = () => {
    const { dispatch } = useCategoriesContext()

    const [name, setName] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const item = { name }

        const response = await fetch('/category', {
            method: 'POST',
            body: JSON.stringify( item ),
            headers: { 'Content-Type': 'application/json' }
        })

        const json = await response.json()

        if( !response.ok ){
            setError( json.error )
        }
        if( response.ok ){
            setName('')
            setError( null )
            dispatch({ type: 'CREATE_CATEGORY', payload: json })
            navigate("/")
        }
    }

    return ( 
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Furniture Category</h3>

            <label>Category Name: </label>
            <input 
            type="text"
            onChange={ (e) => setName(e.target.value) }
            value={name}
             />
             
             <button type="submit">Add Category</button>
             { error && <div className="error">{error}</div> }
        </form>
     );
}
 
export default CategoryForm;