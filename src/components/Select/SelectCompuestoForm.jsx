import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { inventarioActions } from '../../redux/actions/inventario'
import SelectData from '../../components/selects/SelectData'

const SelectCompuestoForm = ({items,xredux,xreduxItem,payload,keyId,itemId,parentId,yredux,ypayload}) =>{     
    const dispatch = useDispatch()      

    const getCharge = () =>{        
         dispatch(inventarioActions.getItems(xredux,payload))   
    }
    
    useEffect(() => {
        getCharge()
        return () => {
           
        };
    }, []);
    
    const handleChange = (vale) =>{        
        const { label, value } = vale
        let io = vale ? value: 0            
        dispatch({type:xreduxItem,name:keyId,value:io})    
        dispatch(inventarioActions.getLista(yredux,ypayload,io))    
    }

    return(    
        <> 
        <label htmlFor='categoriaId' className='w-1/3 pl-1'> Categoría </label>                 
        <div className='w-full flex'>
        <SelectData
         options={items}
         option={keyId}
         handleChange={handleChange}                                                         
         name={keyId}/>          
        </div>        
        </> 
    )
}

export default SelectCompuestoForm