import {useState} from "react";
import { Routes, Route, Outlet, Link} from 'react-router-dom'
import ProductosView from './productos/ProductosView'
import ProductosEdit from './productos/components/Screens/ProductoEdit'
import Categorias from './categorias/CategoriasView'
import Marcas from './marcas/MarcasView'
import Modelos from './modelos/ModelosView'
import Tipos from './tipos/TiposView'
import Origenes from './origenes/OrigenesView'
import Volumenes from './volumenes/VolumenesView'
import Unidades from './unidades/UnidadesView'
import Industrias from './industrias/IndustriasView'
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom"

const Inicio= () => {
    const navigate = useNavigate()
    const [smodulo, setsmodulo] = useState("productos");


    const sendComponent = (pky) =>{
        setsmodulo(pky)
        navigate(`/admin/inventario/${pky}/list`)               
    }

    return ( 
        <div className="min-h-fit w-full flex-1">            
            <div className="h-600 w-full flex-1 border">                  
                <div className='h-10 flex items-center'> 
                    <button 
                        onClick={() => sendComponent('productos')}
                        className={smodulo === "productos" ? "h-8 w-2/12 bg-sky-200 hover:bg-sky-300 flex items-center border-b border-l border-t   border-gray-300": "h-8 w-2/12 bg-gray-100 hover:bg-sky-300 flex items-center border-b border-l border-t   border-gray-300" }>
                        <div className="w-3/4 h-6 flex items-center text-gray-600">  
                            <span className="text-[13px] pl-2">Productos</span>  
                        </div>                
                        <div className="w-1/4 h-6 flex items-center justify-center">
                        {smodulo === "productos" ? <ChevronDownIcon className="h-4 w-4 text-gray-500" /> : <ChevronRightIcon className="h-4 w-4 text-gray-500" />}
                        </div>
                    </button>

                    <button 
                        onClick={() => sendComponent('categorias')}
                        className={smodulo === "categorias" ? "h-8 w-2/12 bg-sky-200 hover:bg-sky-300 flex items-center border-b border-l border-t   border-gray-300": "h-8 w-2/12 bg-gray-100 hover:bg-sky-300 flex items-center border-b border-l border-t   border-gray-300" }>
                        <div className="w-3/4 h-6 flex items-center text-gray-600">  
                            <span className="text-[13px] pl-2">Categorías</span>  
                        </div>                
                        <div className="w-1/4 h-6 flex items-center justify-center">  
                        {smodulo === "categorias" ? <ChevronDownIcon className="h-4 w-4 text-gray-500" /> : <ChevronRightIcon className="h-4 w-4 text-gray-500" />}
                        </div>
                    </button>

                    <button 
                        onClick={() => sendComponent('marcas')}
                        className={smodulo === "marcas" ? "h-8 w-2/12 bg-sky-200 hover:bg-sky-300 flex items-center border-b border-l border-t   border-gray-300": "h-8 w-2/12 bg-gray-100 hover:bg-sky-300 flex items-center border-b border-l border-t   border-gray-300" }>
                        <div className="w-3/4 h-6 flex items-center text-gray-600">  
                            <span className="text-[13px] pl-2">Marcas</span>  
                        </div>                
                        <div className="w-1/4 h-6 flex items-center justify-center">  
                        {smodulo === "marcas" ? <ChevronDownIcon className="h-4 w-4 text-gray-500" /> : <ChevronRightIcon className="h-4 w-4 text-gray-500" />}
                        </div>
                    </button>

                    <button 
                        onClick={() => sendComponent('modelos')}
                        className={smodulo === "modelos" ? "h-8 w-2/12 bg-sky-200 hover:bg-sky-300 flex items-center border-b border-l border-t   border-gray-300": "h-8 w-2/12 bg-gray-100 hover:bg-sky-300 flex items-center border-b border-l border-t   border-gray-300" }>
                        <div className="w-3/4 h-6 flex items-center text-gray-600">  
                            <span className="text-[13px] pl-2">Modelos</span>  
                        </div>                
                        <div className="w-1/4 h-6 flex items-center justify-center">  
                        {smodulo === "modelos" ? <ChevronDownIcon className="h-4 w-4 text-gray-500" /> : <ChevronRightIcon className="h-4 w-4 text-gray-500" />}
                        </div>
                    </button>

                    <button 
                        onClick={() => sendComponent('tipos')}
                        className={smodulo === "tipos" ? "h-8 w-2/12 bg-sky-200 hover:bg-sky-300 flex items-center border-b border-l border-t   border-gray-300": "h-8 w-2/12 bg-gray-100 hover:bg-sky-300 flex items-center border-b border-l border-t   border-gray-300" }>
                        <div className="w-3/4 h-6 flex items-center text-gray-600">  
                            <span className="text-[13px] pl-2">Tipos</span>  
                        </div>                
                        <div className="w-1/4 h-6 flex items-center justify-center">  
                        {smodulo === "tipos" ? <ChevronDownIcon className="h-4 w-4 text-gray-500" /> : <ChevronRightIcon className="h-4 w-4 text-gray-500" />}
                        </div>
                    </button>

                    <button 
                        onClick={() => sendComponent('origenes')}
                        className={smodulo === "origenes" ? "h-8 w-2/12 bg-sky-200 hover:bg-sky-300 flex items-center border-b border-l border-t   border-gray-300": "h-8 w-2/12 bg-gray-100 hover:bg-sky-300 flex items-center border-b border-l border-t   border-gray-300" }>
                        <div className="w-3/4 h-6 flex items-center text-gray-600">  
                            <span className="text-[13px] pl-2">Origenes</span>  
                        </div>                
                        <div className="w-1/4 h-6 flex items-center justify-center">  
                        {smodulo === "origenes" ? <ChevronDownIcon className="h-4 w-4 text-gray-500" /> : <ChevronRightIcon className="h-4 w-4 text-gray-500" />}
                        </div>
                    </button>

                    <button 
                        onClick={() => sendComponent('volumenes')}
                        className={smodulo === "volumenes" ? "h-8 w-2/12 bg-sky-200 hover:bg-sky-300 flex items-center border-b border-l border-t   border-gray-300": "h-8 w-2/12 bg-gray-100 hover:bg-sky-300 flex items-center border-b border-l border-t   border-gray-300" }>
                        <div className="w-3/4 h-6 flex items-center text-gray-600">  
                            <span className="text-[13px] pl-2">Volumenes</span>  
                        </div>                
                        <div className="w-1/4 h-6 flex items-center justify-center">  
                        {smodulo === "volumenes" ? <ChevronDownIcon className="h-4 w-4 text-gray-500" /> : <ChevronRightIcon className="h-4 w-4 text-gray-500" />}
                        </div>
                    </button>

                    <button 
                        onClick={() => sendComponent('unidades')}
                        className={smodulo === "unidades" ? "h-8 w-2/12 bg-sky-200 hover:bg-sky-300 flex items-center border-b border-l border-t   border-gray-300": "h-8 w-2/12 bg-gray-100 hover:bg-sky-300 flex items-center border-b border-l border-t   border-gray-300" }>
                        <div className="w-3/4 h-6 flex items-center text-gray-600">  
                            <span className="text-[13px] pl-2">Unidades</span>  
                        </div>                
                        <div className="w-1/4 h-6 flex items-center justify-center">  
                        {smodulo === "unidades" ? <ChevronDownIcon className="h-4 w-4 text-gray-500" /> : <ChevronRightIcon className="h-4 w-4 text-gray-500" />}
                        </div>
                    </button>

                    <button 
                        onClick={() => sendComponent('industrias')}
                        className={smodulo === "industrias" ? "h-8 w-2/12 bg-sky-200 hover:bg-sky-300 flex items-center border-b border-l border-t   border-gray-300": "h-8 w-2/12 bg-gray-100 hover:bg-sky-300 flex items-center border-b border-l border-t   border-gray-300" }>
                        <div className="w-3/4 h-6 flex items-center text-gray-600">  
                            <span className="text-[13px] pl-2">Industrias</span>  
                        </div>                
                        <div className="w-1/4 h-6 flex items-center justify-center">  
                        {smodulo === "industrias" ? <ChevronDownIcon className="h-4 w-4 text-gray-500" /> : <ChevronRightIcon className="h-4 w-4 text-gray-500" />}
                        </div>
                    </button>
                </div>  


            <div className="flex w-full border-b border-gray-200">
            <Outlet/>
            <Routes>                
            <Route path="/" element={<ProductosView />}/>                   
            <Route path="productos/list" element={<ProductosView />}/>                   
            <Route path="productos/new" element={<ProductosEdit />}/>             
            <Route path="categorias/list" element={<Categorias />}/> 
            <Route path="marcas/list" element={<Marcas />}/>
            <Route path="modelos/list" element={<Modelos />}/>
            <Route path="tipos/list" element={<Tipos />}/>
            <Route path="origenes/list" element={<Origenes />}/>
            <Route path="volumenes/list" element={<Volumenes />}/>
            <Route path="unidades/list" element={<Unidades />}/>
            <Route path="industrias/list" element={<Industrias />}/>
            </Routes>
            </div>
        </div>
     </div>  
     
     );
}
 
export default Inicio;
