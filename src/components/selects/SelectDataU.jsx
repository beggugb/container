import React,{useState} from 'react';
import { defaultValsi  } from '../../helpers/functions'
import { ChevronDownIcon, XMarkIcon} from "@heroicons/react/20/solid";

const SelectDataU = ({options,option,handleChange}) => {  
    const [view, setview] = useState(false);         
    const sample = defaultValsi(options,option)
    
    
  const handleChanges = (value) => {             
      handleChange(value)        
      setview(false)
  }     
       
  const handleExit = () =>{
    if(view){
      setview(false)         
    }      
  } 


 

        
    return (  
      <div className="relative inline-block w-full text-[13px]">     
      <div      
      onClick={() => setview(!view)}   
        className="h-8 w-full flex">
          <div className="h-8 border-l border-gray-300 border-t border-b w-full items-center flex pl-2  text-gray-500 bg-white rounded-l">
          {sample} 
          </div>                          
              <button
                className="h-8 w-10 flex border-r border-t border-b border-gray-300  items-center justify-center rounded-r">
              <ChevronDownIcon className="h-7 text-gray-400" />
              </button>
        </div> 

        {view &&  
        <ul 
        onMouseLeave={() => handleExit()}
        className="absolute z-10  w-full border bg-slate-500 rounded-b shadow-lg pt-1 pl-4 pr-4 -mt-1">    
            <li                                    
              type="button"
              className="h-7 items-center flex text-gray-50 hover:text-gray-500 hover:font-bold hover:bg-gray-100 border-b border-gray-300"
              onClick={()=>handleChanges(0)}>
                 Todos
            </li>   
          { options.map((it, index) => (
              <li                      
              key={index}
              type="button"
              className="h-7 items-center flex text-gray-50 hover:text-gray-500 hover:font-bold hover:bg-gray-100 border-b border-gray-300"
              onClick={()=>handleChanges(it)}>
                  {it.label}</li>                
          ))}         
          </ul>   
          }
   
    </div>                  
    );
}

export default SelectDataU;
