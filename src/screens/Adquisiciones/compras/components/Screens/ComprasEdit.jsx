import React,{ useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { setcompra, comprasUpdate } from '../../../../../reducers/slices/compraSlice'
import { Link } from 'react-router-dom'
import { tiposCompra, tiposOrigen } from '../../../../../data/dataLoad'
import InputSearch from '../Inputs/InputSearch'
import ProductosLista from '../../../compras/components/Lists/ProductosLista'
import SelectLocalForm from "../../../../../components/selects/Select8"
import SelectLocalForms from "../../../../../components/selects/Select9"
import { ArrowLeftIcon } from "@heroicons/react/24/solid";


const ComprasEdit = () =>{
    const dispatch = useDispatch()  
    const { item, items, indicador } = useSelector(state => state.compra)     
    const pitems  = useSelector(state => state.proveedor.items)  
    
    
   const handleChange = (e) =>{
        const { value, name } = e.target        
        let ind = {...item}
        ind={
            ...ind,
            [name]:value
        }
        dispatch(setcompra(ind))
   }
 
  

   const submitHandle = event =>{
    event.preventDefault() 
    const dato ={
        item : item,
        items: items,
        id   : item.id,
        compraId   : item.id,
        tip  : "unit"
    }    
    dispatch(comprasUpdate(dato))
   } 

   const handleChanges = (label,value) =>{    
    let ind = {...item}
        ind={
            ...ind,
            [label]:value
        }
        dispatch(setcompra(ind))
   }
 
   
   useEffect(() => {        
    return () => {
/*        dispatch({type:'compraReset'}) */
    };
   }, []);
      
    return(
      <div className="h-580 justify-center items-center flex-1">
      <div className="border-b-2 h-8 flex flex-row pt-1 pl-2 text-sm text-gray-500 font-bold">       
        <Link to={"/admin/adquisiciones/compras/list"}>
            <div className="h-7 w-10 flex items-center justify-center rounded-l-md bg-sky-400 hover:bg-sky-300 mr-1">                        
                <ArrowLeftIcon  className="h-5 w-5 text-white" />
            </div>
        </Link>
          <span className="pl-2 text-xs">Edición de compra</span>
      </div>

      <div className="h-520 p-1 flex flex-row">   
            <div className="w-1/4 border rounded flex-col">
                <div className='h-8 border-b bg-gray-100 rounded-t flex items-center pl-2'>
                    <span className='font-bold ml-1 text-gray-500 text-[12px]'>  
                       Datos de Compra
                    </span>
                </div>
                <div className='m-1 flex justify-center items-center p-1'>
                    <form onSubmit={ submitHandle} className="w-full">                    
                        <div className="flex-col">
                            <label className="h-8 text-gray-500 text-[12px] font-bold">
                                Proveedor
                            </label>
                            <div className="h-8">
                            <SelectLocalForms
                                options={pitems}
                                option={item.proveedorId}
                                handleChanges={handleChanges}
                                name="proveedorId"
                            />                        
                            </div>                            
                        </div>  

                        <div className="mt-1 flex-col">
                            <label className="h-8 text-gray-500 text-[12px] font-bold">
                            Tipo
                        </label>
                        <div className="h-8">
                        <SelectLocalForm                            
                            options={tiposCompra}
                            option={item.tipo}
                            handleChanges={handleChanges}
                            name="tipo"
                        />
                    
                        </div>   
                    </div>

                    <div className="mt-1 flex-col">
                            <label className="h-8 text-gray-500 text-[12px] font-bold">
                            Origen
                            </label>
                            <div className="h-8">
                            <SelectLocalForm
                                options={tiposOrigen}
                                option={item.origen}
                                handleChanges={handleChanges}
                                name="origen"  
                            />                    
                        </div>   
                    </div>

                    <div className="mt-1 flex-col">                        
                        <label htmlFor="cantidad" className="h-8 text-gray-500 text-[12px] font-bold">
                            Cantidad
                        </label>                            
                        <div className="border border-gray-300">
                            <input                             
                                id="nroItems" 
                                name="nroItems"
                                type="text" 
                                value={item.nroItems}
                                required={true}
                                readOnly={true}
                                onChange={(e)=>{ handleChange(e)}} 
                                className="h-8 w-full bg-slate-200 border-none pl-2 text-[12px] text-gray-600" 
                                />
                        </div>                  
                    </div>
                    <div className="mt-1 flex-col">                        
                        <label htmlFor="total" className="h-8 text-gray-500 text-[12px] font-bold">
                            Total
                        </label>                            
                        <div className="border border-gray-300">
                            <input                             
                                 id="totalGeneral" 
                                 name="totalGeneral"
                                 type="text" 
                                 value={item.totalGeneral}
                                 required={true}
                                 readOnly={true}
                                 onChange={(e)=>{ handleChange(e)}} 
                                className="h-8 w-full bg-slate-200 border-none pl-2 text-[12px] text-gray-600" 
                                />
                        </div>                  
                    </div>

                    <div className="mt-1 flex-col">                        
                        <label htmlFor="detalle" className="h-8 text-gray-500 text-[12px] font-bold">
                            Detalle
                        </label>                            
                        <div className="border border-gray-300">
                        <textarea
                            className="w-full bg-slate-200 border-none pl-2 text-[12px] text-gray-600" 
                            id="observaciones" 
                            name="observaciones"
                            type="text"
                            rows={3} 
                            value={item.observaciones}                
                            onChange={(e)=>{ handleChange(e)}} 
                            />
                        </div>
                    </div>
                    <div className="mt-2 flex-col"> 
                        <button 
                            type="submit"
                            className="h-8 w-full mt-1 rounded bg-sky-400 hover:bg-sky-300 p-1  text-[12px] text-white">
                        
                            {' '} {item.id ? " Actualizar" : " Guardar"}
                        </button>
                    </div>
                    
                </form>   
                </div> 
                  
            </div>     
            <div className="w-3/4 border rounded ml-1">               
                <div className='h-10 border-b flex items-center'>
                  <InputSearch/>
                </div> 

                <div className='w-full flex items-center'>
                <ProductosLista />
                </div>           
              </div>         
        </div>

            
  </div> 
    )
}

export default ComprasEdit