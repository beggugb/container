import React,{useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from 'react-redux'
import { inventarioActions } from '../../redux/actions/inventario'
import { custom } from '../../helpers/customStyles'
import { defaultVal } from '../../helpers/functions'
import Select from 'react-select'

const SearchCompuesto = ({xredux,payload,items}) =>{
    const dispatch = useDispatch()
    const [prop, setProp] = useState('observaciones');
    const [value, setValue] = useState("");  

    const submitHandle = event =>{
        event.preventDefault()
        let params = {
            value,
            prop
        }
        dispatch(inventarioActions.postSearch(xredux,payload,params))        
    }   
    
    const submitHandles = event =>{        
        let params = {
            value,
            prop
        }
        dispatch(inventarioActions.postSearch(xredux,payload,params))        
    } 

    const handleDelete = () =>{        
        let params = {
            value:"",
            prop
        }
        dispatch(inventarioActions.postSearch(xredux,payload,params)) 
        setValue("")
    }
    const changeSelect = (pky) => {    
        console.log(pky)    
        const { value } = pky
        setProp(value)
      };
return(
    <div className="w-1/2 flex-row flex">
        <div className="w-1/2 p-1">
                { value &&                  
                  <div                   
                  onClick={() => handleDelete()}
                  className="w-auto2/3 bg-stone-200 h-7 text-[12px] rounded p-1"
                  >
                  <FontAwesomeIcon icon={faTimes} />
                  <span className="ml-4">{value}</span>
                  </div>                                
                } 
        </div>
        <div className="w-1/2 flex">
                <form  onSubmit={ submitHandle} className="w-full">                                        
                        <input 
                            type="text" 
                            name="value" 
                            value={value} 
                            onChange={(e) => setValue(e.target.value)} 
                            className="w-full h-9 focus:border-gray-400 block shadow-sm sm:text-sm border-gray-300 rounded-md"/>                                                                                      
                </form> 
                <button 
                  onClick={()=>submitHandles()}                      
                  className="h-7 w-7 border z-10 -ml-9 mt-1 border-transparent shadow-sm text-sm font-medium rounded-full text-gray-700">
                  <FontAwesomeIcon icon={faSearch} />
                </button>   
        </div>
    </div>    
)}

export default SearchCompuesto