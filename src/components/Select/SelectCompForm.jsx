import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { inventarioActions } from '../../redux/actions/inventario'
import SelectData from '../../components/selects/SelectData'

const SelectCompForm = () =>{     
    const dispatch = useDispatch()      
    const { categoriaId } = useSelector(state => state.informes) 
    const items = useSelector(state => state.categoria.items)
    const getCharge = () =>{        
         dispatch(inventarioActions.getItems('categoriasLista','categorias'))   
    }
    
    useEffect(() => {
        getCharge()
        return () => {
           
        };
    }, []);
    
    const handleChange = event =>{        
        let io = event ? event.value: 0            
        dispatch({type:'INFORMES_SET',name:'categoriaId',value:io})            
    }

    const handleDelete = () =>{
        dispatch({type:'INFORMES_SET',name:'categoriaId',value:0})            
    }

    return(  
            <div className='flex-col'>
             <label htmlFor='categoriaId' className='w-1/3 pl-2'> Categoría </label>      
             <div className='w-full flex pl-2 pr-2'>
                <SelectData
                options={items}
                option={categoriaId}
                handleChange={handleChange}     
                handleDelete={handleDelete}                                                     
                name={"categoriaId"}/>          
             </div>            
            </div>        
    )
}

export default SelectCompForm