import { useEffect, useState } from "react";
import { useSelector, useDispatch} from 'react-redux'
import { proveedorItem, proveedoresData, resetItem } from '../../../../../reducers/slices/proveedorSlice'
import TableProveedor from '../Tables/TableProveedor'
import Pagination from '../../../../../components/Pagination'
import { useNavigate} from 'react-router-dom'
import Loading from '../../../../../components/snippets/Loading'
import { XMarkIcon, MagnifyingGlassIcon, DocumentIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { PencilIcon } from "@heroicons/react/24/outline";

const ProveedoresTable = () =>{
    const dispatch = useDispatch()  
    const navigate = useNavigate();            
    const { data, item, total, pagina, paginas, loading } = useSelector(state => state.proveedor)    
    const [parametro, setparametro] = useState("");
    const [indicador, setindicador] = useState(-1);
    const [view, setview] = useState(false);

    const chargesData = () =>{
        let iok={
            page:1,
            num:14,
            parametro:parametro
        }
        dispatch(proveedoresData(iok))
    }  

    const chargeData = (page,num) =>{
        if(page > 0){
            let iok={
                page:page,
                num:num,
                parametro:parametro
            }
            dispatch(proveedoresData(iok))
        }        
    }
    const setIndicador = (pky) => {            
        let iok = pky === indicador  ? 0 : pky
        setindicador(iok)
      };
    useEffect(() => {
        chargesData()
        return () => {
            //*cleanup
        };
    }, []);
     
    const editar = () =>{
        dispatch(resetItem())
        if(indicador > 0){
            dispatch(proveedorItem({id:indicador,tip:"unit"}))
            navigate('/admin/adquisiciones/proveedores/new');
        }   
        navigate('/admin/adquisiciones/proveedores/new');     
    }

    const toggleModalView = (view) => {                    
        if(indicador !== 0){
            view(true)

        }                 
    };  
    


    const deleteItem = () =>{
        if(indicador !== 0 ){
/*            dispatch(inventarioActions.dDelete('proveedoresData','proveedores',indicador))*/
        }
    }

    const handleDelete = () =>{
        let iok={
            page:1,
            num:14,
            parametro:""
        }
        dispatch(proveedoresData(iok))
    }

    const submitSearch = event =>{
        event.preventDefault() 
        let iok={
            page:1,
            num:14,
            parametro:parametro
        }
        dispatch(proveedoresData(iok))
    } 
    

    return(
        <>
         <div className="h-550 w-full flex-col border border-gray-300">              
            <div className='h-12 w-full bg-gray-200 flex items-center'>
                <div className="w-2/6 flex items-center pl-2">
                <div                     
                    onClick={()=> indicador > 0 ? null : editar(indicador) }
                    className={indicador > 0 ? "h-8 w-10 text-center bg-red-300 mr-1 flex items-center justify-center rounded-l" :
                    "h-8 w-10 text-center bg-red-400 hover:bg-red-300 mr-1 flex items-center justify-center rounded-l"}>                   
                    <PlusIcon className="h-5 w-5 text-gray-50" />
                </div>
                <div 
                onClick={()=> indicador > 0 ? editar(indicador) : null}
                className={indicador === 0  ? "h-8 w-10 text-center bg-sky-200 mr-1 flex items-center justify-center" :
                "h-8 w-10 text-center bg-sky-400  mr-1 flex items-center justify-center"}>                        
                <PencilIcon className="h-5 w-5 text-gray-50" />
                </div>                
                <div                     
                    onClick={()=> indicador > 0 ? deleteItem() : null}
                    className={indicador === 0 ? "h-8 w-10 text-center bg-sky-200 border-r flex items-center justify-center rounded-r"  :
                    "h-8 w-10 text-center bg-sky-400 mr-1 flex items-center justify-center rounded-r"}>
                    <TrashIcon className="h-5 w-5 text-gray-50" />
                </div>                
                
                </div>
                <div className="w-2/6"></div>
                
                <div className="w-2/6 flex justify-end pr-4">               
                    <form onSubmit={submitSearch} className="rounded w-full flex-col text-[12px] "> 
                    <div className="h-10 w-full flex p-1 border border-gray-200">                                            
                        <input
                            type="text" 
                            name="value" 
                            value={parametro} 
                            onChange={(e) => setparametro(e.target.value)} 
                            className="h-8 focus:ring-0 border-none w-full text-[12px] text-gray-600"/>
                        <button
                            onClick={() => handleDelete()}
                            type="button"
                            className={parametro ? "h-8 w-10 -ml-20 z-10 text-sm text-red-400":"h-8 w-10 -ml-20 z-10 text-sm text-white" }>
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                        <button
                            type="submit"
                            className="h-8 w-10 z-0 text-sm text-gray-600">  
                            <MagnifyingGlassIcon className="h-5 w-5"/>
                        </button>    
                    </div>
                    </form>
                </div>
            </div>  

            <div className='h-400 w-full flex-col border'>
                <div className="">
                <TableProveedor
                    data={data}
                    setIndicador={setIndicador}
                    indicador={indicador}
                /> 
                </div>
                <div className="p-1">
               <Pagination
               makeHttpRequestWithPage={chargeData}
               total={total}
               paginas={paginas}
               pagina={pagina}
               num={12}
               />
            </div>                                                                        
                
            </div> 
            
        </div>                
        <Loading loading={loading}/>
      </>
    )
}

export default ProveedoresTable