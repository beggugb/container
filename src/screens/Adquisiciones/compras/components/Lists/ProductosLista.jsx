import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ListaView from '../Lists/ListaVista'
import { setcompra,setitems } from '../../../../../reducers/slices/compraSlice'
import { TrashIcon } from '@heroicons/react/24/solid'

const ProductosLista = () =>{    
    const dispatch = useDispatch()
    const { item, items } = useSelector(state => state.compra)    
   
    const handleDelete = (it) =>{           
        if(item.totalGeneral > 0){
            let newData  = items.filter(item => item.productoId !== it.productoId )                
            let nitem = {...item}
            nitem.totalGeneral  = parseFloat(item.totalGeneral) - (parseFloat(it.cantidad) * parseFloat(it.valor))            
            nitem.nroItems      = parseInt(item.nroItems) - parseInt(it.cantidad)
            dispatch(setitems(newData))
            dispatch(setcompra(nitem)) 
            
        }        
    } 

    return(
        <div className="flex-1 mx-auto border border-gray-200 p-1 mt-1">
            { items &&
            <table className="border-collapse text-[12px] w-full">
                <thead>
                <tr className="h-7 bg-gradient-to-t from-gray-200 to-gray-100 border text-[12px] text-gray-500">                                                             
                        <th className="w-2/12 border-r border-gray-300">Código</th>
                        <th className="w-3/12 border-r border-gray-300">Nombre</th>
                        <th className="w-2/12 border-r border-gray-300">Categoria</th>
                        <th className="w-1/12 border-r border-gray-300">Marca</th>
                        <th className="w-1/12 border-r border-gray-300">Precio</th>
                        <th className="w-1/12 border-r border-gray-300">Cantidad</th>
                        <th className="w-1/12 border-r border-gray-300">SubTotal</th>
                        <th className="w-1/12"></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item,index)=>(                       
                        <tr key={index} className="hover:bg-sky-100 text-gray-600 h-8 border-stone-300">                       
                                <ListaView
                                item={item}
                                index={index}                                
                                />
                                <td className="border">
                                    <div className='flex items-center justify-center w-full'>
                                        <button className="w-10 h-6 bg-red-500 hover:bg-red-400 p-1 rounded text-white" 
                                            onClick={()=>handleDelete(item)}>
                                            <TrashIcon className='h-5 w-5' />
                                        </button>                                
                                    </div>                                    
                               </td>
                        </tr>                 
                    ))}                    
                </tbody>
            </table>
            }
        </div>        
    )
}

export default ProductosLista