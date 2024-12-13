import React,{useEffect,useState} from "react";
import { getModulos } from '../routes'
import { Outlet, Routes, Route, Link  } from 'react-router-dom'
import Dashboard from '../screens/Inicio/Dashboard'
import Clientes from '../screens/Clientes/ClientesInicio'
import Membresia from '../screens/Membresias/MembresiaInicio'
import Nota from '../screens/Notas/NotasInicio'
import Caja from '../screens/Cajas/CajasInicio'
import Informes from "../screens/Informes/InformesView";
import InfMembresias from "../screens/Informes/InfMembresias"
import InfCajas from "../screens/Informes/InfCajas"
import InfConsolidado from "../screens/Informes/InfConsolidado"
import InfAsistencias from "../screens/Informes/InfAsistencias";
import InfVentas from "../screens/Informes/InfVentas"
import InfExistencias from "../screens/Informes/InfExistencias"
import Registros from "../screens/Registro/RegistroView"
import Reportes from "../screens/Reportes/ReportesView";
import RepMembresias from "../screens/Reportes/RepMembresias"
import RepCajas from "../screens/Reportes/RepCajas"
import RepConsolidado from "../screens/Reportes/RepConsolidado"
import RepExistencias from "../screens/Reportes/RepExistencias"
import RepAsistencia from "../screens/Reportes/RepAsistecia"
import RepVentas from "../screens/Reportes/RepVentas"
import RepCompras from "../screens/Reportes/RepCompras"
import RepComparativo from "../screens/Reportes/RepComparativo"
import Configuracion from "../screens/Configuraciones/Inicio"
import Inventario from "../screens/Inventario/Inicio"
import Adquisiciones from "../screens/Adquisiciones/InicioView"
import CajaItems from "../screens/CajasItems/CajasItemsView"
import Tpdv from "../screens/Tpdv/Inicio"
import Membresias from "../screens/Mem/MemInicio"
import { nombreEmpresa } from '../helpers/data'
import { UserIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";


import { AuthContext }  from '../auth/auth-context'
import NoMatch from '../layout/NoMatch'


function Admin(){  
  const { onLogout } = React.useContext(AuthContext)
  const [modulos, setmodulos] = useState([]);
  const [setu, setsetu] = useState(0);  
  let us = JSON.parse(localStorage.getItem('@usuarioFitt')) 
 
  useEffect(() => {
      let kk = getModulos(us.rolId)
      setmodulos(kk)
  }, []);

  const setsetus = (pky,_key) =>{
    setsetu(pky)
    /*dispatch(setModulo(_key))    */
 }

  return(
    <div className="h-600 flex-1">
      <nav className="h-10 flex bg-gray-500 shadow-lg mb">   
        <div className="w-2/12 p-2 bg-gray-600 text-gray-200 font-bold">
	        {nombreEmpresa}        
        </div>
        <div className="w-7/12 flex-row flex uppercase pl-1 items-center">
          { modulos.map((prop,index)=>(
              <Link 
              onClick={() => setsetus(index,prop.key)}
                to={prop.layout+prop.path}
                className={index === setu ? " bg-sky-500 border-sky-600 uppercase flex items-center justify-left pl-1 pr-1 h-8":"h-8 uppercase border border-gray-500 pl-1 pr-1  hover:bg-sky-400 flex items-center justify-left"}        
                key={prop.key}> 
              <p className="text-[13px] p-2 text-white">{prop.name}</p>
              </Link>              
          ))}
        </div>
        <div className="w-2/12 flex-row flex p-3 justify-center items-center">
            <UserIcon className="h-6 w-6 text-gray-200"/>  
            <span className="pl-5 text-[13px] text-gray-100">{us.nombre}</span> 
        </div>
        <div className="w-1/12 flex p-1 justify-end">
            <button
              className="w-12 h-7 bg-red-500 text-[13px] font-bold flex justify-center items-center"
              onClick={() => onLogout()}>
              <ArrowRightOnRectangleIcon className="h-6 w-6 text-gray-200"/>  
            </button>
        </div>
      </nav>
      <Outlet/>
     
      <Routes>
        <Route path="inicio" element={<Dashboard />}/> 
        <Route path="clientes" element={<Clientes />}/> 
        <Route path="cajas" element={<Caja />}/>
        <Route path="informes" element={<Informes />}/>   
        <Route path="infmembresias" element={<InfMembresias />}/>   
        <Route path="infcajas" element={<InfCajas />}/>   
        <Route path="infconsolidado" element={<InfConsolidado />}/>   
        <Route path="infasistencia" element={<InfAsistencias />}/>   
        <Route path="infventas" element={<InfVentas />}/>  
        <Route path="infexistencias" element={<InfExistencias />}/>  


        <Route path="registros" element={<Registros />}/>
        <Route path="tpdv" element={<Tpdv />}/>
        <Route path="configuracion/*" element={<Configuracion />}/>                
        <Route path="membresia" element={<Membresia />}/>        
        <Route path="cajasitems/:cajaId" element={<CajaItems />}/>
        <Route path="notas/:notaId" element={<Nota />}/> 
        <Route path="inventario/*" element={<Inventario />}/>        
        <Route path="adquisiciones/*" element={<Adquisiciones />}/>
        <Route path="membresias" element={<Membresias />}/>

        <Route path="reportes" element={<Reportes />}/>
        <Route path="repmembresias" element={<RepMembresias />}/>
        <Route path="repcajas" element={<RepCajas />}/>
        <Route path="repconsolidado" element={<RepConsolidado />}/>
        <Route path="repexistecias" element={<RepExistencias />}/>        
        <Route path="repasistencia" element={<RepAsistencia />}/>
        <Route path="repventas" element={<RepVentas />}/>
        <Route path="repcompras" element={<RepCompras />}/>
        <Route path="repcomparativo" element={<RepComparativo />}/>
   
        <Route path="*" element={<NoMatch />} /> 
      </Routes>      
    </div>  
    )
}
export default Admin;

