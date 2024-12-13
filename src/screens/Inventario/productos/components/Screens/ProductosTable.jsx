import React,{ useEffect} from "react";
import { useSelector, useDispatch} from 'react-redux'
import { inventarioActions } from '../../../../../redux/actions/inventario'
import Pagination from '../../../../../components/Pagination'
import TableProducto from "../Tables/TableProducto";
import FormSearch from "../../../../../components/Forms/SearchParametros"
import { useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport, faPlus, faCopy, faTrash, faFilePdf } from "@fortawesome/free-solid-svg-icons";



const ProductosTable = ({setShowModal}) =>{
    const dispatch = useDispatch()  
    let navigate = useNavigate();        
    const { data,  total, pagina, paginas,indicador, modalView } = useSelector(state => state.producto)    

    const chargeData = (page,num) =>{
        dispatch(inventarioActions.getData('productosData','productos',page,num,'nombre','ASC'))
    }  
    const setIndicador = (pky) => {            
        let iok = pky === indicador  ? 0 : pky
        dispatch({type:'productoIndicador',response:iok}) 
      };
    useEffect(() => {
        chargeData(1,12)
        return () => {
            //*cleanup
        };
    }, []);
     
    const editar = () =>{
        if(indicador !==0){
            dispatch(inventarioActions.getItem('productoAdd','productos',indicador))
            navigate('/admin/inventario/productos/new');
        }else{
            navigate('/admin/inventario/productos/new');
        }        
    }

    const toggleModalView = () => {            
        if(indicador !== 0){
            setShowModal(true)
            dispatch(inventarioActions.getItem('productoAdd','productos',indicador))
        }                 
    };  
    
    const copyItem = () =>{
        if(indicador !== 0){
            dispatch(inventarioActions.getCopy('productosData','productos',indicador))
        }        
    }

    const deleteItem = () =>{
        if(indicador !== 0 ){
            dispatch(inventarioActions.dDelete('productosData','productos',indicador))
        }
    } 
   
    return(
        <div className="h-2/4 flex-1 mx-auto"> 
            <div className="h-9 border flex flex-row border-gray-100">
                <div className=" w-3/4 flex-row flex">
                    <div 
                        onClick={()=> editar(indicador)}
                        className="h-6 w-10 shadow-md text-center rounded bg-sky-400 hover:bg-sky-300 mr-1">                        
                        <FontAwesomeIcon icon={faPlus} color="#fff" size="sm"/>
                    </div>
                    <div 
                    onClick={()=> editar(indicador)}
                    className={indicador === 0 ? "h-6 w-10 shadow-md text-center rounded bg-sky-200 mr-1" :"h-6 w-10 shadow-md text-center rounded bg-sky-400 hover:bg-sky-300 mr-1"}>                        
                    <FontAwesomeIcon icon={faFileExport} color="#fff" size="sm"/>
                    </div>
                    <div 
                    onClick={()=> copyItem()}
                    className={indicador === 0 ? "h-6 w-10 shadow-md text-center rounded bg-sky-200 mr-1" :"h-6 w-10 shadow-md text-center rounded bg-sky-400 hover:bg-sky-300 mr-1"}>
                    <FontAwesomeIcon icon={faCopy} color="#fff" size="sm"/>
                    </div>
                    <div 
                    onClick={()=> deleteItem()}
                    className={indicador === 0 ? "h-6 w-10 shadow-md text-center rounded bg-sky-200 mr-1" :"h-6 w-10 shadow-md text-center rounded bg-sky-400 hover:bg-sky-300 mr-1"}>
                    <FontAwesomeIcon icon={faTrash} color="#fff" size="sm"/>
                    </div>
                    <div 
                    onClick={()=> toggleModalView()}
                    className={indicador === 0 ? "h-6 w-10 shadow-md text-center rounded bg-sky-200 mr-1" :"h-6 w-10 shadow-md text-center rounded bg-sky-400 hover:bg-sky-300 mr-1"}>
                    <FontAwesomeIcon icon={faFilePdf}  color="#fff" size="sm"/>
                    </div>                    
                </div>
                <FormSearch
                xredux={'productosData'}
                payload={'productos'}
                inicial={'nombre'}
                />
            </div>         

            <div className="border-t">
                <TableProducto
                    data={data}
                    setIndicador={setIndicador}
                    indicador={indicador}
                />            
            </div>  
            <div className="h-12 border-r border-l border-b border-gray-300 p-3 rounded-b-lg">
               <Pagination
               makeHttpRequestWithPage={ chargeData}
               total={total}
               paginas={paginas}
               current={pagina}
               pagina={12}
               />            
            </div>   
        </div>
    )
}

export default ProductosTable