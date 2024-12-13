import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave  } from "@fortawesome/free-solid-svg-icons";

const CajaForm = ({item,parametro,setparametro,submitHandle}) => {  
    return ( 
        <div className="h-14 flex-1 mx-auto border-gray-300 p-3">
            <div className="flex flex-row">
                <div className="w-2/4 col-span-2 p-2 font-bold text-stone-500">
                   Gestion de Cajas
                </div>
                <div className="w-2/4">
                    <form  onSubmit={ submitHandle} className="flex flex-row">                                        
                        <div className="w-4/5">                        
                        <input 
                           type="number" 
                           name="parametro" 
                           value={parametro} 
                           onChange={(e) => setparametro(e.target.value)} 
                           className="w-full h-9 focus:border-gray-400 block shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>
                        <div className="w-1/5 pt-1">                        
                        <button 
                            type="submit"
                            onClick={()=>submitHandle()}                      
                            className="h-7 w-8 ml-2 bg-sky-500 text-white rounded-full">
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        </div>
                    </form>
                </div>                
            </div>
        </div>
     );
}
 
export default CajaForm;



                        
