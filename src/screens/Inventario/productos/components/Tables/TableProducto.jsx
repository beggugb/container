import React from "react";


const TableProducto = ({data,setIndicador,indicador}) =>{
    return(   
    <div className="flex-1 mx-auto p-1"> 
         <table className="border-collapse text-[13px] w-full">         
            <thead>
            <tr className="h-7 bg-gradient-to-t from-gray-200 to-gray-100 border text-[13px] text-gray-500">                                                      
                    <th className="w-1/12 border-r border-gray-300 ">#</th>                    
                    <th className="w-2/12 border-r border-gray-300">Código</th>
                    <th className="w-5/12 border-r border-gray-300">Nombre</th>
                    <th className="w-2/12 border-r border-gray-300">Categoría</th>
                    <th className="w-2/12">Industria</th>                    
                </tr>
            </thead>
            {data.length > 0 ?
            <tbody>
                { data.map((item,index) =>(
                <tr key={index} className="hover:bg-sky-100 text-gray-600 h-8 border-stone-300">
                    <td className="border text-center">
                        <input type="checkbox" 
                          onChange={() => { setIndicador(item.id) }} 
                          checked={ item.id === indicador ? true : false}
                          />
                    </td>                    
                    <td className="border pl-1">{item.codigo}</td>
                    <td className="border pl-1">{item.nombre}</td>
                    <td className="border pl-1">{item.categoria.nombre}</td>                    
                    <td className="border pl-1">{item.industria.nombre}</td>                    
                </tr>
                ))}
            </tbody>
            : 
            <tbody>                
                <tr>                    
                   <td colSpan={5}>Sin resultados</td>                                        
                </tr>                
            </tbody>
            }           
        </table> 
        </div>       
    )
}

export default TableProducto;