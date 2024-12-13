import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {apis} from '../../helpers/api'
import Moment from 'react-moment'

const Asistencia = () => {    
    const dispatch = useDispatch()
    const {registros } = useSelector(state => state.informe)

    
     useEffect(() =>{        
         return () =>{            
            dispatch({type:'INFORMES_RESET'})  
        };
      }, []);

    return(
        <div className="h-500 bg-white border-2 w-full flex-col justify-center p-1 overflow-x-auto">
          {
            registros.map((item, index)=>(
              <div key={index} className='h-52 flex-col float-left w-44 border  mr-1 mb-1'>
                  <img
                    alt="cliente"
                    className="h-36 w-full border p-1 rounded" 
                    src={`${apis}/static/images/clientes/md/` + item.filename}
                  />                        
          <div className='w-full p-1 flex-col bg-gray-100 text-gray-100'>
            <p className="text-gray-600 text-[13px] font-bold truncate pl-1">{item.cliente}</p> 
            <p className="text-gray-600 text-[13px] truncate pl-1"><Moment format="ll">{item.registro}</Moment> </p>
            <p className="text-gray-600 text-[13px] truncate pl-1"><Moment format="HH:mm:ss">{item.reg}</Moment> </p> 
          </div>

          </div> ))
          }
        </div> 
      
         )
    }



 
export default Asistencia;