import React from 'react'
import { crudActions } from '../../../redux/actions/crud'
import { useSelector, useDispatch } from 'react-redux'
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const MemSearch = ({estado, setEstado, setShowModal}) => {  
    const dispatch = useDispatch() 
    const { promp }= useSelector(state => state.membresia)
    
    const cleanSearch = () =>{              
        let iok={
          nombres : '',
          ci:'',
          nit:'',
          page:1,
          num:12
        }
        dispatch(crudActions.searchList('membresiasData','mem',iok))
        dispatch({type:'setPromp',value:''}) 
      }
            
      const submitHandle = event =>{
        event.preventDefault() 
        let iok={
          nombres : promp,
          ci:'',
          nit:'',
          page:1,
          num:12
        }
        dispatch(crudActions.searchList('membresiasData','mem',iok))        
      }   
      const submitHandles = () =>{        
        let iok={
          nombres : promp,
          ci:'',
          nit:'',
          page:1,
          num:12
        }
        dispatch(crudActions.searchList('membresiasData','mem',iok))        
      } 

      const setParametro = (e) =>{
     
        dispatch({type:'setPromp',value:e}) 
      }
     
    return ( 
      <div className="h-8 flex w-full items-center">
      <div className="w-1/2"></div>
      <div className="w-1/2 mr-1 flex">
          <form  onSubmit={ submitHandle } className="w-full z-0">                                        
              <input 
              type="text" 
              name="parametro" 
              value={promp || ''} 
              onChange={(e) => setParametro(e.target.value)} 
              className="w-full h-7 focus:border-gray-400 block shadow-sm sm:text-[10px] border-gray-300 rounded"/>                                                                                      
          </form> 
          <button   
              onClick={() => cleanSearch()}
              type="button"                    
              className="h-7 w-7 border z-10 -ml-14 border-transparent shadow-sm text-[10px] font-medium rounded-full text-gray-600">
              <XMarkIcon className={promp ? "h-6 w-6 text-red-500" :"h-6 w-6 text-white" }/>                
          </button>
          <button   
              onClick={() => submitHandles()}
              type="button"                    
              className="h-7 w-7 border z-10 border-transparent shadow-sm text-[10px] font-medium rounded-full text-gray-600">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
          </button>
      </div>     
  </div>
     );
}
 
export default MemSearch;



                        
