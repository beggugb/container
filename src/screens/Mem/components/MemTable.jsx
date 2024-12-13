import Pagination from '../../../components/Pagination'
import Moment from 'react-moment'
import { PencilSquareIcon } from "@heroicons/react/24/solid";

const MemTable = ({data,pagina,paginas,total,handleEdit,getDatas}) => {      
    return (  
        <>       
            <div className="flex-1 mx-auto border border-gray-200 p-1 mt-1">
            <table className="border-collapse text-[12px] w-full">
                <thead>
                <tr className="h-8 bg-gradient-to-t from-gray-200 to-gray-100 border text-[12px] text-gray-500">                                                                      
                    <th className="w-1/12 border-r border-gray-300">ID</th>
                    <th className="w-3/12 border-r border-gray-300">CLIENTE</th>                                  
                    <th className="w-3/12 border-r border-gray-300">PAQUETE</th>
                    <th className="w-2/12 border-r border-gray-300">USUARIO</th>
                    <th className="w-1/12 border-r border-gray-300">I.VIGENCIA</th>
                    <th className="w-1/12 border-r border-gray-300">F.VIGENCIA</th>
                    <th className="w-1/12 bg-gray-50"></th>
                    </tr>
                </thead>
                <tbody>
                    { data && (
                        data.map(item =>(
                            <tr key={item.id} className="hover:bg-sky-100 text-gray-600 h-7 border-stone-300">
                                <td className="text-center border truncate">{item.id}</td>                                                       
                                <td className="pl-1 border truncate">{item.clienten || ''}</td>
                                <td className="pl-1 border truncate">{item.paqueten || ''}</td>                                
                                <td className="pl-1 border truncate">{item.usuarion || ''}</td>

                                <td className="text-center border truncate"><Moment format="DD/MM/YYYY">{item.ivigencia}</Moment></td>
                                <td className="text-center border truncate"><Moment format="DD/MM/YYYY">{item.fvigencia}</Moment></td>

                                <td className="border bg-gray-50">                               
                                    <div className='flex w-full items-center justify-center'>
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="w-7 h-7 rounded bg-red-400 hover:bg-red-300 text-[12px] text-white items-center flex justify-center">
                                        <PencilSquareIcon className='h-5 w-5' />
                                    </button> 
                                    </div>                                 
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
               makeHttpRequestWithPage={ getDatas }
               total={total}
               paginas={paginas}
               pagina={pagina}
               num={14}
               />
            </div>
        </>
     );
}
 
export default MemTable;