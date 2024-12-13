import React from "react";
import { Routes, Route, Outlet } from 'react-router-dom'
import VentasInicio from "./components/Screens/VentasInicio";
import VentasEdit from "./components/Screens/VentasEdit";

const ProductosView = () =>{   
    return(
        <>                 
        <Routes>                
            <Route path="/" element={<VentasInicio />}/>                   
            <Route path="lista" element={<VentasInicio />}/> 
            <Route path="nuevo" element={<VentasEdit />}/> 
        </Routes>
        <Outlet/>       
        </>         
    )
}

export default ProductosView