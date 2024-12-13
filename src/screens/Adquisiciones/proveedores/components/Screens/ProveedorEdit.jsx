import React,{ useState, useEffect} from "react";
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import FormImg from '../../../../../components/frms/FormImgpro'
import { resetItem, proveedoresCreate, proveedoresUpdate } from '../../../../../reducers/slices/proveedorSlice'
import Select from '../../../../../components/selects/Select10'
import { _ciudades, tiposFiscal, tiposProveedor } from '../../../../../data/dataLoad'
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const ProveedorEdit = () =>{
    const dispatch = useDispatch()  
    const { item } = useSelector(state => state.proveedor)   
    const [nitem, setnitem] = useState({
        razonSocial:"",
        codigo     :"",
        nit        :"",
        tipoFiscal :"Natural",
        tipoProveedor:"Proveedor Local",
        ciudad       :"Santa Cruz",
        direccion    :"",
        email        :""
    });


   useEffect(() => {    
    if(item.id > 0){
        setnitem(item)
    }
    return () => {
       /* dispatch(resetItem()) */
    };
   }, [item]);
  
   const handleChange = (e) =>{
    const { value, name } = e.target
    setnitem({
        ...nitem,
        [name]:value
    })
}
const submitHandle = event =>{
    event.preventDefault()    
    if(item.id){
        let iok={
            item:nitem,
            tip:"unit",
            id:item.id
        }
        dispatch(proveedoresUpdate(iok))
    }else{
       dispatch(proveedoresCreate(nitem))       
    }
}

const handleChanges = (la,val) =>{                
        setnitem({
            ...nitem,
            [la]:val
        })
}

const hclean = () =>{
    setnitem({
        razonSocial:"",
        codigo     :"",
        nit        :"",
        tipoFiscal :"Natural",
        tipoProveedor:"Proveedor Local",
        ciudad       :"Santa Cruz",
        direccion    :"",
        email        :""
    })
}

    return(
      <div className="justify-center items-center flex-1">
      <div className="border-b-2 h-8 flex flex-row pt-1 pl-2 text-sm text-gray-500 font-bold">       
      <Link to={"/admin/adquisiciones/proveedores/list"}>
        <div className="h-5 w-10 text-center rounded-l-md bg-sky-400 hover:bg-sky-300 mr-1">                        
          <ArrowLeftIcon className="h-5 w-5"/>
        </div>
        </Link>
          <span className="pl-2 text-xs">Edición de proveedor</span>
      </div>

      <div className="h-500 p-1 flex flex-row border">   
            <div className="w-1/4 border rounded flex-col">
                <div className='h-8 border-b bg-gray-100 rounded-t flex items-center pl-2'>
                    <span className='font-bold ml-1 text-gray-500 text-[12px]'>  
                       Imagen
                    </span>
                </div>
                <div className='m-1 flex justify-center items-center p-2 border-2'>                        
                <FormImg
                  item={item}
                  payload={"proveedor"}
                  payloads={"proveedores"}/>             
                </div> 
                  
            </div>     
            <div className="w-3/4 border rounded ml-1">  
                <div className='h-8 border-b bg-gray-100 rounded-t flex items-center pl-2'>
                    <span className='font-bold ml-1 text-gray-500 text-[12px]'>  
                       Datos Proveedor
                    </span>
                </div>
                <form onSubmit={submitHandle} className="rounded p-2 flex-col text-[12px] ">    
                            <div className='w-full flex p-2 rounded-md'>
                                <div className="w-3/4 flex-col mr-2">
                                    <label htmlFor="razonSocial" className="p-1 font-bold text-gray-500">Razon Social</label>
                                    <div className="border border-gray-300">
                                    <input
                                        type="text"
                                        onChange={(e)=>{ handleChange(e)}}                                                                   
                                        value={nitem.razonSocial}
                                        required={true}
                                        name="razonSocial"
                                        className="h-8 border-none w-full bg-slate-100 hover:bg-slate-200 focus:ring-0 text-[12px] text-gray-600"/>
                                    </div>    
                                </div>  
                                <div className="w-1/4 flex-col ml-2">
                                    <label htmlFor="codigo" className="p-1 font-bold text-gray-500">Código</label>
                                    <div className="border border-gray-300">
                                    <input
                                        type="text"
                                        onChange={(e)=>{ handleChange(e)}}                                                                   
                                        value={nitem.codigo}
                                        required={true}
                                        name="codigo"
                                        className="h-8 border-none w-full bg-slate-100 hover:bg-slate-200 focus:ring-0 text-[12px] text-gray-600"/>
                                    </div>
                                </div>
                            </div>  

                            <div className='w-full flex p-2 rounded-md'>
                                <div className="w-1/4 flex-col">
                                    <label htmlFor="nit" className="p-1 font-bold text-gray-500">NIT</label>
                                    <div className="border border-gray-300">
                                    <input
                                        type="text"
                                        onChange={(e)=>{ handleChange(e)}}                                                                   
                                        value={nitem.nit}
                                        name="nit"
                                        className="h-8 border-none w-full bg-slate-100 hover:bg-slate-200 focus:ring-0 text-[12px] text-gray-600"/>                                                                   
                                    </div>
                                </div>

                                <div className="w-1/4 flex-col ml-2">
                                    <label htmlFor="tipoFiscal" className="p-1 font-bold text-gray-500">Tipo Fiscal </label>
                                    <Select
                                      options={tiposFiscal}
                                      option={nitem.tipoFiscal}                                    
                                      handleChanges={handleChanges} 
                                      name={"tipoFiscal"}
                                      />
                                </div>  
                                <div className="w-1/4 flex-col ml-2">
                                    <label htmlFor="tipoProveedor" className="p-1 font-bold text-gray-500">Tipo Proveedor </label>
                                    <Select
                                      options={tiposProveedor}
                                      option={nitem.tipoProveedor}                                    
                                      handleChanges={handleChanges} 
                                      name={"tipoProveedor"}
                                      />
                                </div>  
                                <div className="w-1/4 flex-col ml-2">
                                    <label htmlFor="ciudad" className="p-1 font-bold text-gray-500">Ciudad</label>
                                    <Select
                                      options={_ciudades}
                                      option={nitem.ciudad}                                    
                                      handleChanges={handleChanges} 
                                      name={"ciudad"}
                                      tipo={"local"}/>
                                </div>  
                                                                           
                            </div>

                            <div className='w-full flex p-2 rounded-md'>
                                <div className="w-1/2 flex-col mr-2">
                                    <label htmlFor="direccion" className="p-1 font-bold text-gray-500">Dirección</label>
                                    <div className="border border-gray-300">
                                    <input
                                        type="text"
                                        onChange={(e)=>{ handleChange(e)}}                                                                   
                                        value={nitem.direccion}
                                        name="direccion"
                                        className="h-8 border-none w-full bg-slate-100 hover:bg-slate-200 focus:ring-0 text-[12px] text-gray-600"/>
                                    </div>    
                                </div>  
                                <div className="w-1/2 flex-col ml-2">
                                    <label htmlFor="email" className="p-1 font-bold text-gray-500">Email</label>
                                    <div className="border border-gray-300">
                                    <input
                                        type="email"
                                        onChange={(e)=>{ handleChange(e)}}                                                                   
                                        value={item.email}
                                        name="email"
                                        className="h-8 border-none w-full bg-slate-100 hover:bg-slate-200 focus:ring-0 text-[12px] text-gray-600"/>
                                    </div>
                                </div>                                                          
                            </div> 
                            
                            <div className='w-full flex p-2'>
                                <div className="w-full flex-col">
                                    <button
                                        type="submit"
                                        className='h-9 w-40 shadow-md  bg-orange-400  hover:bg-orange-300'>
                                        <span className='font-bold  text-gray-50'>{item.id ? "Actualizar": "Registrar"}</span>
                                    </button>
                                </div>                                                       
                            </div>
                    </form> 
                           
              </div>         
        </div>

            
  </div> 
    )
}

export default ProveedorEdit