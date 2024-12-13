import React from "react";

const TableProveedor = ({data,setIndicador,indicador}) =>{
    return(   
        <div className="flex-1 mx-auto p-1"> 
          <table className="border-collapse text-[12px] w-full">           
            <thead>
            <tr className="h-7 bg-gradient-to-t from-gray-200 to-gray-100 border text-[12px] text-gray-500">                                                        
                    <th className="w-1/12 border"></th>                    
                    <th className="w-1/12 border">Código</th>
                    <th className="w-5/12 border">Razon Social</th>                    
                    <th className="w-2/12 border">Nit</th>                    
                    <th className="w-2/12 border">Tipo</th>
                    <th className="w-1/12 border">Tipo Fiscal</th>
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
                    <td className="pl-1 border">{item.codigo}</td>                    
                    <td className="pl-1 border">{item.razonSocial}</td>
                    <td className="text-center border">{item.nit}</td>
                    <td className="pl-1 border">{item.tipoProveedor}</td>
                    <td className="pl-1 border">{item.tipoFiscal}</td>
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

export default TableProveedor;