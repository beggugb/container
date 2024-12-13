import React,{ useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector} from 'react-redux'


const InputSearch = () =>{
    const dispatch = useDispatch()    
    const pitems  = useSelector(state => state.producto)    
    const [name, setname] = useState("");
    const [view, setview] = useState(false);            

    const handleSearch = () =>{
        let dato = {
            prop: 'nombre',
            value: name
        }        
        /*dispatch(inventarioActions.postSearchs('productosItems','productos',dato))*/
        setview(true)
    }
    const asignar = (it) =>{                        
        setname(it.nombre)
        /*dispatch({type:'INFORMES_SET',name:'productoId',value:it.id}) */
        setview(false)
        
    }

    const handleDelete = () =>{
        setname('')
        /*dispatch({type:'INFORMES_SET',name:'productoId',value:''})*/
    }
      



    return( 
        <>
    <div className="h-12 bg-white w-full rounded mb-2 mt-2">
            <label className="p-2">
                Producto
            </label>
        <div className="flex-row flex pl-2 pr-2">            
            <input 
                className="h-8 w-full border-gray-300 block bg-grey-lighter text-gray-500 text-[10px] rounded px-2 " 
                id="name" 
                name="name"
                type="text" 
                value={name}
                onChange={(e) => setname(e.target.value)}
            /> 
             
            {name ?
            <>
            <button 
            onClick={() => handleDelete()}
            className="h-8 w-7 border z-10 -ml-14 border-transparent shadow-sm text-[14px] font-medium rounded-full text-gray-600">
                <FontAwesomeIcon icon={faTimes} />
            </button>
            <button 
            onClick={() => handleSearch()}
            className="h-8 w-7 border z-10 -ml-2 border-transparent shadow-sm text-[14px] font-medium rounded-full text-gray-600">
                <FontAwesomeIcon icon={faSearch} />
            </button></>
            :
            <button 
            onClick={() => handleSearch()}
            className="h-8 w-8 border z-10 -ml-9 border-transparent shadow-sm text-[14px] font-medium rounded-full text-gray-600">
                <FontAwesomeIcon icon={faSearch} />
            </button>
            }
        </div>  

        </div>            
        { view ?  
        <div className="mt-1 w-52">          
            <ul className="border rounded p-1">
                { pitems.map((item,index) =>(
                    <li
                        key={index}
                        onClick={(e) => asignar(item)}
                        className="h-auto p-1 text-[12px] bg-sky-600 text-white border border-b hover:text-white"
                    >
                    {item.nombre} - ({item.categoria.nombre})
                    </li>                
                ))}
            </ul>                    
            </div>    : null
        }           

        </> 
    )

}


export default InputSearch