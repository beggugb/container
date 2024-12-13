import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { _validateConfig, _itemCliente  } from '../../../data/models'
import { _ciudades, tipoGenero } from '../../../data/dataLoad'
import { clientesData, resetItem, clientesUpdate, clientesCreate } from '../../../reducers/slices/clienteSlice'
import Select from '../../../components/selects/Select'
import FormImg from '../../../components/frms/FormImg'
import { XMarkIcon } from '@heroicons/react/24/solid'


const ClienteForm = ({views,setviews,pagina,prop,parametro}) => {   
  const dispatch = useDispatch()  
  const { item } = useSelector(state => state.cliente)  
  const [nitem, setnitem] = useState({
    id:0,
    nombres:"",
    ci: "",
    nit: "",
    sexo: "",
    ciudad: "",
    telefono: "",
    celular: "",
    direccion: "",
    email: "",
    estado:true
});
  const [errors, seterrors] = useState({
    nombres:"",
    apellidos:"",
    direccion:"",
    telefono:"",
    nit:"",
    email:""
}); 


useEffect(() => {
    if(item.id){           
       setnitem(item)                     
    }       
    return () => {   
      setnitem({
        id:0,
        nombres:"",
        ci: "",
        nit: "",
        sexo: "",
        ciudad: "",
        telefono: "",
        celular: "",
        direccion: "",
        email: "",
        estado:true
      })
    };
}, [item]);


const handleSubmit = event =>{    
    event.preventDefault();     
    /*item, page, num, prop, params*/                    
    if(item.id){                            
        let iok={
            id     : item.id,
            tip    : "list",
            item   : nitem, 
            page   : pagina, 
            num    : 14,  
            prop   : prop, 
            params : parametro
        }    
        dispatch(clientesUpdate(iok))        
    }else{          
        dispatch(clientesCreate(nitem))
    }    
    
} 

const setSviews = ()  =>{
    dispatch(resetItem())
    setviews(false)
    let iok={
        page : 1,
        num  : 14,
        prop : "nombres",
        params: ""
    }      
    dispatch(clientesData(iok))
}

const handleChanges = (prp,val) =>{  
    setnitem({
        ...nitem,
        [prp]: val
    })
    let found = _itemCliente.find(it => it.label === prp);   
        if(found){
            let nn = _validateConfig(found.type,val)
            seterrors({
                ...errors,
                [found.label]:nn
            })
        }           
}

const handleChange = (prp,val) =>{
    setnitem({
        ...nitem,
        [prp]: val
    })
}
    return ( 
        <>
    { views ?
        <>
        <div className="justify-center items-center flex-1 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-5xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <button 
            className="w-7 h-7 bg-red-500 rounded-full flex items-center justify-center m-1"
            onClick={() => setSviews()}>
            <XMarkIcon className='h-6 w-6 text-gray-50' />
          </button>  
            {/*body*/}

            <div className="h-500 p-1 flex flex-row border-4">   
                <div className="w-1/3 border flex-col">
                    <div className='h-8 border-b bg-gradient-to-t from-gray-200 to-gray-100 flex items-center pl-2'>
                        <span className='font-bold ml-1 text-gray-500 text-[13px] uppercase'>  
                            Imagen
                        </span>
                    </div>
                    <div className='m-4 flex justify-center items-center p-2'>                        
                        <FormImg
                            item={item}
                            payload={"cliente"}
                            payloads={"clientes"}/>                        
                    </div>          
                </div>     
                <div className="w-2/3 border ml-1">  
                    <div className='h-8 border-b bg-gradient-to-t from-gray-200 to-gray-100 flex items-center pl-2'>
                        <span className='font-bold ml-1 text-gray-500 text-[13px] uppercase'>  
                            Datos de cliente
                        </span>
                    </div>  
                    <form onSubmit={handleSubmit} className="p-2 flex-col text-[13px] ">    
                        <div className='flex-col flex w-full'>
                            <label htmlFor="nombres" className="h-7 p-1 font-bold text-gray-500">Nombres</label>
                            <div className='border w-full border-gray-300'>
                                <input
                                        type="text"
                                        onChange={(e)=>handleChanges(e.target.name,e.target.value)}                                                        
                                        value={nitem.nombres}
                                        autoComplete='false'
                                        required={true}
                                        name="nombres"
                                        className="h-8 pt-2 border-none block text-[13px] pl-2 w-full focus:ring-0 focus:bg-slate-200 bg-stone-100 text-gray-500"/>
                                        {errors.nombres && <p className="pl-2 text-[13px] italic text-red-400">{errors.nombres}</p>}                        
                            </div>                            
                        </div>
                        <div className='flex w-full'>
                            <div className='flex-col flex w-1/3 pr-1'>
                                <label htmlFor="ci" className="h-7 p-1 font-bold text-gray-500">CI</label>
                                <div className='border w-full border-gray-300'>
                                    <input
                                            type="text"
                                            onChange={(e)=>handleChanges(e.target.name,e.target.value)}                                                
                                            value={nitem.ci}
                                            required={true}
                                            name="ci"
                                            className="h-8 pt-2 border-none block text-[13px] pl-2 w-full focus:ring-0 focus:bg-slate-200 bg-stone-100 text-gray-500"/>                                            
                                </div>                            
                            </div>
                            <div className='flex-col flex w-1/3 pr-1'>
                                <label htmlFor="nit" className="h-7 p-1 font-bold text-gray-500">NIT</label>
                                <div className='border w-full border-gray-300'>
                                    <input
                                            type="text"
                                            onChange={(e)=>handleChanges(e.target.name,e.target.value)}    
                                            value={nitem.nit}
                                            name="nit"
                                            className="h-8 pt-2 border-none block text-[13px] pl-2 w-full focus:ring-0 focus:bg-slate-200 bg-stone-100 text-gray-500"/>                                      
                                </div>                            
                            </div>
                            <div className='flex-col flex w-1/3'>
                                <label htmlFor="nombres" className="h-7 p-1 font-bold text-gray-500">Genero</label>
                                <div className='sexo w-full border-gray-300'>
                                    <Select
                                        options={tipoGenero}
                                        option={nitem.sexo}                                    
                                        handleChange={handleChange} 
                                        name={"sexo"}
                                        tipo={"local"}/>                                        
                                </div>                            
                            </div>
                        </div>

                        <div className='flex w-ful'>
                            <div className='flex-col flex w-1/3 pr-1'>
                                <label htmlFor="telefono" className="h-7 p-1 font-bold text-gray-500">Teléfono</label>
                                <div className='border w-full border-gray-300'>
                                    <input
                                            type="text"
                                            onChange={(e)=>handleChanges(e.target.name,e.target.value)}                                                                        
                                            value={nitem.telefono}                                            
                                            name="telefono"
                                            className="h-8 pt-2 border-none block text-[13px] pl-2 w-full focus:ring-0 focus:bg-slate-200 bg-stone-100 text-gray-500"/>                                            
                                </div>                            
                            </div>
                            <div className='flex-col flex w-1/3 pr-1'>
                                <label htmlFor="celular" className="h-7 p-1 font-bold text-gray-500">Celular</label>
                                <div className='border w-full border-gray-300'>
                                    <input
                                            type="text"
                                            onChange={(e)=>handleChanges(e.target.name,e.target.value)}                                                                       
                                            value={nitem.celular}
                                            name="celular"
                                            className="h-8 pt-2 border-none block text-[13px] pl-2 w-full focus:ring-0 focus:bg-slate-200 bg-stone-100 text-gray-500"/>                                      
                                </div>                            
                            </div>
                            <div className='flex-col flex w-1/3'>
                                <label htmlFor="ciudad" className="h-7 p-1 font-bold text-gray-500">Ciudad</label>
                                <div className='sexo w-full border-gray-300'>
                                <Select
                                      options={_ciudades}
                                      option={nitem.ciudad}                                    
                                      handleChange={handleChange} 
                                      name={"ciudad"}
                                      tipo={"local"}/>                                       
                                </div>                            
                            </div>
                        </div>

                        <div className='flex w-ful'>                        
                            <div className='flex-col flex w-full'>
                                <label htmlFor="email" className="h-7 p-1 font-bold text-gray-500">Email</label>
                                <div className='border w-full border-gray-300'>
                                    <input
                                            type="text"
                                            onChange={(e)=>handleChanges(e.target.name,e.target.value)}                                                                     
                                            value={nitem.email}
                                            name="email"
                                            className="h-8 pt-2 border-none block text-[13px] pl-2 w-full focus:ring-0 focus:bg-slate-200 bg-stone-100 text-gray-500"/>                                      
                                             {errors.email && <p className="italic text-red-400">{errors.email}</p>} 
                                </div>                            
                            </div>                          
                        </div>

                        <div className='flex-col flex w-full'>
                            <label htmlFor="direccion" className="h-7 p-1 font-bold text-gray-500">Dirección</label>
                            <div className='border w-full border-gray-300'>
                                <textarea
                                        type="text"
                                        onChange={(e)=>handleChanges(e.target.name,e.target.value)}                                                                   
                                        value={nitem.direccion}                                        
                                        name="direccion"
                                        rows={3}
                                        className="pt-2 border-none block text-[13px] pl-2 w-full focus:ring-0 focus:bg-slate-200 bg-stone-100 text-gray-500"/>
                                        
                            </div>                            
                        </div>
                        <div className='flex-col flex w-full pt-2'>
                                    <button
                                        type="submit"
                                        className={errors.nombres === "" && errors.ci === "" ? 'h-10 w-40 border bg-sky-500  hover:bg-sky-300 rounded-md':'h-10 w-40 border bg-orange-400  hover:bg-orange-300 rounded-md'}>                                    
                                        <span className='font-bold  text-gray-50'>{item.id ? "Actualizar": "Registrar"}</span>
                                    </button>

                        </div>                       
                        
                    </form>                
                  </div>         


                   
            </div>
            {/*footer*/}                       
            </div>
        </div>
      </div>
      <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
      </>
        : null  }
        </> 
     );
}
 
export default ClienteForm;



                        
