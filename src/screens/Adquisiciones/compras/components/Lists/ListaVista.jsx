import React from 'react';
const ListaVista = ({item}) =>{    
    return(
        <>            
            <td className='text-gray-600 pl-1 border'>{item.codigo}</td>
            <td className='text-gray-600 pl-1 border'>{item.nombre}</td>
            <td className='text-gray-600 pl-1 border'>{item.categoria}</td>
            <td className='text-gray-600 pl-1 border'>{item.marca}</td>
            <td className='text-gray-600 border text-center'>{new Intl.NumberFormat('es-BO',{minimumFractionDigits: 2}).format(item.valor)}</td>
            <td className='text-gray-600 border text-center'>{item.cantidad}/{item.unidad} </td>            
            <td className='text-gray-600 border text-center'>{new Intl.NumberFormat('es-BO',{minimumFractionDigits: 2}).format(item.subTotal)}</td>         
        </>                        
    )
}
export default ListaVista