import React,{useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useReactToPrint } from 'react-to-print';
import Moment from 'react-moment';
import {apis} from '../../../../../helpers/api'
import { nombreEmpresa, direccionEmpresa, telefonoEmpresa } from '../../../../../helpers/data'
import { QRCodeSVG } from "qrcode.react";
import Barcode from "react-barcode"
import { PrinterIcon, XMarkIcon } from "@heroicons/react/24/outline";



const ComponentToPrint = React.forwardRef((props,ref)=>{    
    const fechaHoy = new Date();
    return ( 
      <div ref={ref} className="p-4 text-[10px] text-gray-600">
        <div className="h-10 border-b flex border-gray-200 mt-8">
            <div className="w-1/2">
                              
            </div>
            <div className="w-1/2">                    
                <p className="text-right pl-2 font-bold ">{ nombreEmpresa }</p>                
                <p className="text-right pl-2 ">{ direccionEmpresa }</p>
                <p className="text-right pl-2 ">{ telefonoEmpresa }</p>
            </div>
        </div>

        <div className="h-11 border-b text-center mt-4">
            <h6 className="font-bold">Kardex Producto # <b>{props.pitem.id}</b></h6>                                               
            <h6 >{props.pitem.nombre}</h6>
        </div>

        {/* start headers */}          
        <div className="h-32 flex mt-1 p-1 items-center justify-center">                
            <div className='h-28 w-1/3 flex rounded p-2 mr-1'>
                <img
                alt="img"
                className="h-26 w-36 bg-gray-200"          
                src={`${apis}/static/images/productos/md/` + props.pitem.filename}
                />
            </div>                    
            <div className='h-26 w-2/3 border flex-col'>
                <div className='h-7 text-center font-bold pt-1 border-b'>
                    Código: # { props.pitem.codigo }
                </div>
                <div className='h-20 flex'>
                    <div className='w-1/2 border-r flex items-center justify-center'>
                        <Barcode value={props.pitem.codigo} width={1} height={15} fontSize={11} />
                    </div>
                    <div className='w-1/2  flex items-center justify-center'>
                        <QRCodeSVG value={props.pitem.codigo} style={{  width: 50, height: 50,padding:2, border: 'solid 1px #c1c1c1', marginRight: 5 }}/>
                    </div>
                </div>
            </div>                                  
        </div>  
        {/* end headers */}   

        <div className="border-b flex h-7 pt-1">
            <p className="w-1/6 pl-1 font-bold">Nombre</p>
            <p className="w-4/6 pl-1">{ props.pitem.nombre || ""}</p>            
        </div>

        <div className="border-b flex h-7 pt-1">
            <p className="w-1/6 pl-1 font-bold">Categoria</p>
            <p className="w-2/6 pl-1">{ props.pitem.ncategoria || ""}</p>
            <p className="w-1/6  pl-1 font-bold">Marca</p>
            <p className="w-2/6 pl-1">{ props.pitem.nmarca || ""}</p>
        </div>

        <div className="border-b flex h-7 pt-1">
            <p className="w-1/6 pl-1 font-bold">Origen</p>
            <p className="w-2/6 pl-1">{ props.pitem.norigen || ""}</p>
            <p className="w-1/6  pl-1 font-bold">Modelo</p>
            <p className="w-2/6 pl-1">{ props.pitem.nmodelo || ""}</p>
        </div>

        <div className="border-b flex h-7 pt-1">
            <p className="w-1/6 pl-1 font-bold">Unidad</p>
            <p className="w-2/6 pl-1">{ props.pitem.nunidad || ""}</p>
            <p className="w-1/6  pl-1 font-bold">Industria</p>
            <p className="w-2/6 pl-1">{ props.pitem.nindustria || ""}</p>
        </div>

        <div className="border-b flex h-7 pt-1">
            <p className="w-1/6 pl-1 font-bold">Tipo</p>
            <p className="w-2/6 pl-1">{ props.pitem.ntipos || ""}</p>
            <p className="w-1/6  pl-1 font-bold">Volumen</p>
            <p className="w-2/6 pl-1">{ props.pitem.nvolumen || ""}</p>
        </div>

        <div className="border-b flex h-7 pt-1">
            <p className="w-1/6 pl-1 font-bold">Precio Compra</p>            
            <p className="w-2/6 pl-1">
            {new Intl.NumberFormat('es-BO',{style: "currency",currency:'BOB',minimumFractionDigits: 2}).format(props.pitem.precioCosto||0)}
            </p>
            <p className="w-1/6 pl-1 font-bold">Precio Venta</p>
            <p className="w-2/6 pl-1">
            {new Intl.NumberFormat('es-BO',{style: "currency",currency:'BOB',minimumFractionDigits: 2}).format(props.pitem.precioVenta||0)}
            </p>
        </div>



       

  
       


<div className='flex mt-6 mb-4'>
<h5 className="w-1/2 text-left pl-1 italic">fecha emisión : <Moment format="DD/MM/YYYY - HH:mm">{ fechaHoy }</Moment></h5>   
<h5 className="w-1/2 text-right pr-1 italic">user : { props.puser.username }</h5>            
</div>  
{/* end content */}

    </div>
        
     );
})

const ProductoItem = ({showModal, setShowModal}) => {    
    const dispatch = useDispatch()
    const componentRef = useRef();   
    const { item }= useSelector(state => state.producto)    
    let user = JSON.parse(localStorage.getItem('@usuarioFitt'))


    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });
    
     useEffect(() =>{        
         return () =>{            
            /*dispatch({type:'productoReset'})*/
        };
      }, []);
    return(
        <>
    { showModal ?
        <>
        <div className="justify-center items-center flex-1 fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="p-1 relative w-auto my-3 mx-auto max-w-lg flex-row justify-between">
                <div className="h-620 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="ml-1 fixed h-10 w-500 border rounded shadow-md flex p-1 justify-between bg-white">                        
                        <button 
                            onClick={() =>handlePrint()}
                            className="w-10 rounded bg-sky-400 text-xs hover:text-gray-200 flex justify-center items-center text-white">                           
                           <PrinterIcon className="h-4 w-4 text-gray-50" />
                        </button>
                        <button 
                            onClick={() => setShowModal(false)}
                            className="w-7 h-7 rounded-full bg-red-400 text-xs flex items-center justify-center text-white font-bold mr-4">                            
                            <XMarkIcon className="h-4 w-4 text-gray-50" />
                        </button>
                    </div>
                    
                    <div className="overflow-y-scroll">
                        <ComponentToPrint
                            ref={componentRef}    
                            pitem={item}       
                            puser={user}

                        />                          
                    </div>                                                              
                </div>    
            </div>        
        </div>  
        <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
    : null  }
    </>        
         )
    }
 
export default ProductoItem;