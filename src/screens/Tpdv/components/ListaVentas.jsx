import { useSelector} from 'react-redux'

const ListaVentas = () => {        
    const { vitems, item } = useSelector(state => state.venta) 
 
    return (     
        <div className='flex-col w-full'>           
        { vitems.length > 0 ?  
        <>
        <div className=''>     
                {vitems.map((it,index)=>(   
                    <div key={index} className="h-9 flex-1 border-b border-gray-300 w-full text-[13px]">            
                        <div className='h-4 flex w-full pl-1 truncate font-bold text-gray-500'>
                            {it.nombre}
                        </div>
                        <div className='h-4 flex w-full text-gray-500'>
                            <div className='w-3/6 flex italic'>
                               <div className='flex w-full justify-start mr-1 pl-1'>
                               p.unitario {' '} 
                            ({new Intl.NumberFormat('es-BO',{minimumFractionDigits: 2}).format(it.valor)})                            
                               </div>                            
                            </div>
                            <div className='w-1/6 flex italic'>
                             * {it.cantidad} = 
                            </div>
                            <div className='w-2/6 flex justify-center font-bold'>
                                <span>
                                    {new Intl.NumberFormat('es-BO',{minimumFractionDigits: 2}).format(it.subTotal)}
                                </span>                            
                            </div>
                        </div>
                    </div>
                ))}
                           
        </div>
        <div className="h-14 w-full flex-col text-[13px] font-bold bg-white mt-1">            
            <div className="h-7 flex pl-1 border-b text-gray-500 ">
                <div className="w-1/2 flex pt-1 pl-1">
                Cantidad:
                </div>
                <div className="w-1/2 flex border-l pt-1 pl-1">
                {item.cantidad}
                </div>             
            </div>
            <div className="h-7 pl-1 flex border-b border-white text-gray-500">
                <div className="w-1/2 flex pt-1 pl-1">
                Total:
                </div>
                <div className="w-1/2 flex border-l pt-1 pl-1">
                {new Intl.NumberFormat('es-BO',{style: "currency",currency:'BOB',minimumFractionDigits: 2}).format(item.totalGeneral)}
                </div>            
            </div>
        </div> 
        </> 
        : null
    } 
        </div>             
     );
}
 
export default ListaVentas;



