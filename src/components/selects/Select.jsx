import React,{useState} from 'react';
import { ChevronDownIcon} from "@heroicons/react/20/solid";


const Select = ({options,option,handleChange,name,tipo}) => {  
  const [view, setview] = useState(false);     
    
  const handleChanges = (e,ii) => {     
    if(tipo === "local"){        
        handleChange(name,e)
    }
    if(tipo === "compuesto"){        
        const { textContent} = e.target        
        handleChange(name,textContent,ii)    
    }      
    if(tipo === "valor"){              
     const { value } = e      
      handleChange(value)    
  }           
    setview(false)
  }            
  const handleExit = () =>{
    if(view){
      setview(false)         
    }      
  }   
  
  const componente = (it,index) =>{     
    if(tipo === "local"){
        return(   
            <li
            key={index}
            className="h-7 items-center flex text-gray-700 hover:bg-gray-100"
            onClick={()=>handleChanges(it.label)}>
            {it.label}                
            </li>  
        )
    }  
    if(tipo === "compuesto"){
        return(   
            <li                      
            key={index}
            className="h-7 items-center flex text-gray-700 hover:bg-gray-100"
            onClick={(e)=>handleChanges(e,it.indice)}>
            {it.label}
            </li>         
        )
    }  
    if(tipo === "valor"){
      return(   
          <li                      
          key={index}
          className="h-7 items-center flex text-gray-700 hover:bg-gray-100"
          onClick={(e)=>handleChanges(it)}>
          {it.label}
          </li>         
      )
  } 
  }
  
    
    return (  
      <div className="relative inline-block w-full text-[13px]">     
      <div         
        className="h-8 w-full flex">
          <div className="h-8 border-l border-gray-300 border-t border-b w-11/12 items-center flex pl-2  text-gray-500 bg-white rounded-l">
          {option || ""}  
          </div>              
              <button
                onClick={() => setview(!view)}
                type="button"
                className="h-8 w-10 flex border-r border-t border-b border-gray-300 items-center justify-center rounded-r hover:bg-gray-200">
              <ChevronDownIcon className="h-7 text-gray-400" />
              </button>
            
        </div> 
        {view &&  
        <ul 
        onMouseLeave={() => handleExit()}
        className="absolute z-10  w-40 border bg-gray-50 rounded shadow-lg p-3">      
         { options.map((it, index) => (
            componente(it,index)                
        ))} 
        </ul>   
     }  

        
    </div>                  
    );
}

export default Select;

