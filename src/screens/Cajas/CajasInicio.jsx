import React, {useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { cajasData, cajasItem, cajasCreate, cajasUpdate } from '../../reducers/slices/cajaSlice'
import CajasTable from './components/CajasTable'
import CajaView from './components/CajaView'
import {toastr} from 'react-redux-toastr'
import { PlusIcon } from "@heroicons/react/24/outline";
import Loading from '../../components/Loading'

const CajasInicio = () => {
    const dispatch = useDispatch()    
    const { loading,  data, total ,pagina, paginas }= useSelector(state => state.caja)    
    let us = JSON.parse(localStorage.getItem('@usuarioFitt'))
    const [parametro, setparametro] = useState('');
    const [view, setview] = useState(false);
    
    
    const submitHandle = event => {       
        event.preventDefault()    
        if(parseInt(parametro) > -1)
        {
            let dat = {
                montoInicial : parseInt(parametro),
                estado : false,
                montoEgreso : 0,
                montoFinal : parseInt(parametro),
                montoIngreso : 0,
                usuarioId : us.id        
            }
        
            /*dispatch(crudActions.createList('CAJAS_DATA','cajas',dat))          */
            dispatch(cajasCreate(dat))
            setparametro('')
        }else{
            toastr.warning("Error", 'Debe ingresar un valor')
        } 
     }

    const handleShow = (it) =>{                        
        if(it){
            dispatch(cajasItem({id:it,tip:'items'}))
            setview(true)
          } 
    }

    const handleAproba = (pky) => {             
        dispatch(cajasUpdate(pky))        
     }



    const getData = (page,num) =>{
        let iok={
            page:page,
            num:num,
            usuarioId:us.id
        }
     dispatch(cajasData(iok))
    }

    const getDatas = (page,num) =>{
        if(page > 0){
            let iok={
                page:page,
                num:num,
                usuarioId:us.id
            }
         dispatch(cajasData(iok))
        }        
    }

    useEffect(() =>{                
        getData(1,14)
              
    }, []);

    return ( 

        <>
        <div className="h-620 p-1 border boder-gray-200">
            <div className='h-16 flex border-l border-r border-t w-full  border-gray-300'>
                <div className='h-16 w-4/6 flex  items-center pl-2'>
                    <button 
                        className='h-8 border w-56 rounded flex'>
                            <div className='h-8 w-1/6 border border-sky-500 bg-sky-500 rounded-l flex items-center justify-center'>                          
                            </div>
                            <div className='h-8 w-5/6 border border-sky-400 bg-sky-400 hover:bg-sky-500 rounded-r flex font-bold  justify-center items-center text-[12px] text-gray-50'>
                            Gestión de Cajas
                            </div>
                    </button> 
                </div>
                <div className='h-16 w-2/6 flex items-center pr-2'>
                    <div className="w-4/5 flex items-center justify-center">                        
                        <input 
                        type="number" 
                        name="parametro" 
                        value={parametro} 
                        onChange={(e) => setparametro(e.target.value)} 
                        className="w-full h-9 focus:border-gray-400 block shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                    </div>
                    <div className="w-1/5 items-center justify-center flex">                        
                        <button 
                            type="submit"
                            onClick={(e)=>submitHandle(e)}                      
                            className="h-8 w-14 ml-2 bg-sky-500 hover:bg-sky-400 text-white rounded-md flex justify-center items-center">
                            <PlusIcon className="h-5 w-5 text-gray-50" />    
                        </button>
                    </div>
                </div>
            </div>
            <div className='h-480 border-l borde-r boder-b w-full bg-gray-100'>
                <CajasTable              
                    data={data}
                    pagina={pagina}
                    paginas={paginas}
                    total={total}
                    submitHandle={getDatas}
                    handleShow ={handleShow}           
                    handleAproba ={handleAproba}
                />
            </div>           
        </div>   
        
        <Loading loading={loading}/>
        <CajaView view={view} setview={setview}/>
        </>     
     
     );
}
 
export default CajasInicio;