import { gql } from "@apollo/client";

/******** GET ALL CATEGORIES *********** */
export const GET_CATEGORIES = gql`
   
   {
    categories{
        id
        name
        furnitureItems{
            id
            name
            description
        }
    }
 }
    
`;

/******** GET ALL CATEGORIES *********** */
export const GET_SINGLE_CATEGORY = gql`
   
   {
    category(id: "62c084ddbfbcf1e1eac40f7a"){
        id
        name
        furnitureItems{
            id
            name
            description
        }
    }
 }
    
`;


/******** GET ALL FURNITURE ITEMS *********** */
export const GET_FURNITURE_ITEMS = gql`
   
   {
    furnitureItems{
        id
        name
        description
        category{
            name
            }
    }
    }
    
`;