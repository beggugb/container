import React,{useEffect} from 'react'
import Pagination from '../../../components/Pagination'
import { Link } from "react-router-dom";
import Moment from 'react-moment'
import { DocumentTextIcon, CheckIcon, PencilIcon } from "@heroicons/react/24/outline";

const CajasTable = ({data,pagina,paginas,total,submitHandle, handleShow,handleAproba}) => {   
    
    return (  
        <>       
        <table className="border-collapse text-[13px] w-full">                
                <thead>
                <tr className="h-8 bg-gradient-to-t border border-gray-300 from-gray-200 to-gray-100 text-[13px] text-gray-500">
                    <th className="w-1/12 border-r border-gray-300">Fecha</th>
                    <th className="w-2/12 border-r border-gray-300">Usuario</th>                    
                    <th className="w-2/12 border-r border-gray-300">$ Inicial</th>
                    <th className="w-2/12 border-r border-gray-300">$ Ingreso</th>
                    <th className="w-2/12 border-r border-gray-300">$ Egreso</th>
                    <th className="w-2/12 border-r border-gray-300">$ Final</th>                    
                    <th className="w-1/12 border-r border-gray-300">F. Cierre</th>
                    <th className="w-1/12"></th>
                    </tr>
                </thead>
                <tbody>
                    { data && (
                        data.map(item =>(
                            <tr key={item.id} className="border hover:bg-sky-100 text-gray-600 h-8 border-gray-300">
                                <td className="border-r border-gray-300 text-center"><Moment format="DD/MM/YYYY">{item.registro}</Moment></td>
                                <td className="border-r border-gray-300 pl-1">{item.usuario.nombre || ''}</td>  
                                <td className="border-r border-gray-300 text-center">{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoInicial)}</td>
                                <td className="border-r border-gray-300 text-center">{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoIngreso)}</td>
                                <td className="border-r border-gray-300 text-center">{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoEgreso)}</td>
                                <td className="border-r border-gray-300 text-center">{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoFinal)}</td>                                                              
                               
                                <td className="border-r border-gray-300 pl-1 pr-1 text-[12px]">
                                    <div className={item.fechaCierre ? 'h-6 rounded bg-sky-500 text-gray-50 flex justify-center items-center':'h-6 rounded flex bg-red-400 text-gray-50 justify-center items-center'}>
                                        {item.fechaCierre ? 
                                            <Moment format="DD/MM/YYYY">{item.fechaCierre}</Moment>
                                            :
                                            <span>abierto</span>
                                        }
                                    </div>                                                           
                                </td>
                                <td className="h-8">
                                    <div className="border-r border-gray-300 pl-1 flex flex-row justify-center items-center">
                                    {item.estado ? 
                                        <button 
                                        onClick={() => handleShow(item.id)}
                                        className="w-7 h-7 rounded bg-red-400 hover:bg-red-300 text-xs text-white flex items-center justify-center ">
                                            <DocumentTextIcon className="h-5" />
                                        </button>
                                        :
                                        <>
                                        <Link to={`/admin/cajasitems/${item.id}`}>
                                        <button 
                                        className="w-6 h-6 rounded bg-sky-400 hover:bg-sky-300 text-xs text-white flex items-center justify-center ">
                                            <PencilIcon className="h-5" />
                                        </button>
                                        </Link>
                                        <button 
                                        onClick={() => handleAproba(item)}
                                        className="w-6 h-6 rounded bg-green-400 ml-1 hover:bg-green-300 text-xs text-white flex items-center justify-center">
                                            <CheckIcon className="h-5" />
                                        </button>
                                        </>
                                    }    
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
 
export default CajasTable;
