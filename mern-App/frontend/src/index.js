import React from "react";
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
require('file-loader?name[name].[ext]!../public/index.html');
import './css/index.css';


import App from "./App";
import { CategoryContextProvider } from "./components/context/CategoryContext";
import {FurnitureContextProvider} from "./components/context/FurnitureContext";



// 👇️ IMPORTANT: use correct ID of your root element
// this is the ID of the div in your index.html file
const rootElement = document.getElementById('root'); 
const root = createRoot(rootElement);

root.render(
    <FurnitureContextProvider>
    <CategoryContextProvider>
         <App />
    </CategoryContextProvider>
    </FurnitureContextProvider>
       
  
);  