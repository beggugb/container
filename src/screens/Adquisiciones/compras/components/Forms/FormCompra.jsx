import React from "react";
import { useSelector } from 'react-redux'
import { tiposCompra, tiposOrigen } from '../../../../../data/dataLoad'
import SelectLocalForm from "../../../../../components/Select/SelectLocalForm"
import SelectSimpleForm from "../../../../../components/Select/SelectSimpleForm";

const FormCompra = ({handleChange,item,submitHandle}) =>{
    const { items } = useSelector(state => state.proveedor)    
    return(        
        <div className="bg-white px-2  mb-2 flex flex-col w-full"> 
        <form onSubmit={ submitHandle}>
        <div className="-mx-3">
            <div className="md:w-full mb-1">
                <label className="block text-gray-500 tracking-wide text-grey-darker text-[12px] font-bold mb-2">
                    Proveedor
                </label>
                <SelectSimpleForm
                    label={''}
                    items={items}
                    xredux={'proveedoresLista'}
                    xreduxItem={'compraChange'}
                    payload={'proveedores'}
                    keyId={'proveedorId'}
                    itemId={item.proveedorId}
                />
            
            </div>   
        </div>  

        <div className="-mx-3">
            <div className="md:w-full mb-1">
            <label className="block text-gray-500 tracking-wide text-grey-darker text-[12px] font-bold mb-2">
                Tipo
            </label>
            <SelectLocalForm
                label={'Tipo'}
                items={tiposCompra}
                xreduxItem={'compraChange'}
                keyId={'tipo'}
                itemId={item.tipo}
            />
           
            </div>   
        </div>

        <div className="-mx-3">
            <div className="md:w-full mb-1">
            <label className="block text-gray-500 tracking-wide text-grey-darker text-[12px] font-bold mb-2">
                Origen
            </label>
            <SelectLocalForm
                label={'Origen'}
                items={tiposOrigen}
                xreduxItem={'compraChange'}
                keyId={'origen'}
                itemId={item.origen}
            />
           
            </div>   
        </div>

        <div className="-mx-3 flex">
            <div className="w-1/2 mb-1 mr-2">
            <label className="block text-gray-500 tracking-wide text-grey-darker text-[12px] font-bold mb-2">
                Cantidad
            </label>
            <input 
                className="h-7 border-gray-300 bg-gray-100 block w-full bg-grey-lighter text-[12px] text-grey-darker rounded py-2 px-2 mb-2" 
                id="nroItems" 
                name="nroItems"
                type="text" 
                value={item.nroItems}
                required={true}
                readOnly={true}
                onChange={(e)=>{ handleChange(e)}} 
                />
            </div>   
            <div className="w-1/2 mb-1 ml-2">
            <label className="block text-gray-500 tracking-wide  text-[12px] font-bold mb-2">
                Total
            </label>
            <input 
                className="h-7 border-gray-300 bg-gray-100 block w-full bg-grey-lighter text-[12px] text-gray-600 rounded py-2 px-2 mb-2" 
                id="totalGeneral" 
                name="totalGeneral"
                type="text" 
                value={item.totalGeneral}
                required={true}
                readOnly={true}
                onChange={(e)=>{ handleChange(e)}} 
                />

            </div>   
        </div>

        <div className="-mx-3">
            <div className="md:w-full mb-1">
            <label className="block text-gray-500 text-[12px] font-bold mb-2">
                Detalle
            </label>
            <textarea
                className="border-gray-300 block w-full bg-grey-lighter text-[12px] rounded py-2 px-2 mb-2" 
                id="observaciones" 
                name="observaciones"
                type="text" 
                value={item.observaciones}                
                onChange={(e)=>{ handleChange(e)}} 
                />
           
            </div>   
        </div>


        <div className="-mx-3 flex">
            <button 
                type="submit"
                className="border-2 w-full mt-1 rounded bg-sky-400 hover:bg-sky-300 p-1  text-[12px] text-white">
              
                {' '} {item.id ? " Actualizar" : " Guardar"}
            </button>
        </div>
      </form>  
    </div>                        
    )
}


export default FormCompra