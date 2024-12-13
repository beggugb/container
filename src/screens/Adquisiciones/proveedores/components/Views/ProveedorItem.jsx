import React,{useEffect, useRef} from "react";
import { useDispatch } from 'react-redux'
import {api} from '../../../../../helpers/api'
import Moment from 'react-moment'
import { useReactToPrint } from 'react-to-print';
import GoogleMapReact from "google-map-react";
import { nombreEmpresa } from '../../../../../helpers/data'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faTimes } from "@fortawesome/free-solid-svg-icons";

const ComponentToPrint = React.forwardRef((props,ref)=>{    
    const mapRef = useRef()
    const fechaHoy = new Date()
    const LocationPin = ({text}) =>(
        <FontAwesomeIcon icon={faMapMarkerAlt} size="3x" color="#ef4444"/>
      )

    return(
        <div ref={ref}>
        <div className="border-2 border-gray-100 p-1 flex flex-row justify-center text-xs">
           <div className="w-full p-2 justify-center items-center flex"> 
               <div className="w-full text-xs">     
                               
            <div className="h-26 text-center">
                <div className="h-7 flex flex-row">
                    <h5 className="w-1/2 text-left p-1 font-bold text-sm">{nombreEmpresa}</h5>                      
                </div> 

                <div className="w-full text-center">
                    <p className="pr-2 text-right text-[10px] italic">Fecha emisión : <Moment format="DD/MM/YYYY - HH:mm">{ fechaHoy }</Moment></p>  
                    <p className="pr-2 text-right text-[10px] italic">Usuario : {props.usuario.nombre}</p>  
                </div>

                <h6 className="text-sm font-bold mt-2">Kardex Proveedor # <b>{props.item.id}</b></h6>                  
            </div>         

          <div className="grid grid-cols-2 gap-2 mt-2 text-[10px]">        
           <div>        
               <div className="p-1 flex flex-row justify-center">
                   <p className="w-1/3 font-bold">Código :</p> <p className="pl-3 w-3/5">{ props.item.codigo}</p>                                                                  
               </div>

               <div className="p-1 flex flex-row justify-center">                    
                   <p className="w-1/3 font-bold">Nit :</p> <p className="pl-3 w-3/5">{ props.item.nit}</p>                                                    
               </div>

               <div className="p-1 flex flex-row justify-center">                    
                   <p className="w-1/3 font-bold">Razon Social :</p> <p className="pl-3 w-3/5">{ props.item.razonSocial || ''}</p>                                                    
               </div>


               <div className="p-1 flex flex-row justify-center">
                   <p className="w-1/3 font-bold">T.Proveedor :</p> <p className="pl-3 w-3/5">{ props.item.tipoProveedor || ''}</p>                                                                  
               </div>

               <div className="p-1 flex flex-row justify-center">                    
                   <p className="w-1/3 font-bold">T.Fiscal :</p> <p className="pl-3 w-3/5">{ props.item.tipoFiscal}</p>                                                    
               </div>

               <div className="p-1 flex flex-row justify-center">
                   <p className="w-1/3 font-bold">Contacto :</p> <p className="pl-3 w-3/5">{ props.item.contacto}</p>                                                                  
               </div>

               <div className="p-1 flex flex-row justify-center">
                   <p className="w-1/3 font-bold">Teléfono :</p> <p className="pl-3 w-3/5">{ props.item.telefono}</p>                                              
                   
               </div>

               <div className="p-1 flex flex-row justify-center">                    
                   <p className="w-1/3 font-bold">Dirección :</p> <p className="pl-3 w-3/5">{ props.item.direccion}</p>                                                    
               </div>

               <div className="p-1 flex flex-row justify-center">
                   <p className="w-1/3 font-bold">Pais :</p> <p className="pl-3 w-3/5">{ props.item.pais}</p>                                                                  
               </div>

               <div className="p-1 flex flex-row justify-center">
                   <p className="w-1/3 font-bold">Ciudad :</p> <p className="pl-3 w-3/5">{ props.item.ciudad}</p>                                                                  
               </div>              
           </div>

           <div className="border border-gray-200 rounded mt-3">        
               <div className="space-y-1 text-cente p-2 rounded-lg">
               <img
                   alt="proveedor"
                   className="h-64"
                   /*src={api + `${api}/static/images/${payloads}/lg/` + item.filename}*/
                   src={`${api}/static/images/proveedores/lg/` + props.item.filename}
                   />       
               </div>
           </div>
           </div>  
           <div className="h-56">
                  <div style={{ height: '220px', width: '100%', padding: '1px', marginTop: '2px' }}>  
                    { props.item.latitude  && props.item.longitude ?       
                        <GoogleMapReact
                        ref={mapRef} 
                      
                        bootstrapURLKeys={{ 
                            key: 'AIzaSyAF83DBU51q3idSspsd7f4DtTk7vNwHpR8',
                            libraries:['places', 'geometry', 'drawing', 'visualization'] 
                            }}
                        defaultCenter={{        
                            lat: parseFloat(props.item.latitude),
                            lng: parseFloat(props.item.longitude)
                            }}
                        defaultZoom={17}
                       
                        >
                            <LocationPin           
                            lat={parseFloat(props.item.latitude)}
                            lng={parseFloat(props.item.longitude)}
                            text={props.item.direccion}
                            />
                    
                        </GoogleMapReact>
                    : null }       
            </div>
           </div> 

               </div>                 
           </div>
       </div>
       </div> 
    )
})


const ProveedorItem = ({item,setShowModal}) =>{
    const dispatch = useDispatch()
    let user = JSON.parse(localStorage.getItem('@usuarioFitt')) 
    const componentRef = useRef()

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });

    useEffect(() => {        
        return () => {
            dispatch({type:'proveedorReset'})
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
                    className="w-20 h-7 bg-red-500 rounded-md m-1 text-xs text-white">Imprimir</button>                           
                    
                    <button 
                        onClick={() => setShowModal(false)}
                        className="w-7 h-7 bg-red-500 rounded-full text-xs text-white mt-1 mr-4">
                        <FontAwesomeIcon icon={faTimes} color="#fff" />
                    </button>
                    </div>
                    <ComponentToPrint
                        ref={componentRef}       
                        item={item} 
                        usuario={user}
                    />                    
              </div>
            </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )

}

export default ProveedorItem