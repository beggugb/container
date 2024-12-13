import { useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { productosDelete, productosData, productoItem,dependencias, resetItem, resetData } from '../../../reducers/slices/productoSlice'
import ProductoItem from "./components/Views/ProductoItem"
import Loading from '../../../components/snippets/Loading'
import TableProducto from "./components/Tables/TableProducto";    
import { XMarkIcon, MagnifyingGlassIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { useNavigate} from 'react-router-dom'
import Pagination from '../../../components/Pagination'
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

const ProductosView= () => {
    const dispatch = useDispatch()  
    let navigate = useNavigate();    
    const [showModal, setShowModal] = useState(false);
    const { data,  total, pagina, paginas,loading } = useSelector(state => state.producto)    
    const [indicador, setindicador] = useState(0);
    const [parametro, setparametro] = useState("");

    const chargeDatas = (page,num) =>{  
        let iok={
            page:page,
            num:num,
            prop:"nombre",
            parametro:""
        }      
        dispatch(productosData(iok))         
    }  

    const chargeData = (page,num) =>{
        if(page > 0){
            let iok={
                page:page,
                num:num,
                prop:"nombre",
                parametro:""
            }      
            dispatch(productosData(iok))                   
        }        
    } 
    const setIndicador = (pky) => {            
        let iok = pky === indicador  ? 0 : pky
        setindicador(iok)
      };
    useEffect(() => {
        chargeDatas(1,12)
        dispatch(dependencias())
        return () => {
            //*cleanup
        };
    }, []);
     
    const editar = () =>{
        dispatch(resetItem())
        if(indicador !==0){
           dispatch(productoItem({id:indicador,tip:"unit"}))
            navigate('/admin/inventario/productos/new');
        }else{
            navigate('/admin/inventario/productos/new');
        }        
    }

    const toggleModalView = () => {            
        if(indicador !== 0){
            setShowModal(true)
            dispatch(productoItem({id:indicador,tip:"unit"}))
        }                 
    };  

    const deleteItem = () =>{
        if(indicador !== 0 ){
            dispatch(productosDelete({productoId:indicador}))
        }
    }
    
    const submitSearch = event =>{
        event.preventDefault()
        let iok={
            page:1,
            num:14,
            prop:"nombre",
            parametro:parametro
        }      
        dispatch(productosData(iok))  
    }
    
    const handleDelete = () =>{
        setparametro("")
        chargeData(1,14)

    }
    
    return ( 
        <>
        <div className="h-550 w-full flex-col border border-gray-300">              
            <div className='h-12 w-full bg-gray-200 flex items-center'>
                <div className="w-2/6 flex items-center pl-1">
                    <div 
                    onClick={()=> indicador > 0 ? null : editar(indicador)}
                    className={indicador > 0 ? "h-8 w-10 text-center bg-red-300 border-r border-gray-50 flex items-center justify-center rounded-l" :
                    "h-8 w-10 text-center bg-red-500 hover:bg-red-400 border-r border-gray-50 flex items-center justify-center rounded-l"}>
                    <PlusIcon className="h-5 w-5 text-gray-50" />
                    </div>
                    <div 
                    onClick={()=> indicador > 0 ? editar(indicador) : null}
                    className={indicador === 0 ? "h-8 w-10 text-center bg-sky-300 border-r border-gray-50 flex items-center justify-center" :"h-8 w-10 text-center bg-sky-500 hover:bg-sky-400 border-r border-gray-50 flex items-center justify-center"}>                        
                    <PencilIcon className="h-5 w-5 text-gray-50"  />
                    </div>                    
                    <div 
                    onClick={()=> indicador > 0 ? deleteItem() : null}                    
                    className={indicador === 0 ? "h-8 w-10 text-center bg-sky-300 border-r border-gray-50 flex items-center justify-center" :"h-8 w-10 text-center  bg-sky-500 hover:bg-sky-400 border-r border-gray-50 flex items-center justify-center"}>
                    <TrashIcon className="h-5 w-5 text-gray-50" />
                    </div>
                    <div 
                    onClick={()=> indicador > 0 ? toggleModalView() : null}                                        
                    className={indicador === 0 ? "h-8 w-10 text-center bg-sky-300 rounded-r flex items-center justify-center" :"h-8 w-10 text-center bg-sky-500 hover:bg-sky-400 rounded-r flex items-center justify-center"}>
                    <DocumentTextIcon className="h-5 w-5 text-gray-50" />
                    </div> 
                </div>
    
             
                <div className="w-2/6"></div>
                <div className="w-2/6 flex justify-center pr-1">               
                    <form  onSubmit={ submitSearch } className="w-full flex">
                      <div className="border flex w-full bg-white">
                        <input 
                        type="text" 
                        name="parametro" 
                        value={parametro || ''} 
                        onChange={(e) => setparametro(e.target.value)} 
                        className="w-full h-8 text-[13px] text-gray-600 border-none focus:ring-0 bg-none"/>                                                                                                          
                            <button   
                                onClick={() => handleDelete()}
                                type="button"                    
                                className="h-8 w-7 border z-10 border-transparent shadow-sm text-[12px] font-medium rounded-full text-gray-600">
                                <XMarkIcon className={parametro ? "h-6 w-6 text-red-500" :"h-6 w-6 text-white" }/>                
                            </button>
                            <button                                   
                                type="submit"
                                className="h-8 w-7 border z-10 border-transparent shadow-sm text-[12px] font-medium rounded-full text-gray-600">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
                            </button>                           
                        </div>                        
                    </form> 
                </div>
            </div>  

            <div className='h-500 w-full flex-col'>
                <div className="">
                <TableProducto
                    data={data}
                    setIndicador={setIndicador}
                    indicador={indicador}
                /> 
                </div>
                <div className="p-1">
               <Pagination
               makeHttpRequestWithPage={ chargeData}
               total={total}
               paginas={paginas}
               pagina={pagina}
               num={12}
               />
            </div>                                                                        
                
            </div> 
            
        </div>        
        <ProductoItem showModal={showModal} setShowModal={setShowModal}/>
        <Loading loading={loading}/>
      </>
     
     );
}
 
export default ProductosView;