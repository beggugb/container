import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const TableSimple = ({data,handleDelete,handleEdit,indicador}) =>{    
    return(   
        <div className="flex-1 mx-auto">
          <table className="border-collapse text-[12px] w-full text-gray-600">          
            <thead>
            <tr className="h-7 bg-gradient-to-t from-gray-200 to-gray-100 border text-[12px] text-gray-500">                                                     
                    <th className='w-1/12 border-r border-gray-300'>#</th>                    
                    <th className='w-5/12 border-r border-gray-300'>Nombre</th>
                    <th className='w-2/12 border-r border-gray-300'>Abreviación</th>
                    <th className='w-2/12 '></th>                    
                </tr>
            </thead>
            {data.length > 0 ?
            <tbody>
                { data.map((item,index) =>(
                <tr key={index} className={indicador === item.id ? "border border-gray-300 bg-sky-300 text-gray-600 h-7":"border border-gray-300 hover:bg-sky-100 text-gray-600 h-7"} >                     
                    <td className="text-center border-r border-gray-300">{item.id}</td>
                    <td className="pl-1 border-r border-gray-300">{item.nombre}</td>
                    <td className="text-center border-r border-gray-300">{item.abreviacion}</td>                                                        
                    <td className="">
                        <div className="h-7 flex items-center justify-center">                            
                            <button 
                            className="w-8 h-7 rounded bg-sky-400 hover:bg-sky-300 text-xs text-white mr-2 flex justify-center items-center"
                            onClick={() => handleEdit(item)}>                                
                                <PencilIcon className="h-5 w-5"/>
                            </button>
                            <button 
                            className="w-8 h-7 rounded bg-red-400 hover:bg-red-300 text-xs text-white flex justify-center items-center"
                            onClick={() => handleDelete(item.id)} >
                                <TrashIcon className="h-5 w-5"/>
                            </button>
                        </div>                        
                    </td>
                </tr>
                ))}
            </tbody>
            : 
            <tbody>                
                <tr>                    
                   <td colSpan={5}>Sin resultados</td>                                        
                </tr>                
            </tbody>
            }           
        </table> 
        </div>       
    )
}

export default TableSimple;