import React,{useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useReactToPrint } from 'react-to-print';
import Moment from 'react-moment';
import { PrinterIcon } from "@heroicons/react/24/outline";
import { nombreEmpresa, direccionEmpresa, telefonoEmpresa } from '../../helpers/data'
const ComponentToPrint = React.forwardRef((props,ref)=>{    
    const fechaHoy = new Date();
    return ( 
        <div ref={ref} className="pl-8 pr-8 pt-2 text-[10px] text-gray-500 w-full">            
        
        <div className="h-12 border-b flex border-gray-200 mt-4">
            <div className="w-1/2">
                              
            </div>
            <div className="w-1/2">                    
                <p className="text-right pl-2 font-bold ">{ nombreEmpresa }</p>                
                <p className="text-right pl-2 ">{ direccionEmpresa }</p>
                <p className="text-right pl-2 ">{ telefonoEmpresa }</p>
            </div>
        </div>

        <div className="h-9 text-center mt-2 flex justify-center flex-col">            
            <h6 className='uppercase font-bold' >Informe de Membresias</h6>                                                         
            <h6>
                ( <Moment format="DD/MM/YYYY">{props.pdesde}</Moment> ) - 
                ( <Moment format="DD/MM/YYYY">{props.phasta}</Moment> )
            </h6>
        </div>

        <div className="text-center mt-2 flex text-[11px] border">
            <div className='w-7/12 flex items-center pl-2'>
            <h6 className='h-18 ' >Expresado en : (Bolivianos)</h6>                                             
            </div>
            <div className='w-5/12 flex-col'>
                <div className='h-5 flex items-center'>
                    <div className='w-1/3 flex pl-2 justify-end font-bold'>
                      Total :
                    </div>
                    <div className='w-2/3 flex pl-2'>
                    {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(props.pdetalle)}
                    </div>
                </div>
                <div className='h-5 flex items-center'>
                    <div className='w-1/3 flex pl-2 justify-end font-bold'>
                        Tipo :
                    </div>
                    <div className='w-2/3 flex pl-2'>
                      { props.ptipo === "%" ? "Todos": props.ptipo}  
                    </div>
                </div>
                <div className='h-5 flex items-center'>
                    <div className='w-1/3 flex pl-2 justify-end font-bold'>
                        Usuario :
                    </div>
                    <div className='w-2/3 flex pl-2'>
                      { props.pusu ? props.pusu : "Todos"}  
                    </div>
                </div>
            </div>           
        </div>
        

        <div className='w-full mt-4'>
            <table className='border-collapse w-full text-[10px]'>
                <thead>
                    <tr className='h-7 border bg-gray-100'>                                                 
                        <th className='w-4/12 border'>Nombres</th>           
                        <th className='w-2/12 border'>Paquetes</th>                                                                                         
                        <th className='w-2/12 border'>F.Registro</th>    
                        <th className='w-2/12 border'>Monto</th>
                        <th className='w-1/12 border'>T.Pago</th>
                        <th className='w-1/12 border'>Usuario</th>                        
                    </tr>
                </thead>

                <tbody>
                    { props.pdata.map((it,index)=>(
                        <tr key={index} className='h-7' >                            
                            <td className="border pl-1 truncate">{it.cliente ? it.cliente : 'n'}</td>                              
                            <td className="border pl-1">{it.paquete ? it.paquete : 'n'}</td>
                            <td className='border text-center'>                                
                            <Moment format="DD/MM/YYYY">{it.registro}</Moment></td>                                               
                            <td className="border pl-1">
                              {new Intl.NumberFormat('es-BO',{minimumFractionDigits: 2}).format(it.ingresos)}
                              /({it.ptipo})
                            </td>
                            <td className={it.ptipo === "qr" ? "text-gray-600 text-bold bg-sky-200 border text-center": "text-gray-600 text-bold bg-red-200 border text-center"}>{it.ptipo}</td>                            
                            <td className="border pl-1">{it.usuario ? it.usuario : 'n'}</td>
                            
                        </tr>
                    ))}     
                </tbody>
            </table>    
        </div>           

    
        
        <div className='flex mt-6 mb-6'>
            <h5 className="w-1/2 text-left pl-1 italic">fecha emisión : <Moment format="DD/MM/YYYY - HH:mm">{ fechaHoy }</Moment></h5>   
            <h5 className="w-1/2 text-right pr-1 italic">user : {props.puser.username}</h5>            
        </div>            
        {/* end content */}

    </div>
     );
    }
)

const Membresias = ({tipo,user,desde,hasta}) => {    
    const dispatch = useDispatch()
    const componentRef = useRef();   
    const {detalle, membresias } = useSelector(state => state.informe)
    let us = JSON.parse(localStorage.getItem('@usuarioFitt'))  
    
   
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });
    
     useEffect(() =>{        
         return () =>{            
           /* dispatch({type:'INFORMES_RESET'})  */
        };
      }, []);

    return(
        <div className="w-full flex p-1 bg-gray-100">
           <div className='w-1/12 flex justify-end'>
                <button 
                    onClick={() =>handlePrint()}
                    className="h-14 w-14 rounded-full bg-red-500 hover:bg-red-400 flex justify-center items-center text-white">                                           
                    <PrinterIcon className="h-5 w-5 text-gray-50 hover:text-gray-100" />
                </button> 
           </div>
           <div className='h-500 w-10/12 flex justify-center overflow-y-scroll'>
           <div className='h-max w-800 bg-white border border-gray-300 shadow-md'>
           <ComponentToPrint
                ref={componentRef}                          
                pdetalle={detalle}
                pdata={membresias}
                pdesde={desde}
                phasta={hasta}
                ptipo={tipo}
                pusu={user}
                puser={us}
                />
                </div>
           </div>
           <div className='w-1/12 flex justify-center bg-gray-100'>
              
           </div>
        </div> 
     )
    }



 
export default Membresias;