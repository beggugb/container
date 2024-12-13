import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { inventarioActions } from '../../redux/actions/inventario'
import SelectData from '../../components/selects/SelectData'

const SelectCompUser = () =>{     
    const dispatch = useDispatch()      
    const { usuarioId } = useSelector(state => state.informes) 
    const items = useSelector(state => state.usuario.items)
    const getCharge = () =>{        
         dispatch(inventarioActions.getItems('usuariosLista','usuarios/intro'))   
    }
    
    useEffect(() => {
        getCharge()
        return () => {
           
        };
    }, []);
    
    const handleChange = (prop) =>{        
        const { label, value} = prop
        let io = prop ? value: 0            
        dispatch({type:'INFORMES_SET',name:'usuarioId',value:io})            
    }

    const handleDetele = () =>{
        dispatch({type:'INFORMES_SET',name:'usuarioId',value:0})            
    }

    return(  
            <div className=' p-1 flex-col'>
            <label htmlFor='usuarioId' className='w-1/3 pl-1'> Usuario :</label>    
            <div className='w-2/3 flex pl-1'>
                <SelectData
                options={items}
                option={usuarioId}
                handleChange={handleChange}   
                handleDelete={handleDetele}                                                      
                name={"usuarioId"}/>          
            </div>                         
            </div>        
    )
}

export default SelectCompUser