import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetItem, paquetesCreate,paquetesUpdate } from '../../../../reducers/slices/paqueteSlice'
import Switch from "react-switch";


const PaqueteForm = () => {     
  const dispatch = useDispatch()  
  const {item} = useSelector(state => state.paquete)   
  const [nitem, setnitem] = useState({
    nombre:"",
    valor:0,
    enabled:false,
    diario:false,
    meses:0
  });

  const onChange = event => {    
    const { name, value } = event.target         
     setnitem({
        ...nitem,
        [name]:value
     })
  }
  
  const changeHa = (checked) => {               
    setnitem({
        ...nitem,
        diario:checked
     }) 
  }


 const changeAA = (checked) => {               
    setnitem({
        ...nitem,
        enabled:checked
     }) 
 }
  
  const submitHandle = event => {       
      event.preventDefault()    
      if(item.id)
      {        
        dispatch(paquetesUpdate(nitem))
        clean()

      }else{
        dispatch(paquetesCreate(nitem))
      }    
      clean()
      
   }

   const clean = () => {               
    setnitem({
    nombre:"",
    valor:0,
    enabled:false,
    diario:false,
    meses:0})
    dispatch(resetItem())
 }

useEffect(() => {
    if(item.id){
        setnitem(item)
    }
    return () => {
        
    };
}, [item]);

 return (  
    <div className="border w-full rounded"> 
        <div className='h-8 w-full border-b items-center justify-start flex bg-gradient-to-t from-gray-200 to-gray-100'>
            <button
            onClick={() => clean() }
            className='w-14 h-8 bg-sky-400 rounded items-center ml-1 justify-center flex text-[13px] text-white font-bold'
            >
            Nuevo
            </button>            
        </div>
        <form onSubmit={submitHandle} className="rounded p-2 flex-col text-[13px] ">    
            <div className='w-full flex rounded-md mb-1'>
                <div className="w-full flex-col">
                    <label htmlFor="nombre" className="p-1 font-bold text-gray-500">Nombre</label>
                    <input
                    type="text"
                    onChange={(e)=>{ onChange(e)}}                                                                    
                    value={nitem.nombre}
                    required={true}
                    name="nombre"
                    className="h-8 pt-2 pl-2 block w-full text-[13px] border text-gray-600 border-gray-300 rounded focus:bg-gray-50 focus:border-gray-100"/>                                               
                </div>                                                            
            </div> 
            <div className='w-full flex rounded-md mb-1'>
                <div className="w-full flex-col">
                    <label htmlFor="valor" className="p-1 font-bold text-gray-500">Valor (Bs.)</label>
                    <input
                    type="number"
                    onChange={(e)=>{ onChange(e)}}                                                                    
                    value={nitem.valor}
                    name="valor"
                    className="h-8 pt-2 pl-2 block w-full text-[13px] border text-gray-600 border-gray-300 rounded focus:bg-gray-50 focus:border-gray-100"/>                                               
                </div>                                                            
            </div>
            <div className='w-full flex rounded-md mb-1'>
                <div className="w-full flex-col">
                    <label htmlFor="enabled" className="p-1 font-bold text-gray-500">Habilitado </label>
                    <div className='flex'>
                    <Switch                         
                        onChange={ changeAA }  
                        checked={nitem.enabled} 
                        offColor="#ef4444"  
                        onColor="#4ade80"      
                        height={20}       
                        width={47}
                        onHandleColor="#737373"
                        offHandleColor="#737373"            
                        />
                    </div>    
                </div>                                                            
            </div>
            <div className='w-full flex rounded-md mb-1'>
                <div className="w-full flex-col">
                    <label htmlFor="meses" className="p-1 font-bold text-gray-500">Meses</label>
                    <input
                    type="number"
                    onChange={(e)=>{ onChange(e)}}                                                                    
                    value={nitem.meses}
                    step="0.01"
                    name="meses"
                    className="h-8 pt-2 pl-2 block w-full text-[13px] border text-gray-600 border-gray-300 rounded focus:bg-gray-50 focus:border-gray-100"/>                                               
                </div>                                                            
            </div>
            <div className='w-full flex rounded-md mb-1'>
                <div className="w-full flex-col">
                    <label htmlFor="diario" className="p-1 font-bold text-gray-500">Diario </label>
                    <div className='flex'>
                    <Switch                         
                        onChange={ changeHa }  
                        checked={nitem.diario} 
                        offColor="#ef4444"
                        onColor="#4ade80"      
                        height={20}       
                        width={47}
                        onHandleColor="#737373"
                        offHandleColor="#737373"              
                        />
                    </div>
                    
                </div>                                                            
            </div>

            <div className='w-full flex rounded-md mt-2'>
                <button 
                    type="submit"
                    className={nitem.id ? "h-8 w-full mt-1 rounded bg-orange-400 hover:bg-sky-300 p-1 text-[11px] text-white" : "h-8 w-full mt-1 rounded bg-sky-400 hover:bg-sky-300 p-1 text-[11px] text-white"}>                    
                    {' '} {nitem.id ? " Actualizar" : " Guardar"}
                </button>                                                                  
            </div>
        </form>                    
    </div>     
  );
}
 
export default PaqueteForm;