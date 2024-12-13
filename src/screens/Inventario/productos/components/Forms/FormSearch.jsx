import React,{useState} from "react";
import { useDispatch } from 'react-redux'
import { inventarioActions } from '../../redux/actions/inventario'
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";




const FormSearch = ({xredux,payload}) =>{
    const dispatch = useDispatch()    
    const [value, setValue] = useState("");  

    const submitSearch = event =>{
        event.preventDefault()
        let params = {
            value: value,
            prop: "nombre"
        }      
        dispatch(inventarioActions.postSearch(xredux,payload,params))        
    }  
    const submitSearchs = ()=>{        
        let params = {
            value: value,
            prop: "nombre"
        }      
        dispatch(inventarioActions.postSearch(xredux,payload,params))        
    }  
       const handleDelete = () =>{        
        let params = {
            value:"",
            prop: "nombre"
        }
        dispatch(inventarioActions.postSearch(xredux,payload,params)) 
        setValue("")
    }
return(
    <div className="h-8 flex w-full items-center">
        <div className="w-1/2"></div>
        <div className="w-1/2 mr-1 flex">
            <form  onSubmit={ submitSearch } className="w-full z-0">                                        
                <input 
                type="text" 
                name="parametro" 
                value={value || ''} 
                onChange={(e) => setValue(e.target.value)} 
                className="w-full h-8 focus:border-gray-400 block shadow-sm sm:text-[12px] border-gray-300 rounded"/>                                                                                      
            </form> 
            <button   
                onClick={() => handleDelete()}
                type="button"                    
                className="h-8 w-7 border z-10 -ml-14 border-transparent shadow-sm text-[12px] font-medium rounded-full text-gray-600">
                <XMarkIcon className={value ? "h-6 w-6 text-red-500" :"h-6 w-6 text-white" }/>                
            </button>
            <button   
                onClick={() => submitSearchs()}
                type="button"                    
                className="h-8 w-7 border z-10 border-transparent shadow-sm text-[12px] font-medium rounded-full text-gray-600">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
            </button>
        </div>     
    </div>      
)}

export default FormSearch