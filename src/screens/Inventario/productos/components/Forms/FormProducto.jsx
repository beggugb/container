import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { inventarioActions }  from '../../../../../redux/actions/inventario'
import Switch from 'react-switch'
import SelectSimpleForm from "../../../../../components/Select/SelectSimpleForm";
import SelectCompuestoForm from "../../../../../components/Select/SelectCompuestoForm"
import SelectSingleForm from '../../../../../components/Select/SelectSingleForm'
import SelectSubForm from '../../../../../components/Select/SelectSubForm'

const FormProducto = () =>{  
    const dispatch = useDispatch()    
    const { item  } = useSelector(state => state.producto)    
    const categorias = useSelector(state => state.categoria.items)
    const marcas = useSelector(state => state.marca.items)
    const modelos = useSelector(state => state.modelo.items)
    const unidades = useSelector(state => state.unidad.items)
    const origenes = useSelector(state => state.origen.items)
    const industrias = useSelector(state => state.industria.items)
    

    const handleChange = (e) =>{
      const { value, name } = e.target        
      dispatch({type:'productoChange',name:name,value:value}) 
    }
  
    const changeSwitch = (checked,name) => {      
      dispatch({type:'productoChange',name:name,value:checked})     
    }
    
    const submitHandle = event =>{
        event.preventDefault()    
      if(item.id){        
          dispatch(inventarioActions.putUpdate('productoAdd','productos',item,'unit'))
      }else{        
          dispatch(inventarioActions.postAdd('productoAdd','productos',item,'unit'))
      }
    }

  return(        
    <div className="bg-white flex flex-col rounded">
      <h5 className="text-md p-1 text-gray-700 rounded-t-lg bg-gray-100 font-bold border-b-2 border-gray-200 text-sm mb-1">
              Datos Producto</h5> 
      <form onSubmit={ submitHandle}>
        <div className="grid grid-cols-4 gap-2 p-1"> 
            <div className="col-span-2">
                <label className="block text-gray-500 tracking-wide text-grey-darker text-xs font-bold ">
                    Código
                </label>
                <input 
                    className="h-8 border-gray-300 block w-full bg-grey-lighter text-gray-500 text-sm rounded px-2 " 
                    id="codigo" 
                    name="codigo"
                    type="text"                     
                    required={true}
                    value={item.codigo}
                    onChange={(e)=>{ handleChange(e)}} 
                /> 
            </div>  
            <div >
                <label className="block text-gray-500 tracking-wide text-grey-darker text-xs font-bold ">
                    Estado
                </label>
                <Switch                         
                      className="ml-5"                 
                      name="estado"        
                      onChange={ (e) =>{ changeSwitch(e,'estado')}}    
                      checked={item.estado} 
                      height={20}
                      width={48}
                      borderRadius={20}
                      onColor="#86d3ff"
                      onHandleColor="#2693e6"
                      offHandleColor="#c1c1c1"
                    />
            </div> 
            <div>
                <label className="block text-gray-500 tracking-wide text-grey-darker text-xs font-bold">
                    Oferta
                </label>
                <Switch
                        className="ml-2"                        
                        onChange={ (e) =>{ changeSwitch(e,'inOferta')}}  
                        checked={item.inOferta} 
                        height={20}
                        width={48}
                        borderRadius={20}
                        onColor="#86d3ff"
                        onHandleColor="#2693e6"
                        offHandleColor="#c1c1c1"
                        /> 
            </div>             
        </div>  
        <div className="grid grid-cols-4 gap-2 p-1"> 
            <div className=" col-span-2">
                <label className="block text-gray-500 tracking-wide text-grey-darker text-xs font-bold ">
                    Nombre
                </label>
                <input 
                    className="h-8 border-gray-300 block w-full bg-grey-lighter text-gray-500 text-sm rounded px-2 " 
                    id="nombre" 
                    name="nombre"
                    type="text" 
                    required={true}
                    value={item.nombre}
                    onChange={(e)=>{ handleChange(e)}} 
                /> 
            </div>  
            <div >
                <label className="block text-gray-500 tracking-wide text-grey-darker text-xs font-bold ">
                    Precio Venta
                </label>
                <input 
                    className="h-8 border-gray-300 block w-full bg-grey-lighter text-gray-500 text-sm rounded px-2 " 
                    id="precioVenta" 
                    name="precioVenta"
                    type="number" 
                    value={item.precioVenta}
                    onChange={(e)=>{ handleChange(e)}} 
                /> 
            </div> 
            <div >
                <label className="block text-gray-500 tracking-wide text-grey-darker text-xs font-bold ">
                    Precio Compra
                </label>
                <input 
                    className="h-8 border-gray-300 block w-full bg-grey-lighter text-gray-500 text-sm rounded px-2 " 
                    id="precioCompra" 
                    name="precioCompra"
                    type="number" 
                    value={item.precioCompra}
                    onChange={(e)=>{ handleChange(e)}} 
                    readOnly={true}
                /> 
            </div>                      
        </div>   

        <div className="grid grid-cols-3 gap-2 p-1"> 
            <div >
                <label className="block text-gray-500 tracking-wide text-grey-darker text-xs font-bold ">
                Categoría 
                </label>
                <SelectCompuestoForm                                              
                        items={categorias}
                        xredux={'categoriasLista'}
                        xreduxItem={'productoChange'}
                        payload={'categorias'}
                        keyId={'categoriaId'}
                        itemId={item.categoriaId}                             
                        yredux={'marcasLista'}                        
                        ypayload={'marcas'}                        
                    />
            </div>  
            <div >
                <label className="block text-gray-500 tracking-wide text-grey-darker text-xs font-bold ">
                    Marca
                </label>
                <SelectSubForm                                             
                        items={marcas}                        
                        xreduxItem={'productoChange'}                        
                        keyId={'marcaId'}
                        itemId={item.marcaId}                             
                        yredux={'modelosLista'}                        
                        ypayload={'modelos'}                        
                    />  
            </div> 
            <div >
                <label className="block text-gray-500 tracking-wide text-grey-darker text-xs font-bold ">
                    Modelo
                </label>
                <SelectSingleForm                                            
                        items={modelos}                        
                        xreduxItem={'productoChange'}                        
                        keyId={'modeloId'}
                        itemId={item.modeloId}                        
                    /> 
            </div>                      
        </div>  
        <div className="grid grid-cols-3 gap-2 p-1"> 
            <div >
                <label className="block text-gray-500 tracking-wide text-grey-darker text-xs font-bold ">
                Origen
                </label>
                <SelectSimpleForm                                              
                        items={origenes}      
                        xredux={'origenesLista'}                  
                        xreduxItem={'productoChange'} 
                        payload={'origenes'}                       
                        keyId={'origenId'}
                        itemId={item.origenId}                        
                    />
            </div>  
            <div >
                <label className="block text-gray-500 tracking-wide text-grey-darker text-xs font-bold ">
                    Unidad
                </label>
                <SelectSimpleForm                                       
                      items={unidades}      
                      xredux={'unidadesLista'}                  
                      xreduxItem={'productoChange'} 
                      payload={'unidades'}                       
                      keyId={'unidadId'}
                      itemId={item.unidadId}                        
                  /> 
            </div> 
            <div >
                <label className="block text-gray-500 tracking-wide text-grey-darker text-xs font-bold ">
                    Industria
                </label>
                <SelectSimpleForm                                 
                      items={industrias}      
                      xredux={'industriasLista'}                  
                      xreduxItem={'productoChange'} 
                      payload={'industrias'}                       
                      keyId={'industriaId'}
                      itemId={item.industriaId}                        
                  />  
            </div>                      
        </div> 
        <div className="grid grid-cols-1 gap-2 p-1"> 
            <div >
                <label className="block text-gray-500 tracking-wide text-grey-darker text-xs font-bold ">
                Descripción
                </label>
                <input 
                    className="h-8 border-gray-300 block w-full bg-grey-lighter text-gray-500 text-sm rounded px-2 " 
                    id="nombreCorto" 
                    name="nombreCorto"
                    type="text" 
                    value={item.nombreCorto}
                    onChange={(e)=>{ handleChange(e)}} 
                    readOnly={true}
                />
                
            </div>                               
        </div> 
        
        <div>                    
            <button
                  className="mt-3 ml-1 bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-5 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"> {item.id ? "Actualizar":"Registrar"}
            </button>                        
        </div> 


      </form>  
    </div> 
    )    
}

export default FormProducto  