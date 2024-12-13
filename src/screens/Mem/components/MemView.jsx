import React,{useEffect, useRef} from "react";
import { useSelector, useDispatch} from 'react-redux'
import { useReactToPrint } from 'react-to-print';
import { nombreEmpresa } from '../../../helpers/data'
import Moment from 'react-moment'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ComponentToPrint = React.forwardRef((props,ref)=>{    
    const fechaHoy = new Date()        
    return(
    <div ref={ref}>
        <div className="p-3 flex flex-row justify-center text-[11px]">
            <div className="h-650 w-full p-2 justify-center items-center"> 
                <div className="w-full rounded-md ">     

                   <div className="h-7 flex flex-row">
                       <h5 className="w-1/2 text-left p-1 font-bold text-sm">{nombreEmpresa}</h5>  
                       <h5 className="w-1/2 text-right p-1 text-[11px] italic">Fecha emisión : <Moment format="DD/MM/YYYY - HH:mm">{ fechaHoy }</Moment></h5>  
                   </div>

                   <div className="h-9 border-b text-center mt-9">
                       <h6 className="text-sm font-bold">Kardex Cliente # <b>{props.item.id}</b></h6>                                               
                   </div>

                   <div className="border rounded p-1 mt-2">

                    <div className="border-b flex h-7 pt-1">                        
                        <p className="w-1/6  pl-1 font-bold">
                            Nombres :
                        </p>
                        <p className="w-5/6 pl-1">
                        { props.item.nombres }
                        </p>
                    </div>
                    <div className="border-b flex h-7 pt-1">
                        <p className="w-1/6 pl-1 font-bold">
                            Código :
                        </p>
                        <p className="w-2/6 pl-1">
                        { props.item.id}
                        </p>
                        <p className="w-1/6  pl-1 font-bold">
                            Teléfono :
                        </p>
                        <p className="w-2/6 pl-1">
                        { props.item.telefono }
                        </p>
                    </div>

                    <div className="border-b flex h-7 pt-1">
                        <p className="w-1/6 pl-1 font-bold">
                            Tipo :
                        </p>
                        <p className="w-2/6 pl-1">
                        { props.item.tipo}
                        </p>
                        <p className="w-1/6  pl-1 font-bold">
                            F.Registro :
                        </p>
                        <p className="w-2/6 pl-1">
                        <Moment format="DD-MM-YYYY">{props.item.createdAt}</Moment>
                        </p>
                    </div>

                    <div className="border-b flex h-7 pt-1">
                        <p className="w-1/6 pl-1 font-bold">
                            País :
                        </p>
                        <p className="w-2/6 pl-1">
                        { props.item.pais}
                        </p>
                        <p className="w-1/6 pl-1 font-bold">
                            Género :
                        </p>
                        <p className="w-2/6 pl-1">
                        { props.item.sexo}
                        </p>
                    </div>

                   </div>   
                    <h5 className="mt-6 ml-1 text-xs font-bold text-stone-600">Membresias</h5>
                   <div className="border rounded p-1 mt-1">
                        <table className="border-collapse table-fixed text-[11px]">
                            <thead>
                                <tr className="border border-slate-300 bg-gray-200 text-left h-7">                    
                                <th className="w-2/5 pl-1">Paquete</th>                                  
                                <th className="w-1/5 pl-1">I.Vigencia</th>                    
                                <th className="w-1/5 pl-1">F.Vigencia</th>
                                <th className="w-1/5 pl-1">Estado</th>
                                <th className="w-1/5 pl-1"></th>
                                </tr>
                            </thead>
                            <tbody>
                                { props.items && (
                                    props.items.map(item =>(
                                        <tr key={item.id} className="hover:bg-gray-100 h-7 border">
                                            <td className="pl-1">{item.paquete}</td>
                                            <td className="pl-1">{item.ivigencia}</td>                                                       
                                            <td className="pl-1">{item.fvigencia}</td>           
                                            <td className="pl-1">{item.est}</td>                                
                                        </tr>
                                    ))
                                )
                                }                    
                                
                            </tbody>
                        </table> 
                   </div>                             
                </div>                
            </div>                   
        </div>
    </div>  
    )
})


const ClienteView = ({setShowView}) =>{
    const dispatch = useDispatch()
    const { item  } = useSelector(state => state.cliente)
    const { data  } = useSelector(state => state.membresias)
    let user = JSON.parse(localStorage.getItem('@usuarioFitt')) 
    const componentRef = useRef()

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });

    useEffect(() => {        
        return () => {
            dispatch({type:'clienteReset'})
            dispatch({type:'membresiasRESET'})
        };
    }, []);

    return(
        <>
        <div className="justify-center items-center flex-1 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-3 mx-auto max-w-xl flex-row justify-between">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex flex-row justify-between">                    
                    <button 
                    onClick={handlePrint}
                    className="w-20 h-7 bg-red-500 rounded-md m-1  text-white">Imprimir</button>                           
                    
                    <button 
                        onClick={() => setShowView(false)}
                        className="w-7 h-7 bg-red-500 rounded-full  text-white mt-1 mr-4">
                        <FontAwesomeIcon icon={faTimes} color="#fff" />
                    </button>
                    </div>
                    <ComponentToPrint
                        ref={componentRef}       
                        item={item} 
                        items={data}                        
                        usuario={user} 
                    />                    
              </div>
            </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )

}

export default ClienteView