import React from 'react'
import { useDispatch } from 'react-redux'
import Select from "react-select";
import { custom } from '../../helpers/customStyles'
import { defaultVal } from "../../helpers/functions"

const SelectLocal = ({label,item,items,xreduxItem,keyId,itemId}) =>{     
    const dispatch = useDispatch()     
    
    const handleChange = event =>{        
        let io = event ? event.value: 0            
        dispatch({type:xreduxItem,name:keyId,value:io})        
    }

    return(
        <div className="-mx-3">
          <div className="mb-1">
            <label className="ml-3 block text-gray-500 tracking-wide text-grey-darker text-xs font-bold mb-2">
                {label}
            </label>
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
          </div>   
        </div>      
    )
}

export default SelectLocal