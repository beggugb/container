import React,{useState} from 'react';
import { ChevronDownIcon} from "@heroicons/react/20/solid";
import { defaultValsi  } from '../../helpers/functions'

const Select10 = ({options,option,handleChanges,name}) => {        
  const [view, setview] = useState(false);     
  const sample = defaultValsi(options?options:[],option?option:0)
    
  const handleExit = () =>{
    if(view){
      setview(false)         
    }      
  } 

  const handleChange = (ind,lb) =>{    
    setview(false)        
    handleChanges(ind,lb)
  }   
  
    
    return (  
      <div className="relative inline-block w-full text-[13px]">     
      <div         
        className="h-9 w-full flex  bg-slate-100 border border-gray-300"
        onClick={() => setview(!view)}>
          <div className="h-8 w-11/12 items-center flex pl-2  text-gray-500">
          {sample || ""}  
          </div>              
              <button                
                type="button"
                className="h-8 w-10 flex items-center justify-center rounded-r hover:bg-gray-200">
              <ChevronDownIcon className="h-7 text-gray-400" />
              </button>
        </div> 
        {view &&  
        <ul 
        onMouseLeave={() => handleExit()}
        className="absolute z-10  w-5/6 border bg-gray-50 rounded shadow-lg p-3">      
         { options.map((it, index) => (
              <li
              key={index}
              type="button"
              className="h-7 items-center flex text-gray-700 hover:bg-gray-200"
              onClick={()=>handleChange(name,it.value)}>
              {it.label}                
              </li>              
        ))} 
        </ul>   
     }  

        
    </div>                  
    );
}

export default Select10;

