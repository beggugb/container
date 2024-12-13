import React,{ useEffect, useState} from 'react'
import { cajaItem } from '../../reducers/slices/cajaSlice'
import { stockCategoria } from '../../reducers/slices/productoSlice'
import { resetItem } from '../../reducers/slices/ventaSlice'
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../../components/snippets/Loading'
import { TrashIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";
import ListaProductos from './components/ListaProductos'
import ListaCategorias from './components/ListaCategorias'
import ListaVentas from './components/ListaVentas'
import FormVenta from './components/FormVenta'

const Inicio = () => {   
 const dispatch = useDispatch()   
 const [showModal, setShowModal] = useState(false);    
 const { loading, categoryId } = useSelector(state => state.venta) 
 const {cstate} = useSelector(state => state.caja)  
 
 let us = JSON.parse(localStorage.getItem('@usuarioFitt'))


 const getUtils = () => {        
  dispatch(cajaItem({id:us.id,tip:"usuario"}))  
  dispatch(stockCategoria({categoriaId:0}))       
  
} 
 useEffect(() => {
  getUtils()
  return () => {
    
  };
 }, []);

    const borrar = () => {          
        dispatch(resetItem())
        dispatch(stockCategoria({categoriaId:categoryId}))
        
    } 
 
 return ( 
    <div className="flex flex-col w-full">           
      <div className='h-14 flex items-end border-b-2 border-gray-300'> 
        <ListaCategorias/>
      </div> 
      <div className='h-580 flex  bg-stone-100 pl-1 pr-1 mt-1'>  
        <div className='w-4/12 h-full flex-col'>
          <div className='h-500 flex bg-stone-200'>
          <ListaVentas/>  
          </div>
          <div className='mt-2 h-16 flex items-center justify-center'>
            <button
            onClick={()=>borrar()}
            className='h-full w-1/2 border bg-red-500 flex items-center justify-center'>
              <TrashIcon className='h-12 w-12 text-gray-50'/>
            </button>
            <button
            onClick={() => cstate ? setShowModal(true): null}
            className={cstate ? 'h-full w-1/2 border bg-green-500 flex items-center justify-center': 'h-full w-1/2 border bg-green-500 opacity-30 flex items-center justify-center'}>
              <CurrencyDollarIcon className='h-12 w-12 text-gray-50'/>
            </button>
          </div>            
        </div>      
        <div className='w-8/12 border h-full bg-white'>
          <ListaProductos/>
        </div>              
        <FormVenta showModal={showModal} setShowModal={setShowModal} />
      </div>    
      
      <Loading loading={loading}/>
  </div>      
  );
}
 
export default Inicio;



