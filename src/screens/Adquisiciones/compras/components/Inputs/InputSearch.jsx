import React,{ useState } from "react";
import { useDispatch, useSelector} from 'react-redux'
import { productosStocks } from '../../../../../reducers/slices/productoSlice'
import { setcompra,setitems } from '../../../../../reducers/slices/compraSlice'
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { CheckIcon } from "@heroicons/react/24/outline";
import {toastr} from 'react-redux-toastr'


const InputSearch = () =>{
    const dispatch = useDispatch()    
    const pitems  = useSelector(state => state.producto.items)
    const {items, item }  = useSelector(state => state.compra)
    const [name, setname] = useState("");
    const [view, setview] = useState(false);    
    const [cantidad, setCantidad] = useState(0);
    const [valor, setValor] = useState(0);    
    const [producto, setproducto] = useState();
    const fechaHoy = new Date()
    const mes = fechaHoy.getMonth() + 1
    const anio = fechaHoy.getFullYear()

    const handleSearch = () =>{              
        dispatch(productosStocks({value: name}))
        setview(true)
    }
    const asignar = (it) =>{        
        setproducto(it)
        setname(it.nombre)
        setview(false)

    }
    const agregar = () =>{    
        if(cantidad > 0 && valor > 0 && producto){            
        let newItems = [...items]
        let nitem    = {...item}
        let repeat = false   

        newItems.map((ite,index)=>{            
            if(ite.productoId === producto.id)
            {
                repeat = true
            }
            return null
        })

        if(!repeat){
            let newItem ={
                cantidad: cantidad,
                codigo:producto.codigo,
                nombre: producto.nombre,
                valor: valor,
                categoria: producto.categoria.nombre,
                marca: producto.marca.nombre,
                gestion: anio,
                mes: mes,
                subTotal: parseFloat(cantidad) * parseFloat(valor),
                unidad: producto.unidad.nombre,
                compraId: item.id,
                productoId: producto.id                
            }        
            newItems.push(newItem)                
            nitem.totalGeneral = parseFloat(item.totalGeneral) + (parseFloat(cantidad) * parseFloat(valor))
            nitem.nroItems     = parseInt(item.nroItems) + parseInt(cantidad)
            dispatch(setitems(newItems))
            dispatch(setcompra(nitem))            
        }        
        clear()    
        }else{
            toastr.error('Error', "debe seleccionar un producto ") 
        }    
    }
    

    const clear = () =>{
        setname('')
        setview(false)
        setproducto('')
        setCantidad(0)
        setValor(0)
    }
 

    return( 
      <>
        <div className="h-max w-full flex items-center">
            <div className="h-10 w-1/12 flex pl-2 items-center">
                <label className="text-[12px] text-gray-600">
                    Producto :
                </label>         
            </div>

            <div className="h-10 w-4/12 flex flex-col pl-2 justify-center">                       
               <div className="h-8 border-2 border-gray-300 flex justify-center items-center">
                   <input                      
                    id="name" 
                    name="name"
                    type="text" 
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    className="h-7 w-full border-none focus:ring-0 text-gray-600 text-[12px]"
                    /> 
                    <button 
                    onClick={() => clear()}
                    className={name ?"h-7 w-7 border z-10 border-transparent shadow-sm text-[12px] font-medium rounded-full text-red-600" :"h-7 w-7 border z-10 -ml-14 border-transparent shadow-sm text-[12px] font-medium rounded-full text-white"} >
                    <XMarkIcon className="h-5 w-5"/>
                    </button>
                    <button 
                    onClick={() => handleSearch()}
                    className="h-7 w-7 border z-10 border-transparent shadow-sm text-[12px] font-medium rounded-full text-gray-600">
                    <MagnifyingGlassIcon className="h-5 w-5"/>
                    </button>
                    
                    { view && pitems.length > 0 ?
                    <div 
                    onMouseLeave={() => clear()}
                    className="h-auto mt-20 -ml-10 absolute w-56 z-10 shadow-md border bg-slate-100 p-2 overflow-x-scroll ">
                        <table className="border-collapse w-full bg-slate-500">
                            <tbody>
                                {pitems.map((ite,index)=>(
                                <tr 
                                key={index}                                
                                onClick={() => asignar(ite)}>                                                                            
                                    <td className="h-6 border-b border-gray-300 text-[12px] text-white hover:text-gray-700 hover:bg-gray-50">{ite.nombre} - ({ite.categoria.nombre})</td>                                        
                                </tr>
                                ))}                                
                            </tbody>
                        </table>
                    </div>  : null                 
                    }
               </div>
                
            </div>
            <div className="h-10 w-3/12 flex items-center">
                <label className="w-1/2 text-[12px] text-gray-600 flex justify-end pr-4">
                    Cantidad :
                </label>
                <div className="h-8 w-1/2 border-2 border-gray-300 flex justify-center items-center">
                <input                     
                    id="cantidad" 
                    name="cantidad"
                    type="text" 
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    className="w-full h-7 border-none focus:ring-0 text-gray-600 text-[12px]"
                />
                </div>
            </div>

            <div className="h-8 w-3/12 flex items-center">
                <label className="w-1/2 text-[12px] text-gray-600 flex justify-end pr-4">
                    Valor :
                </label>
                <div className="h-8 w-1/2 border-2 border-gray-300 flex justify-center items-center">
                    <input                         
                        id="valor" 
                        name="valor"
                        type="text" 
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        className="w-full h-7 border-none focus:ring-0 text-gray-600 text-[12px]"
                    /> 
                </div>    
            </div>
            <div className="h-8 w-1/12 flex items-end justify-end pr-2 pl-2">
                <button 
                onClick={() => agregar()}
                className="w-full h-8 bg-green-500 hover:bg-green-400 p-1 rounded text-white flex items-center justify-center">
                    <CheckIcon className="h-6 w-6" />
                </button>
            </div>
        </div>     
        
      </> 
    )

}


export default InputSearch