import React,{useEffect} from 'react'
import Pagination from '../../../../components/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { paquetesData,setpaquete, paquetesDelete } from '../../../../reducers/slices/paqueteSlice'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'

const MembresiaTable = () => {  
    const dispatch = useDispatch() 
    const { data,total,pagina,paginas } = useSelector(state => state.paquete)  


    const makeHttpRequestWithPages = (page, num) =>{           
        dispatch(paquetesData({page:page,num:num}))
    }
    const makeHttpRequestWithPage = (page, num) =>{
        if(page>0){
            let iok ={
                page:page,
                num:num
            }
            dispatch(paquetesData(iok)) 
        }        
    }
    const itemHandler = (pky) =>{
        const { diario, enabled, id, meses, nombre, valor} = pky
        let iok={
            id:id,
            diario:diario,
            enabled:enabled,
            meses:meses,
            nombre: nombre,
            valor: valor
        }
        dispatch(setpaquete(iok))
    }

    useEffect(() =>{        
        makeHttpRequestWithPages(1,12);    
         return () =>{                                
            /*dispatch({type:'paquetesReset'})*/
        };
      }, []);

    const handleDelete = (it) =>{
        dispatch(paquetesDelete({paqueteId:it.id}))
    }
    return (  
        <>     
            <div className="flex-1 mx-auto  p-1 mt-1">
              <table className="border-collapse text-[12px] w-full">
                <thead>
                <tr className="h-7 bg-gradient-to-t from-gray-200 to-gray-100 border text-[12px] text-gray-500">                                        
                    <th className="w-5/12 border-r border-gray-300">Nombre</th>
                    <th className="w-2/12 border-r border-gray-300 ">Valor</th>                    
                    <th className="w-1/12 border-r border-gray-300 ">Tipo</th>                    
                    <th className="w-1/12 border-r border-gray-300 ">Meses</th>
                    <th className="w-2/12 border-r border-gray-300 ">Estado</th>
                    <th className="w-1/12 border "></th>
                    </tr>
                </thead>
                <tbody>
                    { data && (
                        data.map((item,index) =>(
                            <tr key={index} className="hover:bg-sky-100 text-gray-600 h-8 border-stone-300">
                                <td className="border pl-1">{item.nombre}</td>
                                <td className="border text-center">{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.valor)}</td>                      
                                <td className="border text-center">{item.diario ? 'diario': 'normal'}</td>                                
                                <td className="border pl-1 text-center">{item.meses}</td>
                                <td className={item.enabled ? "border pl-1 bg-green-300 text-center":"text-center border pl-1 bg-red-300"}>{item.enabled ? "Habilitado":"Desabilitado"}</td>
                                <td className="border">   
                                <div className='h-6 flex justify-around items-center'>
                                    <button 
                                        className="w-8 h-5 rounded bg-sky-400 hover:bg-sky-300 text-xs text-white flex items-center justify-center"
                                        onClick={() => {itemHandler(item)}} >
                                        <PencilIcon className='h-4 w-4' />
                                    </button>
                                    <button 
                                        className="w-8 h-5 rounded bg-red-400 hover:bg-red-300 text-xs text-white flex items-center justify-center"
                                        onClick={() => {handleDelete(item)}} >
                                        <TrashIcon className='h-4 w-4' />
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
            <div className="pl-1 pr-1">
               <Pagination
               makeHttpRequestWithPage={ makeHttpRequestWithPage}
               total={total}
               paginas={paginas}
               pagina={pagina}
               num={12}
               />
            </div>
            
        </>
     );
}
 
export default MembresiaTable;