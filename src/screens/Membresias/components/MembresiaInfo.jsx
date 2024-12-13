import React from 'react'
import {apis} from '../../../helpers/api'
import Moment from 'react-moment'
const MembresiaInfo = ({item}) => {       
 return (  
    <div className="h-570 w-full bg-slate-600">
      <div className="justify-center flex text-center p-2">
       <img
          alt="cliente"
          className="h-36 w-36 rounded-full shadow-xl p-2 border"
          src={apis + "/static/images/clientes/lg/" + item.filename}
        />              
      </div>
      <div className="bg-white mt-2 border rounded-lg m-2 p-2 text-[13px] text-gray-600 shadow-md">
        <p className="h-6 font-bold">Nombres:</p>                 
        <p className="h-7 ml-2 border-b truncate">{item.nombres}</p>           
        <p className="h-6 font-bold">CI:</p>                 
        <p className="h-7 ml-2 border-b">{item.ci}</p>           
        <p className="h-6 font-bold">Fecha de registro:</p>         
        <p className="h-7 ml-2 border-b"><Moment format="DD/MM/YYYY">{item.createdAt}</Moment></p>
        <p className="h-6 font-bold">Dirección:</p>         
        <p className="h-7 ml-2 border-b">{item.direccion}</p>
        <p className="h-6 font-bold">País:</p>         
        <p className="h-7 ml-2 border-b">{item.pais}</p>
        <p className="h-6 font-bold">Tipo:</p>         
        <p className="h-7 ml-2 border-b">{item.tipo}</p>
        <p className="h-6 font-bold">Teléfono:</p>         
        <p className="h-7 ml-2 border-b">{item.telefono || 'sin registro'}</p>
      </div>         
    </div>     
        
        
     );
}
 
export default MembresiaInfo;