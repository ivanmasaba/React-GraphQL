import React from "react";
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
require('file-loader?name[name].[ext]!../public/index.html');
import './css/index.css';


import App from "./App";

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client'

const client = new ApolloClient({
    link: createUploadLink({
        uri: 'http://localhost:4000'
    }),
    cache: new InMemoryCache(),
})


// 👇️ IMPORTANT: use correct ID of your root element
// this is the ID of the div in your index.html file
const rootElement = document.getElementById('root'); 
const root = createRoot(rootElement);

root.render(
    <ApolloProvider client={client} >
            <App />
    </ApolloProvider>
    
       
  
);  