import React from 'react'
import Pagination from '../../../components/Pagination'
import { CurrencyDollarIcon, DocumentTextIcon, TrashIcon } from "@heroicons/react/24/outline";
import Moment from 'react-moment';

const MembresiaTable = ({data,total,pagina,paginas,makeHttpRequestWithPage,delHandler,handlePagar}) => {  
    
    return (  
        <div >     
            <div className="flex-1 w-full">
            <table className="border-collapse text-[13px] w-full">
                <thead>
                <tr className="h-8 bg-gradient-to-t from-gray-200 to-gray-100 border text-[13px] text-gray-500">                                                          
                    <th className="w-4/12 border-r border-gray-300">Paquete</th>
                    <th className="w-2/12 border-r border-gray-300">Total</th>                    
                    <th className="w-2/12 border-r border-gray-300">F.Registro</th>
                    <th className="w-2/12 border-r border-gray-300">F.Vencimiento</th>
                    <th className="w-1/12 border-r border-gray-300">Estado</th>                    
                    <th className="w-1/12 "></th>
                    </tr>
                </thead>
                <tbody>
                    { data && (
                        data.map((item,index) =>(
                            <tr key={index} className="hover:bg-sky-100 text-gray-600 h-7 border-stone-300">
                                <td className="border pl-1 ">{item.paquete}</td>
                                <td className="border text-center">                                    
                                    {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.ingresos)}
                                </td>                                
                                <td className="border text-center"><Moment format="DD/MM/YYYY">{item.ivigencia}</Moment></td>
                                <td className="border text-center"><Moment format="DD/MM/YYYY">{item.fvigencia}</Moment></td>
                                <td className={item.est === "activo" ?" bg-green-500 italic border text-center text-white font-bold": "bg-red-500 italic border text-center text-white font-bold"}>{item.est}</td>
                                <td className="pl-1 pt-1  flex-row flex justify-center ">
                                    {item.estado === false ? 
                                    <>
                                    <button 
                                        className="w-10 h-6 rounded-l  bg-sky-400 hover:bg-sky-300 text-xs text-white flex justify-center items-center"
                                        onClick={() => {delHandler(item.id)}} >
                                        <TrashIcon className="h-5" />
                                    </button>
                                    <button 
                                    onClick={() => {handlePagar(item.id)}} 
                                    className="w-10 h-6 rounded-r bg-orange-400 hover:bg-orange-300 text-xs text-white flex justify-center items-center">
                                        <CurrencyDollarIcon className="h-5" />
                                    </button>                                    
                                    </>
                                    : 
                                    <button 
                                    className="w-10 h-6 rounded bg-red-400 hover:bg-red-300 text-xs text-white flex justify-center items-center">
                                        <DocumentTextIcon className="h-5" />
                                    </button>}
                                </td>
                                
                            </tr>
                        ))
                    )
                    }                    
                    
                </tbody>
                </table>
            </div>
            <div className="">
               <Pagination
               makeHttpRequestWithPage={ makeHttpRequestWithPage}
               total={total}
               paginas={paginas}
               pagina={pagina}
               num={12}
               />
            </div>
        </div>
     );
}
 
export default MembresiaTable;