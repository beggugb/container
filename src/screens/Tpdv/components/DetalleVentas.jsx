const DetalleVentas = ({item}) => {    
    return ( 
        <div className="h-14 w-full flex-col text-[13px] font-bold bg-white">            
            <div className="h-7 flex pl-1 border-b text-gray-500 ">
                <div className="w-1/2 flex pt-1 pl-1">
                Cantidad:
                </div>
                <div className="w-1/2 flex border-l pt-1 pl-1">
                {item.nroItems}
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
     );
}
 
export default DetalleVentas;



