import React,{useRef, useState} from "react";
import { useSelector, useDispatch} from 'react-redux'
import { useReactToPrint } from 'react-to-print';
import { nombreEmpresa } from '../../../helpers/data'
import { notasCreate } from '../../../reducers/slices/notaSlice'
import { QRCodeSVG } from "qrcode.react";
import Moment from 'react-moment'

const ComponentToPrint = React.forwardRef((props,ref)=>{    
    const fechaHoy = new Date()        
    return(
        <div ref={ref} className="pl-4 pr-4 text-[12px] text-gray-600 w-full"> 
            <div className="p-3 flex flex-row justify-center text-[11px]">
            <div className="h-650 w-full p-2 justify-center items-center"> 
                <div className="w-full rounded-md ">     

                   <div className="h-7 flex flex-row">
                       <h5 className="w-1/2 text-left p-1 font-bold text-sm">{nombreEmpresa}</h5>  
                       <h5 className="w-1/2 text-right p-1 text-[11px] italic">Fecha emisión : <Moment format="DD/MM/YYYY - HH:mm">{ fechaHoy }</Moment></h5>  
                   </div>

                   <div className="h-9 border-b text-center mt-9">
                       <h6 className="text-sm font-bold">Recibo de Ingreso # <b>{props.pnota.id}</b></h6>                                               
                   </div>
                   <div className="mt-1 border-b border-t border-gray-400 border-dashed items-center text-[12px] p-1">                                                                                                   
                    <div className='w-full flex border-b'>
                        <p className="h-6 w-3/12 text-start pl-2 text-gray-500 ">Nombre:  </p>
                        <p className="h-6 w-9/12 text-start pl-2 text-gray-500 ">{props.pitem.nombres}</p> 
                    </div>
                    <div className='w-full flex border-b'>
                        <p className="h-6 w-3/12 text-start pl-2 text-gray-500 ">Nit: </p>
                        <p className="h-6 w-9/12 text-start pl-2 text-gray-500 ">{props.pitem.nit}</p> 
                    </div>
                    <div className='w-full flex border-b'>
                        <p className="h-6 w-3/12 text-start pl-2 text-gray-500 ">Detalle: </p>
                        <p className="h-6 w-9/12 text-start pl-2 text-gray-500 ">{props.pmembresia.npaquete}</p> 
                    </div>
                    <div className='w-full flex border-b'>
                        <p className="h-6 w-3/12 text-start pl-2 text-gray-500 ">Vigencia: </p>
                        <p className="h-6 w-9/12 text-start pl-2 text-gray-500 ">
                          <Moment format="l">{props.pmembresia.ivigencia}</Moment>  -
                          <Moment format="l">{props.pmembresia.fvigencia}</Moment>  
                        </p> 
                    </div>
                                                       
                </div>
                { props.pdata.length > 0 ?  
                <div className='h-430 mt-1 flex-col overflow-auto'>
                        <div className='h-max flex-col w-full text-[12px] text-gray-600'>
                            <div className='border-t border-l border-r border-gray-300 bg-gray-200 flex font-bold items-center'>
                                <h6 className='h-7 w-9/12 flex items-center pl-2'>Membresia</h6>
                                <h6 className='h-7 w-3/12 flex items-center'>SubTotal</h6>
                            </div>
                            {props.pdata.map((itt,index)=>(                            
                                <div key={index} className='border-t flex-col border-gray-300'>
                                    <div className='h-5 flex w-full pl-1 font-bold'>
                                    {props.pmembresia.npaquete}
                                    </div>
                                    <div className='h-5 flex w-full pl-1  italic'>
                                    <span className='w-9/12'>
                                    {new Intl.NumberFormat('es-BO',{style: "currency",currency:"BOB",minimumFractionDigits: 2}).format(itt.importe)}
                                    </span>
                                    <span className='w-3/12'>                                    
                                    {new Intl.NumberFormat('es-BO',{style: "currency",currency:"BOB",minimumFractionDigits: 2}).format(itt.importe)}    
                                    </span>
                                    </div>
                                </div> 
                            ))}  

                            <div className='border-t-4 border-gray-300 flex items-center italic'>
                                
                            </div>                           
                            <div className='mt-1 border-t border-gray-300 bg-gray-200 flex font-bold items-center italic'>
                                <h6 className='h-5 w-9/12 flex items-center pl-2'>Total</h6>
                                <h6 className='h-5 w-3/12 flex items-center'>
                                {new Intl.NumberFormat('es-BO',{style: "currency",currency:"BOB",minimumFractionDigits: 2}).format(props.pnota.monto)}
                                </h6>
                            </div>

                        </div> 
                        <div className='mt-2 p-1 flex items-center justify-center'>
                            <QRCodeSVG 
                            value={props.pnota.id} 
                            style={{  width: 60, height: 60,padding:2, border: 'solid 1px #c1c1c1', marginRight: 5 }}
                            />   
                            </div>
                            <div className='flex mt-2 text-[8px] text-stone-500'>
                                <h5 className="w-2/3 text-left pl-1 italic">fecha emisión : <Moment format="DD/MM/YYYY">{ props.pnota.createdAt }</Moment></h5>   
                                <h5 className="w-1/3 text-right pr-1 italic">user : { props.puser.username }</h5>            
                        </div> 
                </div>
                : null}   

              
                </div>                     
            </div>    
        </div>
    </div>  
    )
})


