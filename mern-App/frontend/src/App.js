import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/*** Pages AND Components **** */
import Home from './pages/Home';
import Items from './pages/Items';
import Navbar from './components/Navbar';
import CategoryForm from "./components/CategoryForm";
import FurnitureForm from "./components/furnitureForm";
import CategoryItems from "./components/CategoryItems"
import ItemProfile from "./components/ItemProfile";

function App(){
    return ( 
        <div className="App">
            <BrowserRouter>
            <Navbar />
                <div className="pages">
                    <Routes>
                        <Route 
                            path="/"
                            element={ <Home /> }
                        />

                        <Route 
                            path="/category"
                            element={ <CategoryForm /> }
                        />
                        <Route 
                            path="/categoryItems/:id"
                            element={ <CategoryItems /> }
                        />

                         <Route 
                            path="/furniture"
                            element={ <FurnitureForm /> }
                        />

                         <Route 
                            path="/items"
                            element={ <Items /> }
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
     );
}
 
export default App;