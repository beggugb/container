import React,{ useEffect} from "react";
import { useSelector, useDispatch} from 'react-redux'
import { inventarioActions } from '../../../../../redux/actions/inventario'
import Pagination from '../../../../../components/Pagination'
import FormSearch from "../../../../../components/Forms/SearchCompuesto"
import TableCompras from "../Tables/TableCompras"
import { useNavigate} from 'react-router-dom'
import { mCompra  } from '../../../../../data/dataLoad'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport, faPlus, faCheck, faCopy, faTrash, faFilePdf } from "@fortawesome/free-solid-svg-icons";

const ComprasInicio = ({setShowModal}) =>{
    const dispatch = useDispatch()  
    let navigate = useNavigate();
    const { data, total, pagina, paginas,indicador, indicadorTotal, indicadorEstado, modalView, modalViews } = useSelector(state => state.compra)    
    
    let user = JSON.parse(localStorage.getItem('@usuarioFitt'))
    
    console.log(data)
    const setIndicador = (pky,est,total) => {            
        let iok = pky === indicador  ? 0 : pky        
        dispatch({type:'compraIndicador',response:iok,estado:est,total:total}) 
    };
  
    const toggleModalView = () => {            
        if(indicador !== 0){
            setShowModal(true)
            dispatch( inventarioActions.getItem('compraAdd','compras',indicador))
        }                 
    };  

    const toggleModalViews = () => {                 
        if(indicador !== 0){
            setShowModal(true)
            dispatch( inventarioActions.getItem('compraAdd','compras',indicador))
        }                 
    };
    const editar = () =>{
        if(indicador !==0){
            dispatch( inventarioActions.getItem('compraAdd','compras',indicador))
            navigate('/admin/adquisiciones/compras/new');
        }        
    }
    /*plan, nroPagos, contado, banco, inicial, cuota, total, usuarioId */
    const aprobarItem = (plan,cuota) =>{                
        if(indicador !== 0){
            let iok={ 
                id: indicador,
                plan: plan,
                nroPagos: cuota,
                contado: true,
                banco: true,
                inicial: 0,
                cuota: cuota,
                total: indicadorTotal
            }
                             
            dispatch( inventarioActions.putAprobar('comprasData','compras',iok,'unit'))            
        }               
    }

    const deleteItem = () =>{
        if(indicador !== 0 ){
            dispatch( inventarioActions.dDelete('comprasData','compras',indicador))
        }
    }

    const submitHandle = ()=>{                
        if(indicador !==0){
                dispatch( inventarioActions.getItem('compraAdd','compras',indicador))
                navigate('/admin/compras/nuevo');            
        }
        else{
            let dok={
                usuarioId: user.id
            }
            dispatch( inventarioActions.postAdd('comprasData','compras',dok,'unit'))        
        }        
    }

    const chargeDatas = (page,num) =>{
        dispatch( inventarioActions.getData('comprasData','compras',page,num,'id','desc'))
    }  

    const chargeData = (page,num) =>{
        if(page > 0){
            dispatch( inventarioActions.getData('comprasData','compras',page,num,'id','desc'))
        }        
    }  

    useEffect(() => {
        chargeDatas(1,12)
        return () => {
            //*cleanup
        };
    }, []);

    return(
        <div className="h-550 flex-1"> 
        <div className="h-9 flex flex-row border-gray-100">
            <div className=" w-1/2 p-1 flex-row flex">
                <div 
                    onClick={()=> submitHandle()}
                    className="h-6 w-10 shadow-md text-center rounded bg-sky-400 hover:bg-sky-300 mr-1">                        
                    <FontAwesomeIcon icon={faPlus} color="#fff" size="sm"/>
                </div>
                <div 
                onClick={()=> editar()}
                className={indicador === 0  || indicadorEstado === 'aprobado'? "h-6 w-10 shadow-md text-center rounded bg-sky-200 mr-1 cursor-not-allowed" :
                "w-10 shadow-md text-center rounded bg-sky-400 mr-1 hover:bg-sky-300"}>                        
                <FontAwesomeIcon icon={faFileExport} color="#fff" size="sm"/>
                </div>
                <div 
                    onClick={()=> deleteItem()}
                    className={indicador === 0 || indicadorEstado === 'aprobado' ? "h-6 w-10 shadow-md text-center rounded bg-sky-200 mr-1 cursor-not-allowed" :
                    "w-10 shadow-md text-center rounded bg-sky-400 mr-1 hover:bg-sky-300"}>
                    <FontAwesomeIcon icon={faTrash} color="#fff" size="sm"/>
                </div>                
                <div 
                    onClick={()=> aprobarItem()}
                    className={indicador === 0 || indicadorEstado === 'aprobado' ? "h-6 w-10 shadow-md text-center rounded bg-sky-200 mr-1 cursor-not-allowed" :
                    "w-10 shadow-md text-center rounded bg-sky-400 mr-1 hover:bg-sky-300"}>
                    <FontAwesomeIcon icon={faCheck} color="#fff" size="sm"/>
                </div>                
                <div 
                onClick={()=> toggleModalViews()}
                className={indicador === 0 || indicadorEstado === 'pendiente' ? 
                 "h-6 w-10 shadow-md text-center rounded bg-sky-200 mr-1 opacity-50 cursor-not-allowed" 
                :"h-6 w-10 shadow-md text-center rounded bg-sky-400 mr-1 hover:bg-sky-300"}>
                <FontAwesomeIcon icon={faFilePdf}  color="#fff" size="sm"/>
                </div>                    
            </div>
            <FormSearch
                xredux={'comprasData'}
                payload={'compras'}
                items={mCompra}
                inicial={'observaciones'}
            /> 
           
        </div>         

        <div className="p-1">
            <TableCompras
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
               pagina={pagina}
               num={12}
               />
            </div>  
    </div>

    )
}    

export default ComprasInicio