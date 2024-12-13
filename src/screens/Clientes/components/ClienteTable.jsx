import React from 'react'
import Pagination from '../../../components/Pagination'
import { DocumentTextIcon, PencilIcon, TrashIcon, TagIcon } from "@heroicons/react/24/outline";
const ClienteTable = ({data,pagina,paginas,total,submitHandle, handleShow,handleEdit,handleDelete, handleMembresias}) => {   

   
    return (  
        <>   
        <table className="border-collapse text-[13px] w-full">
                <thead>
                <tr className="h-8 bg-gradient-to-t border border-gray-300 from-gray-200 to-gray-100 text-[13px] text-gray-500">                                                           
                    <th className="w-1/12 border-r border-gray-300">ID</th>
                    <th className="w-6/12 border-r border-gray-300">Nombres</th>                                  
                    <th className="w-2/12 border-r border-gray-300">CI</th>
                    <th className="w-1/12 border-r border-gray-300">Teléfono</th>
                    <th className="w-1/12 border-r border-gray-300">Estado</th>                                        
                    <th className="w-1/12"></th>
                    </tr>
                </thead>
                <tbody>
                    { data && (
                        data.map(item =>(
                            <tr key={item.id} className="hover:bg-sky-100 text-gray-600 h-8 border-gray-300 border">
                                <td className="pl-1 border-r border-gray-300 text-center">{item.id}</td>                                                       
                                <td className="pl-1 border-r border-gray-300">{item.nombres}</td>
                                <td className="pl-1 border-r border-gray-300">{item.ci}</td>                                
                                <td className="pl-1 border-r border-gray-300">{item.telefono}</td>
                                <td className="pl-1 border-r border-gray-300">
                                    <div className={item.estado ? 'flex bg-green-200 justify-center':'bg-red-200 flex justify-center'}>                                        
                                        {item.estado ? "Habilitado" :"Deshabilitado" }                    
                                    </div>                                
                                </td>
                                <td className="border border-gray-300">
                                  <div className='flex w-full items-center justify-around'>
                                    <button
                                        onClick={() => handleShow(item.id)}
                                        className="w-6 h-6 rounded bg-red-400 hover:bg-red-300 text-[10px] text-white mr-1 flex items-center justify-center">
                                        <DocumentTextIcon className="h-4 w-4 text-gray-50" /> 
                                    </button>
                                    <button
                                        onClick={() => handleEdit(item.id)}
                                        className="w-6 h-6 rounded bg-sky-400 hover:bg-sky-300 text-[10px] text-white flex items-center justify-center">                                        
                                        <PencilIcon className="h-4 w-4 text-gray-50" /> 
                                    </button>                                    
                                    <button                                        
                                        onClick={()=>handleMembresias(item.id)}
                                        className="w-6 h-6 rounded bg-green-400 hover:bg-green-300 text-[10px] text-white ml-1 flex items-center justify-center">
                                        <TagIcon className="h-4 w-4 text-gray-50" /> 
                                    </button>                                                                        
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="ml-1 w-6 h-6 rounded bg-red-400 hover:bg-red-300 text-[10px] text-white flex items-center justify-center">
                                        <TrashIcon className="h-4 w-4 text-gray-50" /> 
                                    </button>
                                  </div>
                                </td>
                            </tr>
                        ))
                    )
                    }                    
                    
                </tbody>
                </table>  
                <div className="mt-1">
          <Pagination
          makeHttpRequestWithPage={ submitHandle} 
          total={total}
          paginas={paginas}
          pagina={pagina}
          num={14}
          />
      </div>  

        </>
     );
}
 
export default ClienteTable;