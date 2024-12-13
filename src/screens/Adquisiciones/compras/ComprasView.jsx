import React,{ useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate} from 'react-router-dom'
import { comprasList, comprasItem, comprasCreate, comprasData, comprasDelete,resetItem, comprasUpdates } from '../../../reducers/slices/compraSlice'
import { proveedoresItems } from '../../../reducers/slices/proveedorSlice'
import TableCompras from "./components/Tables/TableCompras"
import { PencilIcon, DocumentTextIcon, PlusIcon, TrashIcon, CheckIcon, XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Loading from '../../../components/snippets/Loading'
import CompraModel from "./components/View/CompraView"

const ComprasView= () => {
    const dispatch = useDispatch()  
    let navigate = useNavigate();
    const {data, total ,pagina, paginas, loading, item }= useSelector(state => state.compra)       
    const [parametro, setparametro] = useState();
    const [prop, setprop] = useState("observaciones");
    const [indicador, setindicador] = useState(-1);
    const [indicadorEstado, setindicadorEstado] = useState("pendiente");
    const [indicadorTotal, setindicadorTotal] = useState(0);
    const [view, setview] = useState(false);
    let us = JSON.parse(localStorage.getItem('@usuarioFitt'))
    

    const chargeDatas = (page,num) =>{
      let iok ={
        page:page,
        num:num,        
        parametro:""
      }
      dispatch(comprasData(iok))
      dispatch(proveedoresItems())
  }
    
    useEffect(() => {
      chargeDatas(1,14)
      return () => {
          //*cleanup
      };
  }, []);


  const editar = () =>{    
    if(indicador > 0){
        let iok={
          id:indicador,
          compraId:indicador,
          tip:"unit"
        }
        dispatch(comprasItem(iok))
        navigate('/admin/adquisiciones/compras/new');
    }        
  }
  const aprobarItem = () =>{                
      if(indicador > 0){
        dispatch(comprasUpdates({id:indicador,tip:"list",compraId:indicador}))
        setindicador(-1)
      }               
  }

  const deleteItem = () =>{
      if(indicador > 0 ){        
        dispatch(comprasDelete({compraId:indicador}))
        setindicador(-1)
      }
  }

  const submitHandle = ()=>{                
    if(indicador < 0)
    {
        dispatch(comprasCreate({usuarioId:us.id}))
    }
  }

  
  const toggleModalViews = () => {          
    if(indicador > 0){
      let iok={
        id:indicador,
        compraId:indicador,
        tip:"list"
      }
      dispatch(comprasList(iok))
      setview(true)  
    }                 
  };

  const handleDeletes = () =>{
    setparametro("")
    let iok ={
      page:1,
      num :14,        
      parametro:""
    }
    dispatch(comprasData(iok))
  }
  const submitSearch = event =>{
    event.preventDefault() 
    let iok ={
      page:1,
      num :14,        
      parametro:parametro
    }
    dispatch(comprasData(iok))
  }

  const setInndicador = (pky,est,total) =>{    
    let iok = -1    
    let iot = 0
    if(pky !== indicador){
      iok = pky      
      iot = total
    }
    setindicador(iok)
    setindicadorEstado(est)
    setindicadorTotal(iot)
  }
  

    return ( 
        <>
        <div className="h-600 p-1 w-full">   
            <div className='h-12 w-full flex bg-gray-300'>
              <div className="w-1/2 flex items-center justify-start pl-2">
                  <div 
                        onClick={()=> indicador > 0 ? null : submitHandle() }
                        className={indicador > 0 ? "h-8 w-10 text-center bg-sky-200  flex items-center justify-center rounded-l mr-1" :
                        "h-8 w-10 text-center bg-red-400 hover:bg-red-300 flex items-center justify-center rounded-l mr-1"}>
                        <PlusIcon className="h-5 text-gray-50"/>
                    </div>
                    <div 
                    onClick={()=> indicador < 0  || indicadorEstado === 'aprobado' ? null : editar()}                
                    className={indicador < 0  || indicadorEstado === 'aprobado'? "h-8 w-10 text-center bg-sky-200 flex items-center justify-center mr-1" :
                    "h-8 w-10 text-center bg-sky-400 hover:bg-sky-300 flex items-center justify-center mr-1"}>                        
                    <PencilIcon className="h-5 text-gray-50"/>
                    </div>
                    <div 
                        onClick={()=> indicador < 0  || indicadorEstado === 'aprobado' ? null : deleteItem()}                      
                        className={indicador < 0 || indicadorEstado === 'aprobado' ? "h-8 w-10 text-center bg-sky-200 mr-1 flex items-center justify-center" :
                        "h-8 w-10 text-center bg-sky-400 hover:bg-sky-300 mr-1 flex items-center justify-center"}>
                        <TrashIcon className="h-5 text-gray-50"/>
                    </div>                
                    <div 
                        onClick={()=> indicador < 0  || indicadorEstado === 'aprobado' ? null : aprobarItem()}                                          
                        className={indicador < 0 || indicadorEstado === 'aprobado' ? "h-8 w-10 text-center bg-sky-200 mr-1 flex items-center justify-center" :
                        "h-8 w-10 text-center bg-sky-400 hover:bg-sky-300 mr-1 flex items-center justify-center"}>
                        <CheckIcon className="h-5 text-gray-50"/>   
                    </div>                
                    <div 
                    onClick={()=> indicador > 0 && indicadorEstado === 'aprobado' ? toggleModalViews():null}
                    className={indicador > 0 && indicadorEstado === 'aprobado' ? 
                    "h-8 w-10 text-center bg-sky-400 rounded-r flex items-center justify-center" 
                    :"h-8 w-10 text-center bg-sky-200 hover:bg-sky-300 rounded-r flex items-center justify-center"}>
                    <DocumentTextIcon className="h-5 text-gray-50"/>                    
                    </div> 
              </div>
              <div className="w-1/2 flex">
              <form onSubmit={submitSearch} className="rounded w-full flex text-[12px]  items-center justify-center pl-2 pr-2">                
                <div className="h-10 w-full flex items-center">                    
                    <input
                        type="text" 
                        name="value" 
                        value={parametro || ''} 
                        onChange={(e) => setparametro(e.target.value)} 
                        className="w-full h-8 text-gray-600 border-none focus:ring-0 text-[12px]"/>                                                   
                    <button
                        onClick={() => handleDeletes()}
                        type="button"
                        className={parametro ? "h-8 w-10 -ml-20 z-10 text-[12px] text-red-400":"h-8 w-10 -ml-20 z-10 text-[12px] text-white" }>
                        <XMarkIcon className="h-5 w-5"/>
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
            <div className='w-full flex flex-col'>
            <TableCompras
                  data={data}
                  pagina={pagina}
                  paginas={paginas}
                  total={total}
                  setindicador={setInndicador}
                  indicador={indicador}
                /> 
            </div>   
        </div>   
        <CompraModel view={view} setview={setview}/>
        <Loading loading={loading}/>                    
      </>
     
     );
}
 
export default ComprasView;