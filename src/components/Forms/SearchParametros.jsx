import React,{useState} from "react";
import { useDispatch } from 'react-redux'
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const SearchParametros = ({xredux,payload,inicial}) =>{
    const dispatch = useDispatch()    
    const [value, setValue] = useState("");  

    const submitSearch = event =>{
        event.preventDefault()
        let params = {
            value, 
            prop: inicial
        }
/*        dispatch(inventarioActions.postSearch(xredux,payload,params))        */
    }      

    const handleDelete = () =>{        
        let params = {
            value:"",
            prop: inicial
        }
/*        dispatch(inventarioActions.postSearch(xredux,payload,params)) */
        setValue("")
    }

return(
        <form onSubmit={submitSearch} className="rounded w-full flex-col text-[12px] ">                
                <div className="w-full flex p-1">                    
                    <input
                        type="text" 
                        name="value" 
                        value={value || ''} 
                        onChange={(e) => setValue(e.target.value)} 
                        className="h-8 pt-2 pl-2 block w-full text-[12px] border text-gray-600 border-gray-300 rounded focus:bg-gray-50 focus:border-gray-100"/>                                                   
                    <button
                        onClick={() => handleDelete()}
                        type="button"
                        className={value ? "h-8 w-10 -ml-20 z-10 text-sm text-red-400":"h-8 w-10 -ml-20 z-10 text-sm text-white" }>
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                    <button
                        type="submit"
                        className="h-8 w-10 z-0 text-sm text-gray-600">  
                        <MagnifyingGlassIcon className="h-5 w-5"/>
                    </button>    
                </div>                                                                        
        </form>                    
    
)}

export default SearchParametros