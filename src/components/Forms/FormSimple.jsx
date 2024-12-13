import React from "react";
const FormSimple = ({handleChange,item,submitHandle}) =>{      
    return(        
    <div className="bg-white px-2  mb-2 flex flex-col w-full"> 
        <form onSubmit={ submitHandle}>
        <div className="-mx-3">
            <div className="md:w-full mb-1">
            <label className="block text-gray-500 tracking-wide text-grey-darker text-[12px] font-bold mb-2">
                Nombre
            </label>
            <div className="border border-gray-300">
            <input                 
                id="nombre" 
                name="nombre"
                type="text" 
                autoComplete="off"
                value={item.nombre}
                required={true}
                onChange={(e)=>{ handleChange(e)}} 
                className="h-8 border-none w-full text-[13px] text-gray-500 focus:ring-0" />                
            </div>                            
            </div>   
        </div>  
        <div className="-mx-3">
            <div className="md:w-full mb-1">
            <label className="block text-gray-500 tracking-wide text-grey-darker text-[12px] font-bold mb-2">
                Abreviación
            </label>
            <div className="border border-gray-300">
            <input                 
                id="abreviacion" 
                name="abreviacion"
                value={item.abreviacion}
                autoComplete="off"
                onChange={(e)=>{ handleChange(e)}} 
                type="text" 
                className="h-8 border-none w-full text-[13px] text-gray-500 focus:ring-0" />                                
                </div>
            </div>   
        </div>
        <div className="-mx-3 flex">
            <button 
                type="submit"
                className={item.id ? "h-8 w-full mt-1 rounded bg-orange-400 hover:bg-orange-300 p-1  text-[12px] text-white":"h-8 w-full mt-1 rounded bg-sky-400 hover:bg-sky-300 p-1  text-[12px] text-white"}>
              
                {' '} {item.id ? " Actualizar" : " Guardar"}
            </button>
        </div>
      </form>  
    </div>          
    )    
}

export default FormSimple