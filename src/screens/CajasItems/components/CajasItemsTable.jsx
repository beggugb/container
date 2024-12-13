import Moment from 'react-moment'
import Pagination from '../../../components/Pagination'
import { DocumentTextIcon } from "@heroicons/react/24/outline";


function CajasItemsTable ({data,pagina,paginas,total,getData}) {              
  return (    
    <>       
            <div className="flex-1 mx-auto mt-2">
              <table className="border-collapse text-[13px] w-full">
                <thead>
                    <tr className="h-7 bg-gray-100 border text-[13px] text-gray-600">                    
                      <th className="w-1/12 border-r border-gray-300">#</th>
                      <th className="w-1/12 border-r border-gray-300">Fecha</th>                    
                      <th className="w-6/12 border-r border-gray-300">Label</th>
                      <th className="w-1/12 border-r border-gray-300">Tipo</th>
                      <th className="w-2/12 border-r border-gray-300">$ Monto</th>                    
                      <th className="w-1/12"></th>
                    </tr>
                </thead>
                <tbody>
                    { data && (
                        data.map(item =>(
                            <tr key={item.id} className="hover:bg-sky-100 text-gray-600 h-8 border-stone-300">
                                <td className="pl-1 border text-center">{item.id}</td> 
                                <td className="text-center border"><Moment format="DD/MM/YYYY">{item.registro}</Moment></td>                                                                                                                 
                                <td className="pl-1 border">{item.label}</td>                                
                                <td className="border text-center">{item.tipo}</td>
                                <td className="border text-center">{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.monto)}</td>                              
                                <td className="border">
                                  <div className='flex items-center justify-center'>
                                    <button                                       
                                      className="w-7 h-7 rounded bg-red-400 hover:bg-red-300 text-white flex items-center justify-center">
                                        <DocumentTextIcon className="h-5 w-5 text-gray-50" /> 
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
            <div className="mt-1">
               <Pagination
               makeHttpRequestWithPage={ getData}
               total={total}
               paginas={paginas}
               pagina={pagina}
               num={12}
               />
            </div>
        </>
  );
}

export default CajasItemsTable