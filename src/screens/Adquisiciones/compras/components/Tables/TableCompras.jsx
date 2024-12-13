import React from "react";
import Moment from 'react-moment'
import Pagination from '../../../../../components/Pagination'
import { CheckIcon, PencilIcon } from "@heroicons/react/24/solid";


const TableCompra = ({data,pagina,paginas,total,setindicador,indicador,getDatas}) =>{
    
    return( 
        <>     
        <div className="w-full mt-1">
            <table className="border-collapse text-[13px] w-full">         
            <thead>
            <tr className="h-7 bg-gradient-to-t from-gray-200 to-gray-100 border text-[13px] text-gray-500">                                                         
                    <th className="w-1/12 border-r border-gray-300"></th>                    
                    <th className="w-1/12 border-r border-gray-300">Fecha</th>
                    <th className="w-1/12 border-r border-gray-300">Tipo</th>
                    <th className="w-5/12 border-r border-gray-300">Detalle</th>
                    <th className="w-3/12 border-r border-gray-300">Proveedor</th>
                    <th className="w-1/12 ">Estado</th>
                </tr>
            </thead>
            {data.length > 0 ?
            <tbody>
                { data.map((item,index) =>(
                <tr key={index} className="hover:bg-sky-100 text-gray-600 h-8 border-gray-300">
                    <td className="border text-center">
                        <input type="checkbox" 
                          onChange={() => { setindicador(item.id, item.estado, item.totalGeneral) }} 
                          checked={ item.id === indicador ? true : false}
                          />
                    </td>                    
                    <td className="border text-center"><Moment format="DD-MM-YYYY">{item.fechaCompra}</Moment></td>
                    <td className="border text-center">{item.tipo}</td>
                    <td className="border pl-1">{item.observaciones}</td>
                    <td className="border pl-1">{item.proveedorn || ''}</td>                   
                    <td className="border">
                        <div className="h-8 flex items-center justify-center">                            
                            <span className="w-5/6 text-center" >{item.estado}</span>
                            <div className="w-1/6 flex items-center justify-center">
                                {item.estado === "pendiente" ? <PencilIcon className="h-5 w-5 text-sky-500" />:<CheckIcon className="h-5 w-5 text-green-600" />}
                            </div>                                                        
                        </div>
                    </td>    
                </tr>
                ))}
            </tbody>
            : 
            <tbody>                
                <tr>                    
                   <td className="border pl-1" colSpan={5}>Sin resultados</td>                                        
                </tr>                
            </tbody>
            }           
        </table> 
        </div>   
         <div className="">
         <Pagination
         makeHttpRequestWithPage={ getDatas}
         total={total}
         paginas={paginas}
         pagina={pagina}
         num={12}
         />
      </div>
  </>    
    )
}

export default TableCompra;