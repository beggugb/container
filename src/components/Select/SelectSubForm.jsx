import React from 'react'
import { useDispatch } from 'react-redux'
import { inventarioActions } from '../../redux/actions/inventario'
import Select from "react-select";
import { custom } from '../../helpers/customStyles'
import { defaultVal, defaultVals } from "../../helpers/functions"

const SelectSubForm = ({items,xreduxItem,keyId,itemId,parentId,yredux,ypayload}) =>{     
    const dispatch = useDispatch()          
    const handleChange = event =>{        
        let io = event ? event.value: 0            
        dispatch({type:xreduxItem,name:keyId,value:io})    
        dispatch(inventarioActions.getLista(yredux,ypayload,io))    
    }

    return(                    
            <Select
                defaultValue={items[0]}
                name={keyId}
                id={keyId}
                options={defaultVals(items,parentId)}      
                isClearable={false}                                   
                styles={custom}
                value={defaultVal(items,itemId)}
                onChange={(e)=>handleChange(e)}
            />        
    )
}

export default SelectSubForm