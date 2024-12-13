import { DocumentIcon, DocumentTextIcon } from '@heroicons/react/24/solid';
import React from 'react'
import Moment from 'react-moment'


const MembresiaInfos = ({data,membresia,preaprobar,ptipo,setptipo}) => {  
  
 return (  
    <>           
      <div className="border-2 border-gray-300 p-1 w-2/6">
      <div className="mt-2 border-2 border-gray-300 rounded-lg p-2 text-xs text-gray-600 shadow-md">
        <h5 className="font-bold">Paquete:</h5>                 
        <h5 className="ml-2 border-b-2">{membresia.npaquete || ''}</h5>           
        <h5 className="font-bold">Total:</h5>                 
        <h5 className="ml-2 border-b-2">{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(membresia.vpaquete)}</h5>           
        <h5 className="font-bold">Fecha de registro:</h5>         
        <h5 className="ml-2 border-b-2"><Moment format="DD/MM/YYYY">{membresia.registro}</Moment></h5>
        <h5 className="font-bold">Fecha de vigencia:</h5>         
        <h5 className="ml-2 border-b-2"><Moment format="DD/MM/YYYY">{membresia.fvigencia}</Moment></h5>
        <h5 className="font-bold">Estado:</h5>         
        <h5 className="ml-2 border-b-2">{membresia.estado ? 'aprobado' :'pendiente'}</h5>                
      </div>
      <div className="h-auto mt-2 border-2 border-gray-300 rounded-md p-2 text-gray-600 flex-col">
        <div className="h-10 w-full flex text-[13px]">
            <div className='h-7 w-4/12 flex items-center justify-center font-bold'>
               Tipo de pago     
            </div>
            <button 
            onClick={()=> setptipo("efectivo")}
            className={ptipo === 'efectivo' ? ' rounded-l-md h-7 w-4/12 border-2 text-gray-100 flex border-gray-300 bg-sky-400 justify-center items-center font-bold': 'h-7 w-4/12 border-2 flex border-gray-300 justify-center items-center text-gray-600 bg-gray-200 rounded-l-md'}>
                efectivo
            </button>  
            <button 
            onClick={()=> setptipo("qr")}
            className={ptipo === 'qr' ? 'rounded-r-md h-7 w-4/12 border-2 text-gray-100 flex border-gray-200 bg-sky-400 justify-center items-center font-bold': 'h-7 w-4/12 border-2 flex border-gray-300 justify-center items-center text-gray-600 bg-gray-200 rounded-r-md'}>
                pago qr
            </button>  
        </div>
        <div className="h-14 w-full">
        <table className="border-collapse text-[13px]">
            <thead>
                <tr className='h-7 border bg-gray-200 border-gray-300' >                    
                <th className="w-2/12 border-r border-gray-300">#</th>                                 
                <th className="w-3/12 border-r border-gray-300">F.Pago</th>
                <th className="w-3/12 border-r border-gray-300">Monto</th>
                <th className="w-3/12 border-r border-gray-300">Estado</th>                
                <th className="w-1/12 "></th>
                </tr>
            </thead>
            <tbody>
                { data && (
                    data.map(item =>(
                        <tr key={item.id} className="hover:bg-gray-100 h-8">
                            <td className="border pl-1 ">{item.id}</td>                            
                            <td className="border pl-1 "><Moment format="DD/MM/YYYY">{item.fechaPago}</Moment></td>                            
                            <td className="border pl-1 ">
                                {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.importe)}
                            </td>
                            <td className="border pl-1 ">{item.estado}</td>
                            
                            <td className="border pl-1">
                                {item.estado === 'pendiente' ?                                 
                                <button 
                                    onClick={() => {preaprobar(item)}}
                                    className="w-10 h-7 border-4 rounded-lg bg-sky-400 hover:bg-sky-300 text-xs text-white">
                                    <DocumentIcon className='h-5 w-5' />
                                </button>                                                            
                                : 
                                <button 
                                className="w-10 h-7 border-4 rounded-lg bg-red-400 hover:bg-red-300 text-xs text-white">
                                    <DocumentTextIcon className='h-5 w-5' />
                                </button>}
                            </td>
                            
                        </tr>
                    ))
                )
                }                    
                
            </tbody>
            </table>
        </div>
      </div>         
      </div>     
    </>            
        
     );
}
 
export default MembresiaInfos;