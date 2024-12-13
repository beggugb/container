import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux'

import SelectData from '../../components/selects/SelectData'
const SelectSimpleForm = ({label,items,xredux,xreduxItem,payload,keyId,itemId}) =>{     
    const dispatch = useDispatch()      

    const getCharge = () =>{        
/*         dispatch(inventarioActions.getItems(xredux,payload))   */
    }
    
    useEffect(() => {
        getCharge()
        return () => {
           
        };
    }, []);
    
    const handleChange = event =>{        
        let io = event ? event.value: 0            
        /*dispatch({type:xreduxItem,name:keyId,value:io})        */
    }

    const handleDelete = () =>{                
        /*dispatch({type:xreduxItem,name:keyId,value:0})        */
    }

    return(                                  
        <div className='w-full flex'>
        <SelectData
         options={items}
         option={itemId}
         handleChange={handleChange}   
         handleDelete={handleDelete}                                                      
         name={keyId}/>          
        </div>                
    )
}

export default SelectSimpleForm