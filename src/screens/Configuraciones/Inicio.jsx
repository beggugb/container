import React from "react";
import { Routes, Route, Link} from 'react-router-dom'
import { DocumentTextIcon, UserGroupIcon  } from "@heroicons/react/24/outline";
import PaquetesView from './Paquetes/Inicio'
import UsuariosView from './Usuarios/Inicio'

const Inicio = () => {
    return (         
        <>
        <div className="h-7 bg-stone-300 w-full flex items-center">                                   
            <Link 
                to={"/admin/configuracion/paquetes/list"}             
                className="h-6 w-40 border-r border-gray-300  bg-gray-100 hover:bg-sky-100  justify-center items-center flex">                  
                  <span className="w-1/4 inline-flex justify-center items-center ml-1">
                  <DocumentTextIcon className="h-5 w-5 text-gray-600" /> 
                  </span>
                  <span className="w-3/4 text-gray-600 ml-1 text-[13px] tracking-wide truncate">Paquetes</span>
            </Link> 
            <Link 
                to={"/admin/configuracion/usuarios/list"}            
                className="h-6 w-40 border-r border-gray-300  bg-gray-100 hover:bg-sky-100  justify-center items-center flex">                  
                  <span className="w-1/4 inline-flex justify-center items-center ml-1">
                  <UserGroupIcon className="h-5 w-5 text-gray-600" />
                  </span>
                  <span className="w-3/4 text-gray-600 ml-1 text-[13px] tracking-wide truncate">Usuarios</span>
            </Link>                          
        </div>
        <div className="h-full w-full flex-1 p-1">            
            <Routes>
            <Route path="/" element={<PaquetesView/>}/>                   
            <Route path="paquetes/list" element={<PaquetesView />}/>                                            
            <Route path="usuarios/list" element={<UsuariosView />}/>
            </Routes> 
        </div> 
      </>     
     );
}
 
export default Inicio;