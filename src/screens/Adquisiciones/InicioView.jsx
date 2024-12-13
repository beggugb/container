import {useState} from "react";
import { Routes, Route, Outlet, Link} from 'react-router-dom'

import ProveedoresView from './proveedores/components/Screens/ProveedoresTable'
import ProveedoresEdit from './proveedores/components/Screens/ProveedorEdit'
import ComprasView from './compras/ComprasView'
import CompraEdit from './compras/components/Screens/ComprasEdit'
import { useNavigate } from "react-router-dom"
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const InicioView = () =>{
    const navigate = useNavigate()
    const [smodulo, setsmodulo] = useState("compras");

    const sendComponent = (pky) =>{
        setsmodulo(pky)        
        navigate(`/admin/adquisiciones/${pky}/list`)               
    }

    return(
        <div className="min-h-fit w-full flex-1">            
        <div className="h-600 w-full flex-1 border">                  
            <div className='h-10 flex items-center'> 
                <button 
                    onClick={() => sendComponent('compras')}
                    className={smodulo === "compras" ? "h-9 w-2/12 bg-sky-200 hover:bg-sky-300 flex items-center border-b border-l border-t   border-gray-300": "h-9 w-2/12 bg-gray-100 hover:bg-sky-300 flex items-center border-b border-l border-t   border-gray-300" }>
                    <div className="w-3/4 h-9 flex items-center text-gray-600">  
                        <span className="text-[13px] pl-2">Compras</span>  
                    </div>                
                    <div className="w-1/4 h-9 flex items-center justify-center">
                    {smodulo === "compras" ? <ChevronDownIcon className="h-6 w-6 text-gray-50" /> : <ChevronRightIcon className="h-6 w-6 text-gray-500" />}
                    </div>
                </button>

                <button 
                    onClick={() => sendComponent('proveedores')}
                    className={smodulo === "proveedores" ? "h-9 w-2/12 bg-sky-200 hover:bg-sky-300 flex items-center border-b border-l border-t   border-gray-300": "h-9 w-2/12 bg-gray-100 hover:bg-sky-300 flex items-center border-b border-l border-t   border-gray-300" }>
                    <div className="w-3/4 h-9 flex items-center text-gray-600">  
                        <span className="text-[13px] pl-2">Proveedores</span>  
                    </div>                
                    <div className="w-1/4 h-9 flex items-center justify-center">  
                    {smodulo === "proveedores" ? <ChevronDownIcon className="h-6 w-6 text-gray-50" /> : <ChevronRightIcon className="h-6 w-6 text-gray-500" />}
                    </div>
                </button>
            </div>


        <div className="flex w-full">                
        <Outlet/>
        <Routes>                
            <Route path="/" element={<ComprasView />}/>                   
            <Route path="compras/list" element={<ComprasView />}/>                     
            <Route path="compras/new" element={<CompraEdit />}/> 
            <Route path="proveedores/list" element={<ProveedoresView />}/>
            <Route path="proveedores/new" element={<ProveedoresEdit />}/> 
        </Routes>
        </div>
    </div>
 </div>   
    )
}

export default InicioView