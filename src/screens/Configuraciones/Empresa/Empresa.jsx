import React,{useEffect} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSave } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux'
import { custom } from '../../../helpers/customStyles'
import {crudActions} from '../../../redux/actions/crud'


const Empresa = () => {   
    const dispatch = useDispatch()    
    const {item} = useSelector(state => state.empresa)  
  

  const handleChange = event =>{
    const { name, value } = event.target      
    dispatch({type:'EMPRESAS_CHANGE',props:name,value:value})
  }

  const submitHandle = event =>{
    event.preventDefault()        
    dispatch(crudActions.putUnit('empresas',item)) 
  }
 
  useEffect(() =>{       
    dispatch(crudActions.getItem('EMPRESAS_ITEM','empresas','unit',1))     
    return () =>{             
      /*  dispatch(crudActions.setReset('EMPRESAS_RESET'))               */
    };
  }, []);

    
return ( 
    <div className="h-80 flex-1 mx-auto mb-10 p-1">
       <div className="mt-1 border-2 bg-white">
        <h5 className="h-7 p-2 font-bold">Datos Básicos</h5>

            <div className="flex flex-row mt-1"> 
                <form onSubmit={ submitHandle} className="w-full">
                    <div className="flex-row flex">
                    <div className="w-4/5 p-2">
                        <label className="block text-gray-500 tracking-wide text-grey-darker text-sm font-bold mb-2">
                            Nombre
                        </label>
                        <input 
                            className="text-sm h-9 border-gray-300 block w-full bg-grey-lighter text-grey-darker rounded py-2 px-2 mb-2" 
                            id="nombre" 
                            name="nombre"
                            type="text" 
                            value={item.nombre}
                            onChange={(e)=>{ handleChange(e)}} 
                            />                
                        {/*<p className="text-red text-xs italic">Please fill out this field.</p>*/}
                    </div> 
                    <div className="w-1/5 p-2">
                        <label className="block text-gray-500 tracking-wide text-grey-darker text-sm font-bold mb-2">
                            Código
                        </label>
                        <input 
                            className="text-sm h-9 border-gray-300 block w-full bg-grey-lighter text-grey-darker rounded py-2 px-2 mb-2" 
                            id="codigo" 
                            name="codigo"
                            type="text" 
                            value={item.codigo}
                            onChange={(e)=>{ handleChange(e)}} 
                            />                
                        {/*<p className="text-red text-xs italic">Please fill out this field.</p>*/}
                    </div>
                    </div> 

                    <div className="flex-row flex">
                        <div className="w-1/4 p-2">
                            <label className="block text-gray-500 tracking-wide text-grey-darker text-sm font-bold mb-2">
                                Dirección
                            </label>
                            <input 
                                className="text-sm h-9 border-gray-300 block w-full bg-grey-lighter text-grey-darker rounded py-2 px-2 mb-2" 
                                id="direccion" 
                                name="direccion"
                                type="text" 
                                value={item.direccion}
                                onChange={(e)=>{ handleChange(e)}} 
                                />                
                            {/*<p className="text-red text-xs italic">Please fill out this field.</p>*/}
                        </div> 
                        <div className="w-1/4 p-2">
                            <label className="block text-gray-500 tracking-wide text-grey-darker text-sm font-bold mb-2">
                                Email
                            </label>
                            <input 
                                className="text-sm h-9 border-gray-300 block w-full bg-grey-lighter text-grey-darker rounded py-2 px-2 mb-2" 
                                id="email" 
                                name="email"
                                type="text" 
                                value={item.email}
                                onChange={(e)=>{ handleChange(e)}} 
                                />                
                            {/*<p className="text-red text-xs italic">Please fill out this field.</p>*/}
                        </div>
                        <div className="w-1/4 p-2">
                            <label className="block text-gray-500 tracking-wide text-grey-darker text-sm font-bold mb-2">
                                Teléfono
                            </label>
                            <input 
                                className="text-sm h-9 border-gray-300 block w-full bg-grey-lighter text-grey-darker rounded py-2 px-2 mb-2" 
                                id="telefono" 
                                name="telefono"
                                type="text" 
                                value={item.telefono}
                                onChange={(e)=>{ handleChange(e)}} 
                                />                
                            {/*<p className="text-red text-xs italic">Please fill out this field.</p>*/}
                        </div>
                        <div className="w-1/4 p-2">
                            <label className="block text-gray-500 tracking-wide text-grey-darker text-sm font-bold mb-2">
                                Nit
                            </label>
                            <input 
                                className="text-sm h-9 border-gray-300 block w-full bg-grey-lighter text-grey-darker rounded py-2 px-2 mb-2" 
                                id="nit" 
                                name="nit"
                                type="text" 
                                value={item.nit}
                                onChange={(e)=>{ handleChange(e)}} 
                                />                
                            {/*<p className="text-red text-xs italic">Please fill out this field.</p>*/}
                        </div>                                             
                    </div>
                    <div className="ml-2 w-40">
                            <button 
                                type="submit"
                                className="border-2 w-full mt-1 rounded bg-sky-400 hover:bg-sky-300 p-1 text-sm text-white">
                                <FontAwesomeIcon icon={faSave} size="sm" />  
                                {' '} {item.id ? " Actualizar" : " Guardar"}
                            </button>
                    </div> 

                </form>
            </div>       
        </div>       
    </div>
     );
}
 
export default Empresa;



                        