const MembresiaPagar = ({view,setview}) =>{
    const dispatch = useDispatch()
    const clienteItem = useSelector(state => state.cliente.item)    
    const {item, plan, viewRecibo } = useSelector(state => state.nota)  
    const membresiaItem  = useSelector(state => state.membresia.item)    


    const [ingresado, setingresado] = useState(0);    
    const [cambio, setcambio] = useState(0);
    const [ptipo,setptipo] = useState('efectivo');

    let user = JSON.parse(localStorage.getItem('@usuarioFitt')) 
    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });
    
    const submitHandle = () => {   

        let dato ={
             id        : plan[0].id,
             notaId    : item.id,
             importe   : parseFloat(item.monto),
             usuarioId : user.id, 
             cliente   : clienteItem.nombres,
             clienteId : clienteItem.id,
             membresia : membresiaItem.npaquete,
             usuario   : user.nombre,    
             vigencia  : membresiaItem.fvigencia, 
             tipo      : ptipo,	
             planId    : plan[0].id,
        }        
        dispatch(notasCreate(dato))

        
        handlePrint()   
        setview(false)                  
        setingresado(0)
        setcambio(0)
    }   

    const calcular = (val) => {
        setingresado(val)
        let cc = parseFloat(val) - parseFloat(item.monto)  
        let suma = val > 0 && cc > 0 ?  parseFloat(val) - parseFloat(item.monto)   : 0
        setcambio(suma)
    }

    const handleDeb = () =>{        
        let aa = parseFloat(ingresado) > 0 ? ingresado : ""        
        setingresado(aa)
     }
 
    const handleDebs = () =>{        
        let aa = parseFloat(ingresado) < 0 || parseFloat(ingresado) === "" ? 0 : ingresado
        setingresado(aa)
      }


  
    return(
    <>
    { view ?
        <>
        <div className="justify-center items-center flex-1 fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-3 mx-auto max-w-3xl flex-row justify-between">
                <div className="h-550 border-4 bg-white rounded relative flex flex-col  w-full outline-none focus:outline-none">
                   <div className='h-10 border-b bg-gradient-to-b from-stone-100 to-gray-200 flex  rounded-t  items-center justify-between pr-2 pl-2'>
                   </div>
                   <div className='mt-1 w-full flex justify-center'>
                      <div className='h-500 w-1/2 flex p-2' >
                          <div className="h-full border-2 w-full">
                          <ComponentToPrint
                                ref={componentRef}  
                                pitem={clienteItem}
                                pmembresia={membresiaItem}
                                pnota={item}
                                pdata={plan}
                                puser={user}
                            />  
                          </div>  
                      </div>                        
                      <div className='h-500 w-1/2  flex p-2' >
                        <div className="h-full border-2 w-full p-2">

                        <div className='mt-4 border w-full rounded p-2'>                                                               
                            <div className="w-full flex items-center justify-center">
                                <label className="h-8 text-[13px] w-2/5 p-2 block text-gray-500 tracking-wide text-grey-darker font-bold ">
                                    Total :
                                </label>
                                <div className="border rounded border-gray-300 w-3/5" >
                                    <input                                     
                                        id="total" 
                                        name="total"
                                        type="text" 
                                        value={item.monto || 0}
                                        onChange={(e)=>{ ingresado(e.target.value)}} 
                                        readOnly={true}
                                        className="h-8 bg-slate-200 text-[13px] w-full text-gray-500 p-2 border-none focus:ring-0" 
                                    />
                                </div>                                
                            </div>

                            <div className="mt-2 w-full flex items-center justify-center">
                                <label htmlFor="ptipo" className='w-2/5 pl-2 text-[13px] text-gray-500 font-bold'>Forma Pago :</label>
                                <div className='h-9 w-3/5 flex items-center justify-center p-1'>
                                    <button className={ptipo === 'efectivo' ? 'h-7 bg-sky-500 rounded-l w-1/2 flex justify-center items-center text-gray-100 font-bold':'h-7 bg-gray-200 rounded-l w-1/2 flex justify-center items-center text-gray-500' }
                                    type='button'
                                    onClick={()=>{setptipo('efectivo')}}
                                    >
                                    Efectivo  
                                    </button>
                                    <button className={ptipo === 'qr' ? 'h-7 bg-sky-500 rounded-r w-1/2 flex text-gray-100 font-bold justify-center items-center':'h-7 bg-gray-200 justify-center items-center rounded-r w-1/2 flex text-gray-500' }
                                    type='button'
                                    onClick={()=>{setptipo('qr')}}
                                    >
                                    QR
                                    </button>
                                </div>
                            </div>



                            <div className="w-full flex items-center justify-center mt-2">
                                <label className="h-8 text-[13px] w-2/5 p-2 block text-gray-500 tracking-wide text-grey-darker font-bold ">
                                    Ingresado :
                                </label>
                                <div className="border rounded border-gray-300 w-3/5 " >
                                    <input                                     
                                        id="ingresado" 
                                        name="ingresado"
                                        type="text" 
                                        value={ingresado}
                                        onChange={(e)=>{ calcular(e.target.value)}}      
                                        onFocus={()=>handleDeb()}  
                                        onBlur={()=>handleDebs()}                                   
                                        className="h-8 bg-white text-[13px] w-full text-gray-500 p-2 border-none focus:ring-0 hover:bg-slate-300" 
                                    />
                                </div>                                 
                            </div>

                            <div className="w-full flex items-center justify-center mt-2">
                                <label className="h-8 text-[13px] w-2/5 p-2 block text-gray-500 tracking-wide text-grey-darker font-bold ">
                                    Cambio :
                                </label>
                                <div className="border rounded border-gray-300 w-3/5 " >
                                <input                                     
                                    id="cambio" 
                                    name="cambio"
                                    type="text" 
                                    value={parseFloat(cambio)}
                                    readOnly={true}
                                    className="h-8 bg-slate-200 text-[13px] w-full text-gray-500 p-2 border-none focus:ring-0 " 
                                    />
                                </div> 
                            </div>

                            <div className="h-14 mt-8 w-full flex items-center justify-center">       
                                <button
                                    className={parseFloat(ingresado) >= parseFloat(item.monto) ?"w-40 h-14 text-[13px] font-bold  bg-green-600 text-white rounded-l" :"w-40 h-14 bg-green-50 text-[13px] font-bold text-gray-300 rounded-l cursor-not-allowed"}
                                    onClick={() => parseFloat(ingresado) >= parseFloat(item.monto) ? submitHandle() : null}
                                    type="button">
                                    Pagar                                
                                </button>
                                <button
                                    className="w-40 h-14 bg-red-400 text-white rounded-r text-[13px] font-bold"
                                    onClick={()=> setview(false)}
                                    type="button">
                                    Cancelar
                                </button>                                
                            </div>

                        </div> 


                        </div>                        
                      </div>                        
                   </div>                                   
                </div>        
            </div>        
        </div>  
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>        
        </>
        : null  }
        </>        
    );

}

export default MembresiaPagar