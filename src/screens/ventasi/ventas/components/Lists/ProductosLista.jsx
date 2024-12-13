import React from 'react'
import { Table, Button } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ListaView from '../Lists/ListaVista'

const ProductosLista = () =>{    
    const dispatch = useDispatch()
    const { item, items } = useSelector(state => state.compra)    
   
    const handleDelete = (it) =>{           
        if(item.totalGeneral > 0){
            let valor = parseFloat(item.totalGeneral) - (parseFloat(it.cantidad) * parseFloat(it.valor))
            let newData = items.filter(item => item.productoId !== it.productoId )                
            let nItems = parseInt(item.nroItems) + parseInt(it.cantidad)
            dispatch({type:"comprasItems",cantidad:nItems,value:valor,values:newData})            
        }        
    } 

    return(
        <div className="resultado_items">
            { items &&
            <Table className="table-simple">
                <thead>
                    <tr>                        
                        <th width="10%">Código</th>
                        <th width="25%">Nombre</th>
                        <th width="15%">Categoria</th>
                        <th width="10%">Marca</th>
                        <th width="10%">Precio</th>
                        <th width="10%">Cantidad</th>
                        <th width="15%">SubTotal</th>
                        <th width="5%"></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item,index)=>(                       
                        <tr key={index}>                       
                                <ListaView
                                item={item}
                                index={index}                                
                                />
                                <td>
                                    <Button className="btn-tabla"
                                        onClick={()=>handleDelete(item)}>
                                        <FontAwesomeIcon icon={faTrash} className="btt"/>
                                    </Button>                                
                               </td>
                        </tr>                 
                    ))}                    
                </tbody>
            </Table>
            }
        </div>        
    )
}

export default ProductosLista