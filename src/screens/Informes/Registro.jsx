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
        
        <div className="h-10 border-b flex border-gray-200 mt-4">
            <div className="w-1/2">
                              
            </div>
            <div className="w-1/2">                    
                <p className="text-right pl-2 font-bold ">{ nombreEmpresa }</p>                
                <p className="text-right pl-2 ">{ direccionEmpresa }</p>
                <p className="text-right pl-2 ">{ telefonoEmpresa }</p>
            </div>
        </div>

        <div className="h-9 text-center mt-8">
            <h6 className="font-bold uppercase ">Informe de Registro</h6>                                                           
            <h6>
                ( <Moment format="DD/MM/YYYY">{props.pdesde}</Moment> ) - 
                ( <Moment format="DD/MM/YYYY">{props.phasta}</Moment> )
            </h6>
          
        </div>

     

        

        <div className='w-full mt-4'>
            <table className='border-collapse w-full'>
                <thead>
                    <tr className='h-7 border bg-gray-100'>                    
                        <th className='w-1/12 border'>#</th>           
                        <th className='w-2/12 border'>Fecha</th>           
                        <th className='w-6/12 border'>Nombre</th>                                                                                         
                        <th className='w-3/12 border'>Hora</th>                                                   
                    </tr>
                </thead>

                <tbody>
                    { props.pdata.map((it,index)=>(
                        <tr key={index} className='h-7' >
                            <td className="border text-center">{index +1}</td>      
                            <td className="border text-center"><Moment format="DD/MM/YYYY">{it.registro}</Moment></td>                           
                            <td className="border pl-1">{it.cliente}</td>
                            <td className="border text-center"><Moment format="HH:mm:ss">{it.reg}</Moment></td>                                                                                                         
                        </tr>
                    ))}     
                </tbody>
            </table>    
        </div>           

    
        
        <div className='flex mt-6 mb-6'>
            <h5 className="w-1/2 text-left pl-1 italic">fecha emisión : <Moment format="DD/MM/YYYY - HH:mm">{ fechaHoy }</Moment></h5>   
            <h5 className="w-1/2 text-right pr-1 italic">user :{props.puser.username}</h5>            
        </div>            
        {/* end content */}

    </div>
     );
    }
)

const Registro = () => {    
    const dispatch = useDispatch()
    const componentRef = useRef();   
    const {detalle, registros, desde, hasta,total } = useSelector(state => state.informes)
    let us = JSON.parse(localStorage.getItem('@usuarioFitt'))

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });
    
     useEffect(() =>{        
         return () =>{            
            dispatch({type:'INFORMES_RESET'})  
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
                    pdetalle={total}
                    pdata={registros}
                    pdesde={desde}
                    phasta={hasta}
                    puser={us}
                />
             </div>
        </div>
        <div className='w-1/12 flex justify-center bg-gray-100'>
           
        </div>
     </div>
      
         )
    }



 
export default Registro;