import { useSelector, useDispatch} from 'react-redux'
import { apis } from '../../../helpers/api'
import { setItem, setItems } from '../../../reducers/slices/ventaSlice'
import { setLista } from '../../../reducers/slices/productoSlice'
import {toastr} from 'react-redux-toastr'

const ListaProductos = () => {    

    const dispatch = useDispatch()        
    const {items}  = useSelector(state => state.producto) 
    const {vitems, item} = useSelector(state => state.venta) 

    const ajustar = (id,valor,newArr,op) =>{      
    let nCantidad  = item.cantidad ? parseFloat(item.cantidad) + parseFloat(1): 1        
    let nTotal     = item.totalGeneral ? parseFloat(item.totalGeneral) + parseFloat(valor) : parseFloat(valor) 
    let nImpuesto  = nTotal * item.vImpuesto
    let nSubTotal  = nTotal -  nImpuesto
    
    let nItem = {...item}

    nItem.cantidad     = nCantidad 
    nItem.totalGeneral = nTotal
    nItem.nroItems     = op ? item.nroItems  + 1 : item.nroItems  
    nItem.subImpuestos = nImpuesto
    nItem.subTotal     = nSubTotal   
    
 
    dispatch(setItems(newArr))  
    dispatch(setItem(nItem))   
    descontar(id) 
}
  


const descontar = (id) =>{        
    let resu = items.findIndex(item => item.id === id);          
    let nStock    = parseInt(items[resu].stock) - 1        

    const newArray  = items.map((obj, key) => {
        if (key === resu) {
            return {...obj, stock: nStock};
            }          
            return obj;
        });
        dispatch(setLista(newArray))
    
}
    const handleAsignar = (nitem) => {        
      let nItems = [...vitems]
      let xvalor  = nitem.precioVenta      
      let result = nItems.findIndex(item => item.productoId === nitem.id);      
      if(nitem.stock > 0){
          if(result < 0){            
            const iok = {
              cantidad   : 1,          
              productoId : nitem.productoId,        
              valor      : nitem.precioVenta,
              valors     : nitem.costo,
              unidad     : nitem.unidad.nombre || '',
              stock      : nitem.stock,
              subTotal   : parseInt(1) * parseFloat(nitem.precioVenta),        
              nombre     : nitem.nombre, 
              categoria  : nitem.categoria.nombre || '',
              marca      : nitem.marca.nombre || '',
            }                
            
            nItems.push(iok)
            ajustar(nitem.id,xvalor,nItems,true)
           
          }else{
            let nStock    = parseInt(vitems[result].stock)
            let nCantidad = parseInt(vitems[result].cantidad)  
          
            if(nCantidad < nStock && nStock > 1){
                let newCantidad = parseInt(vitems[result].cantidad) + 1
                let newTotal    = parseFloat(vitems[result].subTotal) + parseFloat(vitems[result].valor)  
                    
                const newArr = vitems.map((obj, key) => {
                if (key === result) {
                    return {...obj, cantidad: newCantidad, subTotal: newTotal};
                    }          
                    return obj;
                });
                ajustar(nitem.id,xvalor,newArr,false)
                 
                
            }else{
                toastr.error('Stock', 'No existe Stock') 
            }
          }
       
    }else{
      toastr.error('Stock', 'No existe Stock') 
  }

   

  }   
    return ( 
        <div className="h-full border border-white p-1 w-full overflow-y-scroll">
         { items &&
           items.map((item,index)=>(
            <div 
                key={index} 
                onClick={()=> handleAsignar(item)}
                className={item.stock > 0 ? "h-32 w-28 border-2 hover:border-2 hover:border-gray-400  shadow-lg rounded float-left mr-2 mb-1" : "h-32 w-28 border-2 shadow-lg rounded float-left mr-2 mb-1 opacity-50 cursor-not-allowed"}>                                                                        
                <h2 className="bg-stone-100 text-[13px] text-stone-500 font-bold p-1 truncate">{item.nombre}</h2>                  
                <div className="w-full flex p-1 justify-center">
                    <img
                    alt="producto"
                    className="h-16 w-16 rounded"                        
                    src={`${apis}/static/images/productos/md/` + item.filename}
                    />                                 
                </div> 
                <div className="flex text-[13px] z-50 justify-center mr-2">
                <div className="w-1/3 z-40 -mt-4 -ml-2  text-center">
                    <div className="w-8 h-6 rounded-full pt-1 text-[13px] font-bold bg-sky-500 text-white">{item.stock || 0}</div>    
                </div>
                <div className="bg-purple-500 font-bold rounded w-3/5 text-center text-white border">
                {new Intl.NumberFormat('es-BO',{style: "currency",currency:'BOB',minimumFractionDigits: 2}).format(item.precioVenta)}
                </div>
            </div>
            </div> 
           ))
         }  
        </div>
     );
}
 
export default ListaProductos;



