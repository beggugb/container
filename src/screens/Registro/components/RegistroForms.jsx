import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { registrosCreate, resetItem } from '../../../reducers/slices/registroSlice'

const RegistroForm = () => {  
    const dispatch = useDispatch()
    const [parametro, setparametro] = useState('');

    const submitHandle = event => {       
        event.preventDefault()                        
        dispatch(registrosCreate({ci:parametro}))
        setparametro('')   
        
        setTimeout(function(){            
            dispatch(resetItem())
          }, 10050);         
     }
    
     
    return ( 
        <div className="h-20 flex items-center bg-gray-50 justify-center w-full">
                <div className="w-full flex pl-2 pr-2">
                    <form  onSubmit={ submitHandle} className="w-full pl-2 pr-2 text-[20px]"> 
                    <label htmlFor="ci" className="h-8 p-1 font-bold text-gray-500">Ingrese Nro. de Identidad:</label>
                        <div className='border border-gray-400'>
                        <input 
                            type="text" 
                            name="parametro" 
                            value={parametro} 
                            autoComplete="off"
                            onChange={(e) => setparametro(e.target.value)} 
                            className="w-full h-9 focus:ring-0 border-none"/>
                        </div>                                                               
                    </form>                                         
                </div>            
        </div>
     );
}
 
export default RegistroForm;



                        
