import React from "react";
import {createRoot} from 'react-dom/client';
require('file-loader?name[name].[ext]!../public/index.html');


import App from "./App";

import { ApolloProvider, ApolloClient, InMemoryCache, } from '@apollo/client';
import GetCategories from "./Components/GetCategories";
import GetFurnitureItems from "./Components/GetFurnitureItems";
import GetSingleCategory from "./Components/GetSingleCategory";

const client = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache(),
})


// 👇️ IMPORTANT: use correct ID of your root element
// this is the ID of the div in your index.html file
const rootElement = document.getElementById('root'); 
const root = createRoot(rootElement);

root.render(
    <ApolloProvider client={client} >
        {/* <GetFurnitureItems /> */}
        {/* <GetCategories /> */}
        <GetSingleCategory />
            {/* <App /> */}
    </ApolloProvider>
    
       
  
);  