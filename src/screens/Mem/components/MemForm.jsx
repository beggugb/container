import React,{useEffect} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux'
import { crudActions } from '../../../redux/actions/crud'
import Moment from 'react-moment'

const MemForm = ({view,setview}) => {   
  const dispatch = useDispatch()  
  const { item,  promp} = useSelector(state => state.membresia)   

  
  const handleSave = event => {       
    event.preventDefault()    
    let iok = {
        id: item.id,
        ivigencia: item.ivigencia,
        fvigencia: item.fvigencia
    }
   
    dispatch(crudActions.putUnit('mem',iok))            
    
  }
  const makeHttpRequestWithPage = (page,num) =>{        
    let iok={
        page:page,
        num:num, 
        nombres : promp,        
    }
    dispatch(crudActions.searchList('membresiasData','mem',iok))
  }

  
  useEffect(() =>{                
  return () =>{             
      dispatch({type:'membresiasResetItem'})               
      makeHttpRequestWithPage(1,12)
    };
}, []);
    

const onInicio = (e) => {                         
    dispatch({type:'membresiasChange',props:'ivigencia',value:e})
 }
 const onFin = (e) => {                             
    dispatch({type:'membresiasChange',props:'fvigencia',value:e})
 }
    return ( 
        <>
        { view ?
        <>
        <div className="justify-center items-center flex-1 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-lg">
          {/*content*/}
          <div className="h-400 border rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <button 
            className="w-7 h-7 bg-red-500 rounded-full m-1"
            onClick={() => setview(false)}>
            <FontAwesomeIcon icon={faTimes} color="#fff" />
          </button>  
            {/*body*/}

            <div className="p-1 flex border justify-center">                 
            
            <div className="ml-1 w-full border rounded-md text-[12px]">

                   <div className="h-9 border-b text-center mt-9">
                       <h6 className="text-sm font-bold">Membresia # <b>{item.id}</b></h6>                                               
                   </div>

                   <div className="h-28 border rounded p-1 mt-2">

                    <div className="border-b flex h-7 pt-1">                        
                        <p className="w-2/12  pl-1 font-bold">
                            Nombres :
                        </p>
                        <p className="w-7/12 pl-1">
                        { item.cliente || '' }
                        </p>
                        <p className="w-1/12  pl-1 font-bold">
                            Ci :
                        </p>
                        <p className="w-2/12 pl-1">
                        { item.clientei || '' }
                        </p>

                    </div>
                    <div className="border-b flex h-7 pt-1">
                        <p className="w-2/12 pl-1 font-bold">
                            Paquete :
                        </p>
                        <p className="w-7/12 pl-1">
                        { item.paquete || '' }
                        </p>
                        <p className="w-1/12  pl-1 font-bold">
                            Valor :
                        </p>
                        <p className="w-2/12 pl-1">
                        { item.valor || 0 } Bs.
                        </p>
                    </div>


                    <div className="border-b flex h-7 pt-1">
                        <p className="w-1/6 pl-1 font-bold">
                            I.Vigencia :
                        </p>
                        <p className="w-2/6 pl-1">
                            <Moment format="DD/MM/YYYY">{item.ivigencia}</Moment>
                        </p>
                        <p className="w-1/6  pl-1 font-bold">
                            F.Vigencia :
                        </p>
                        <p className="w-2/6 pl-1">
                        <Moment format="DD/MM/YYYY">{item.fvigencia}</Moment>
                        </p>
                    </div>

                    <div className="border-b flex h-7 pt-1 bg-red-100">
                        <p className="w-4/12 pl-1 font-bold text-red-500">
                            Ultima modificación !:
                        </p>
                        <p className="w-8/12 pl-1 font-bold text-red-500">
                            <Moment format="DD/MM/YYYY HH:mm:ss">{item.updatedAt}</Moment>
                        </p>                        
                    </div>



                   </div> 
                   <form onSubmit={ handleSave}>
                
                <div className="grid grid-cols-2 gap-2 p-1"> 
                    <div className="">
                        <label htmlFor='ivigencia' className="block text-gray-600 tracking-wide text-grey-darker text-[12px] font-bold ">
                            Inicio Vigencia (mes/dia/año)
                        </label>
                        <input 
                            className="h-9 border-gray-400 block w-full bg-grey-lighter text-gray-600 text-[12px] rounded" 
                            id="ivigencia" 
                            name="ivigencia"
                            type="date" 
                            value={item.ivigencia}                            
                            onChange={(e) => onInicio(e.target.value)}
                        /> 
                    </div>  
                    <div >
                        <label htmlFor='fvigencia' className="block text-gray-60 tracking-wide text-grey-darker text-[12px] font-bold ">
                            Fin Vigencia (mes/dia/año)
                        </label>
                        <input 
                            className="h-9 border-gray-400 block w-full bg-grey-lighter text-gray-600 text-[12px] rounded" 
                            id="fvigencia" 
                            name="fvigencia"
                            type="date" 
                            value={item.fvigencia}
                            onChange={(e) => onFin(e.target.value)}
                        />
                    
                    </div>                       
                </div>

                <div className="pl-2 border p-1 flex justify-center">                    
                    <button
                       className="w-80 bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                       type="submit" > Actualizar
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
 
export default MemForm;



                        
