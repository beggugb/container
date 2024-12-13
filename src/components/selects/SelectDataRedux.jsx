import React,{useState} from 'react';
import { defaultValsi  } from '../../helpers/functions'
import { ChevronDownIcon, XMarkIcon} from "@heroicons/react/20/solid";

const SelectDataRedux = ({options,option,handleChange,handleDelete,name,redux}) => {  
    const [view, setview] = useState(false);         
    const sample = defaultValsi(options,option)
    
    
  const handleChanges = (value) => {             
      handleChange(value,name,redux)        
      setview(false)
  }     
       
  const handleExit = () =>{
    if(view){
      setview(false)         
    }      
  } 

  const handleDel = () =>{
    handleDelete(name,redux)
    if(view){
      setview(false)         
    }      
  } 
 

        
    return (  
      <div className="relative inline-block w-full text-[12px]">     
      <div         
        className="h-8 w-full flex">
          <div className="h-8 border-l border-gray-300 border-t border-b w-full items-center flex pl-2  text-gray-500 bg-white rounded-l">
          {sample} 
          </div>              
              <button
                onClick={() => handleDel()}
                type="button"
                className="h-8 w-6 flex border-t border-b border-gray-300  items-center justify-center">
              <XMarkIcon className={sample ? "h-5 text-gray-400":"h-5 text-white"} />
              </button>
              <button
                onClick={() => setview(!view)}
                type="button"
                className="h-8 w-6 flex border-r border-t border-b border-gray-300  items-center justify-center rounded-r hover:bg-gray-200">
              <ChevronDownIcon className="h-5 text-gray-400" />
              </button>
        </div> 

        {view &&  
        <ul 
        onMouseLeave={() => handleExit()}
        className="absolute z-10  w-40 border bg-gray-50 rounded shadow-lg p-3">      
          { options.map((it, index) => (
              <li                      
              key={index}
              type="button"
              className="h-6 items-center flex text-gray-700 hover:bg-gray-100"
              onClick={()=>handleChanges(it)}>
                  {it.label}</li>                
          ))}         
          </ul>   
          }
   
    </div>                  
    );
}

export default SelectDataRedux;
