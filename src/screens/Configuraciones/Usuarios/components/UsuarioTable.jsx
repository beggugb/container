import React,{useEffect} from 'react'
import Pagination from '../../../../components/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { DocumentTextIcon, PencilIcon, TrashIcon, TagIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { usuariosData,setusuario, usuariosDelete } from '../../../../reducers/slices/usuarioSlice'

const UsuarioTable = () => {  
    const dispatch = useDispatch()     
    const { data,total,pagina,paginas } = useSelector(state => state.usuario)  


    const makeHttpRequestWithPage = (page, num) =>{       
        let iok={
            page:page,
            num:num
        } 
        dispatch(usuariosData(iok))         
    }
    const makeHttpRequestWithPages = (page, num) =>{           
        if(page > 0){
            let iok={
                page:page,
                num:num
            } 
            dispatch(usuariosData(iok))         
        }        
    }
    
    const itemHandler = (pky) =>{
        const { enabled,id,nombre,nrol,rolId,sucursalId,username} = pky
        let iok={
            id:id,
            enabled:enabled,
            nombre:nombre,
            nrol:nrol,
            rolId:rolId,
            sucursalId:sucursalId,
            username:username
        }
      dispatch(setusuario(iok))
      
    }


    useEffect(() =>{        
        makeHttpRequestWithPage(1,12);    
         return () =>{                                
            /*dispatch({type:'paquetesReset'})*/
        };
      }, []);

      const handleDelete = (it) =>{
        
        dispatch(usuariosDelete({usuarioId:it.id}))
    }
    return (  
        <>     
        <div className="flex-1 mx-auto p-1">
          <table className="border-collapse text-[12px] w-full">
                <thead>
                <tr className="h-8 bg-gradient-to-t from-gray-200 to-gray-100 border text-[12px] text-gray-500">                                                    
                    <th className="w-4/12 border-r border-gray-300 ">Nombres</th>
                    <th className="w-3/12 border-r border-gray-300 ">Username</th>                    
                    <th className="w-2/12 border-r border-gray-300 ">Rol</th>                    
                    <th className="w-2/12 border-r border-gray-300 ">Estado</th>
                    <th className="w-1/12 "></th>
                    </tr>
                </thead>
                <tbody>
                    { data && (
                        data.map(item =>(
                            <tr key={item.id} className="hover:bg-sky-100 text-gray-600 h-7 border-stone-300">
                                <td className="border pl-1">{item.nombre}</td>
                                <td className="border pl-1">{item.username}</td>                                            
                                <td className="border pl-1">{item.nrol}</td>      
                                <td className={item.enabled ? "border pl-1 bg-green-300 text-center":"text-center border pl-1 bg-red-300"}>{item.enabled ? "Habilitado":"Desabilitado"}</td>                       
                                <td className="border">                             
                                <div className='flex items-center justify-around'>
                                <button 
                                   className="w-8 h-5  rounded bg-sky-400 hover:bg-sky-300  text-white flex items-center justify-center"
                                   onClick={() => {itemHandler(item)}} >
                                   <PencilIcon className="h-4 w-4 text-white" />
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
            <div className="p-1">
               <Pagination
               makeHttpRequestWithPage={ makeHttpRequestWithPages}
               total={total}
               paginas={paginas}
               pagina={pagina}
               num={12}
               />
            </div>
        </>
     );
}
 
export default UsuarioTable;