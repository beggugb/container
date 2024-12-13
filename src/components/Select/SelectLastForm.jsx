import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { inventarioActions } from '../../redux/actions/inventario'
import Select from "react-select";
import { custom } from '../../helpers/customStyles'
import { defaultVal } from "../../helpers/functions"

const SelectSingleForm = ({items,xredux,payload, xreduxItem,keyId,itemId}) =>{     
    const dispatch = useDispatch()      

    const handleChange = event =>{        
        let io = event ? event.value: 0            
        dispatch({type:xreduxItem,name:keyId,value:io})        
    }

    const getCharge = () =>{        
        dispatch(inventarioActions.getItems(xredux,payload))   
   }
   
   useEffect(() => {
       getCharge()
       return () => {
          
       };
   }, []);
   

    return(        
                    
            <Select
                defaultValue={items[0]}
                name={keyId}
                id={keyId}
                options={items}      
                isClearable={false}                                   
                styles={custom}
                value={defaultVal(items,itemId)}
                onChange={(e)=>handleChange(e)}
            />
        
    )
}

export default SelectSingleForm