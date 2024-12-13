import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetItem, usuariosCreate,usuariosUpdate } from '../../../../reducers/slices/usuarioSlice'
import { role } from '../../../../helpers/data'
import Switch from "react-switch";
import Select from '../../../../components/selects/SelectData'
import { CheckIcon } from '@heroicons/react/24/solid';

const UsuarioForm = () => {     
  const dispatch = useDispatch()  
  const {item} = useSelector(state => state.usuario)   
  const [password, setpassword] = useState('');
  const [nitem, setnitem] = useState({    
    enabled:false,
    nombre:"",
    nrol:"",
    rolId:1,
    sucursalId:1,
    username:""
  });


  const onChange = event => {    
    const { name, value } = event.target         
    setnitem({
       ...nitem,
       [name]:value
    })
  }

  
 
  
  const submitHandle = event => {       
      event.preventDefault()    
      if(item.id)
      {        
        dispatch(usuariosUpdate(nitem))
        clean()

      }else{
        dispatch(usuariosCreate(nitem))
      }    
      clean()
      
  }
  const submitHandles = event => {       
    event.preventDefault()    
    let nn ={
      id: item.id,
      usuarioId: item.id,
      password : password,
      bandera: 'pin'
    }    
    if(item.id)
    {      
      dispatch(usuariosUpdate(nn))
      clean()
    }  
    setpassword('')
}

  const changeHa = (checked) => {               
    setnitem({
      ...nitem,
      enabled:checked
   })
  }

  const clean = () => {               
    setnitem({
      enabled:false,
    nombre:"",
    nrol:"",
    rolId:1,
    sucursalId:1,
    username:""})
      dispatch(resetItem())
  }

 
  const onChangesd = (val) => {               
    const { value } = val
    setnitem({
      ...nitem,
      rolId:value
   })
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
  <div className='h-8 w-full border-b items-center justify-start flex bg-gray-50'>
      <button
      onClick={() => clean() }
      className='border w-14 h-7 bg-sky-400 rounded items-center ml-1 justify-center flex text-[12px] text-white font-bold'
      >
      Nuevo
      </button>            
  </div>
  <form onSubmit={submitHandle} className="rounded p-2 flex-col text-[12px] ">    
      <div className='w-full flex rounded-md mb-1'>
          <div className="w-full flex-col">
              <label htmlFor="nombre" className="p-1 font-bold text-gray-500">Nombre</label>
              <div className='border border-gray-300'>
                <input
                type="text"
                onChange={(e)=>{ onChange(e)}}                                                                    
                value={nitem.nombre}
                required={true}
                autoComplete='false'
                name="nombre"
                className="h-8 focus:ring-0 w-full border-none hover:bg-slate-100"/>
              </div>
          </div>                                                            
      </div> 
      <div className='w-full flex rounded-md mb-1'>
          <div className="w-full flex-col">
              <label htmlFor="rolId" className="p-1 font-bold text-gray-500">Rol</label>
               <Select
                options={role}
                option={nitem.rolId}                                    
                handleChange={onChangesd} 
                name={"rolId"}
                tipo={"valor"}/> 
          </div>                                                            
      </div>
      <div className='w-full flex rounded-md mb-1'>
          <div className="w-full flex-col">
              <label htmlFor="enabled" className="p-1 font-bold text-gray-500">Habilitado </label>
              <div className='flex'>
              <Switch                         
                  onChange={ changeHa }  
                  checked={nitem.enabled || false} 
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
              <label htmlFor="username" className="p-1 font-bold text-gray-500">Username</label>
              <div className='border border-gray-300'>
                <input
                type="text"
                onChange={(e)=>{ onChange(e)}}                                                                    
                value={nitem.username}      
                required={true}        
                name="username"
                autoComplete='false'
                className="h-8 focus:ring-0 w-full border-none hover:bg-slate-100"/>                                               
              </div>
          </div>                                                            
      </div>
     

      <div className='w-full flex rounded-md'>
          <div className="w-full flex-col">
          <button 
              type="submit"
              className={nitem.id ? "h-8 border w-full mt-1 rounded bg-orange-400 hover:bg-sky-300 p-1 text-[12px] text-white" : "h-8 border w-full mt-1 rounded bg-sky-400 hover:bg-sky-300 p-1 text-[12px] text-white"}>
              <CheckIcon className='h-5 w-5' />
              {' '} {nitem.id ? " Actualizar" : " Guardar"}
          </button>                    
          </div>                                                            
      </div>
  </form>   
  { item.id &&
  <form onSubmit={submitHandles} className="rounded p-2 flex-col text-[12px] ">    
      <div className='w-full flex rounded-md mb-1'>
          <div className="w-full flex-col">
              <label htmlFor="password" className="p-1 font-bold text-gray-500">Password</label>
              <input
              type="password"
              onChange={(e)=>{ setpassword(e.target.value) }}                                                                   
              value={password}              
              required={true}
              name="password"
              className="h-7 pt-2 pl-2 block w-full text-[12px] border text-gray-600 border-gray-300 rounded focus:bg-gray-50 focus:border-gray-100"/>                                               
          </div>                                                            
      </div>
     

      <div className='w-full flex rounded-md'>
          <div className="w-full flex-col">
          <button 
              type="submit"
              className="h-8 border w-full mt-1 rounded bg-sky-400 hover:bg-sky-300 p-1 text-[12px] text-white">
              <CheckIcon className='h-5 w-5' />
              Actualizar password
          </button>                    
          </div>                                                            
      </div>
  </form>    }              
</div> 
        
     );
}
 
export default UsuarioForm;
