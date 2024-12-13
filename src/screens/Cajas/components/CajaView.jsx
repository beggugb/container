import React,{useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useReactToPrint } from 'react-to-print';
import { nombreEmpresa } from '../../../helpers/data'
import Moment from 'react-moment';
import { PrinterIcon, XMarkIcon } from "@heroicons/react/24/outline";

const ComponentToPrint = React.forwardRef((props,ref)=>{    
    const fechaHoy = new Date();
    return ( 
        <div ref={ref} className="pl-4 pr-4 text-[12px] text-gray-600 w-full"> 
        <div className="p-2 flex flex-row justify-center text-[11px]">
            <div className="w-full p-2 justify-center items-center flex"> 
                <div className="w-full">  
                    <div className="h-7 flex flex-row">
                       <h5 className="w-1/2 text-left p-1 font-bold uppercase">{nombreEmpresa}</h5>                         
                    </div>

                    <div className="w-full text-center">
                    <p className="pr-2 text-right italic">Fecha emisión : <Moment format="DD/MM/YYYY - HH:mm">{ fechaHoy }</Moment></p>  
                    <p className="pr-2 text-right italic">Usuario : {props.puser.nombre}</p>  
                </div>



                    <div className="h-14 text-center mt-2">
                        <h6 className="font-bold uppercase">Resumen Caja</h6>
                        <h6 className="font-bold">Fecha Caja : <Moment format="DD/MM/YYYY">{ props.pcaja.createdAt }</Moment></h6>
                        <h6 className="font-bold">Fecha Emisión : <Moment format="DD/MM/YYYY">{ fechaHoy }</Moment></h6>
                    </div>

                <div className="">
                    <div className="p-1 flex flex-row justify-center border border-gray-300">
                        <p className="w-2/12 font-bold">Caja Nro:</p>                    
                        <p className="w-4/12 ">{props.pcaja.id}</p>
                        <p className="w-2/12 font-bold">Usuario:</p>                    
                        <p className="w-4/12 ">{props.puser.nombre}</p>                        
                    </div>

                    <div className="p-1 flex flex-row justify-center border-l border-r border-gray-300">
                        <p className="w-2/12 font-bold">Inicial:</p>                    
                        <p className="w-4/12 ">
                        {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(props.pcaja.montoInicial)}
                        </p>
                        <p className="w-2/12 font-bold">Egresos:</p>                    
                        <p className="w-4/12 ">
                        {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(props.pcaja.montoEgreso)}
                        </p>
                       
                    </div>

                    

                    <div className="p-1 flex flex-row justify-center border bg-gray-50 border-gray-300">
                        <p className="w-2/12 font-bold">Ingresos:</p>                    
                        <p className="w-2/12 ">
                        {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(props.pcaja.montoIngreso)}
                        </p>

                        <p className="w-2/12 font-bold">Pagos Efectivo:</p>                    
                        <p className="w-2/12 ">
                        {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(props.pcaja.pagoefectivo)}
                        </p>

                        <p className="w-2/12 font-bold">Pagos QR:</p>                    
                        <p className="w-2/12 ">
                        {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(props.pcaja.pagoqr)}
                        </p>
                        
                    </div>
                    <div className="flex flex-row justify-center border-l border-r border-b border-gray-300">
                        <div className='w-1/2 bg-gray-100 flex items-center'>
                            <p className="h-6 w-2/5 font-bold pl-4 flex items-center">Total General:</p>                    
                            <p className="h-6 w-3/5 pl-4 flex items-center">
                            {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(props.pcaja.montoFinal)}
                            </p>
                        </div>
                        <div className='w-1/2 bg-gray-100 flex items-center'>
                            <p className="h-6 w-2/5 font-bold pl-4 flex items-center">Saldo Efectivo:</p>                    
                            <p className="h-6 w-3/5 pl-4 flex items-center">
                            {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(props.pcaja.saldoefectivo)}
                            </p>
                        </div>
                    </div>
                </div>    

            <div className="mt-1 flex-1 mx-auto"> 
                <table className="w-full text-[11px] font-gray-600">
                    <thead>
                        <tr className='h-7 bg-gradient-to-t from-gray-200 to-gray-100 border border-gray-300'>                    
                        <th className="w-1/12 border-r border-gray-300">#</th>
                        <th className="w-2/12 border-r border-gray-300">Fecha/Hora</th>                                            
                        <th className="w-3/12 border-r border-gray-300">Detalle</th>
                        <th className="w-1/12 border-r border-gray-300">Tipo</th>
                        <th className="w-2/12 border-r border-gray-300">Monto</th>
                        <th className="w-2/12 border-r border-gray-300">Membresia</th>
                        <th className="w-1/12 ">Vigencia</th>                    
                        </tr>
                    </thead>
                    <tbody>
                        { props.data && (
                            props.data.map(item =>(
                                <tr key={item.id} className="hover:bg-gray-100 h-7">
                                    <td className="border text-center">{item.id}</td>  
                                    <td className="border pl-1"><Moment format="DD/MM/YYYY">{item.registro}</Moment> - {item.hora}</td>                                    
                                    <td className="border pl-1">{item.label}</td>    
                                    <td className="border pl-1">{item.tipo}</td>    
                                    <td className="border text-center">{new Intl.NumberFormat('es-BO',{minimumFractionDigits: 2}).format(item.monto)}</td>
                                    <td className="border pl-1">{item.membresia}</td>
                                    <td className="border text-center">
                                     { item.vigencia ? <Moment format="l" >{item.vigencia}</Moment>: "reg. manual"}   
                                    </td>
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
     );
})

const CajaView = ({view,setview }) => {    
    const dispatch = useDispatch()
    const componentRef = useRef();   
    const { item }  = useSelector(state => state.caja)
    const { items } = useSelector(state => state.cajaitems)
    let user = JSON.parse(localStorage.getItem('@usuarioFitt'))    
    
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });
    
     useEffect(() =>{        
         return () =>{            
           /* dispatch({type:'CAJAS_ITEMS_RESET'})
            dispatch({type:'RESET_CAJA'})*/
        };
      }, []);
    return(
        <>
    { view ?
        <>
        <div className="justify-center items-center flex-1 fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-3 mx-auto max-w-2xl flex-row justify-between">
                <div className="h-650  bg-white rounded relative flex flex-col  w-full outline-none focus:outline-none">
                    <div className='h-10 border-b bg-gradient-to-b from-stone-100 to-gray-200 flex  rounded-t  items-center justify-between pr-2 pl-2'>
                    <button
                    onClick={() =>handlePrint()}
                    className='w-8 flex h-7 rounded-lg bg-sky-400 hover:bg-sky-300 justify-center items-center'>
                        <PrinterIcon className="h-5 w-5 text-gray-50" />
                    </button>
                    <button
                    onClick={() =>setview(false)}
                    className='w-8 flex h-7 rounded-lg bg-red-400 hover:bg-red-300 justify-center items-center'>
                        <XMarkIcon className="h-5 w-5 text-gray-50" />
                    </button>
                   </div>
                   <div className='h-610 w-full flex justify-center overflow-y-auto'>
                        <div className='h-max w-full' >
                                <ComponentToPrint
                                ref={componentRef}          
                                puser={user}
                                pcaja={item}
                                data={items}      
                                /> 
                        </div>                        
                   </div>                                   
                </div>        
            </div>        
        </div>  
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    : null  }
    </>  
         )
    }
 
export default CajaView;