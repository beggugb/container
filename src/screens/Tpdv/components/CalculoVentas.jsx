import React,{ useState} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { api } from '../../../helpers/api'
import { inventarioActions } from '../../../redux/actions/inventario'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faMoneyBill } from "@fortawesome/free-solid-svg-icons";

const CalculoVentas = ({setShowModal}) => {    
    const dispatch = useDispatch()        
    const {  categoriaId } = useSelector(state => state.venta) 

    const borrar = () => {  
        let ites = []
        let cTotal = 0        
        let gTotal = 0
        dispatch({type:'ventasSetItems',values:ites, cantidad: cTotal, value: gTotal})  

        let iok = {
            categoriaId: categoriaId,
            value: ""
          }   
        dispatch(inventarioActions.items('productosItems','stock',iok))
        
    } 

    return (                   
            <div className="h-14 flex justify-around items-center bg-gray-100">
                <button 
                    onClick={()=>borrar()}
                    className="w-1/2 h-12 bg-red-400 rounded mr-2">
                    <FontAwesomeIcon icon={faTrash} size="xl" color="#eaeaea"/>
                </button>
               
                <button 
                    onClick={() => setShowModal(true)}
                    className="w-1/2 h-12  bg-green-400 rounded">
                    <FontAwesomeIcon icon={faMoneyBill} size="xl" color="#eaeaea"/>
                </button>
            </div>                                        
     );
}
 
export default CalculoVentas;



