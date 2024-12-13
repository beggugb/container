import React from 'react'
import { useDispatch } from 'react-redux'
import Select from '../../components/selects/Select'

const SelectLocalForm = ({label,items,xreduxItem,keyId,itemId}) =>{     
    const dispatch = useDispatch()     
    
    const handleChange = (pky,vale) =>{                        
        dispatch({type:xreduxItem,name:pky,value:vale})        
    }

    return(     
        /*options,option,handleChange,name,tipo*/      
            <Select
            options={items}
            option={itemId}
            handleChange={handleChange}
            name={keyId}
            tipo={'local'}   
            />        
    )
}

export default SelectLocalForm