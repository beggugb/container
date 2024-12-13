import { useEffect } from 'react'
import PaqueteForm from '../Paquetes/component/PaqueteForm'
import PaqueteTable from '../Paquetes/component/PaqueteTable'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../../components/Loading'
import { resetData } from '../../../reducers/slices/paqueteSlice'

const Inicio = () => {
 const dispatch = useDispatch() 
 const { loading } = useSelector(state => state.paquete)  
 
 useEffect(() => {    
    return () => {
        dispatch(resetData())   
    };
 }, []);

 return ( 
    <>
      <div className="h-550 w-full flex">         
         <div className="w-1/4 border flex-col">
            <div className='h-8 border-b bg-gray-100 rounded-t flex items-center pl-2'>
                <span className='font-bold ml-1 text-gray-500 text-[13px]'>  
                    Datos de Registro
                </span>
            </div>
            <div className='flex justify-center items-center p-1'>  
            <PaqueteForm/>
            </div>  
         </div>
         <div className="w-3/4 border flex-col ml-1">
            <div className='h-8 border-b bg-gray-100 rounded-t flex items-center pl-2'>
                <span className='font-bold ml-1 text-gray-500 text-[13px]'>  
                    Paquetes
                </span>
            </div> 
            <PaqueteTable/> 
         </div>                           
        
      </div> 
      <Loading loading={loading}/>
      </>
          
 );
}
 
export default Inicio;