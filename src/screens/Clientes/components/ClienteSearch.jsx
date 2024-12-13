import { useState}  from 'react'
import { clientesData } from '../../../reducers/slices/clienteSlice'
import { useSelector, useDispatch } from 'react-redux'
import { ChevronDownIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";

const options =[
  {label:"nombres",value:"nombres"},
  {label:"ci",value:"ci"},
  {label:"telefono",value:"telefono"},
]

const ClienteSearch = ({prop,setprop,parametro,setparametro}) => {  
    const dispatch = useDispatch()     
    const [view, setview] = useState();
    

    const cleanSearch = () =>{     
      setparametro("")         
          let iok={
            page : 1,
            num  : 14,
            prop : prop,
            params: ""
        }        
        dispatch(clientesData(iok))        
      }
            
      const submitHandle = event =>{
        event.preventDefault() 
        let iok={
          page : 1,
          num  : 14,
          prop : prop,
          params: parametro
      }        
      dispatch(clientesData(iok))
      }   
      const submitHandles = () =>{        
        let iok={
          page : 1,
          num  : 14,
          prop : prop,
          params: parametro
        }        
        dispatch(clientesData(iok))
      } 
      
      const handleExit = () =>{
        setview(false)
      }
      const handleChanges = (it) =>{
          const { label, value } = it
          setprop(value)
          setview(false)
      }

     
    return ( 
        <div className="h-9 flex items-center w-full justify-end border-2 border-gray-300">                    
          <div className='w-1/3 flex'>
              <div className="relative inline-block w-full text-[13px] ">     
                <div      
                onClick={() => setview(!view)}   
                  className="h-8 w-full flex ">
                   <div className="h-8 w-full items-center flex pl-4 text-[13px] uppercase text-gray-500 bg-white rounded-l">
                    {prop} 
                    </div>                                      
                    <button
                      className="h-8 w-10 flex items-center justify-center rounded-r bg-stone-100">
                      <ChevronDownIcon className="h-8 text-gray-400" />
                    </button>
                  </div> 

                  {view &&  
                  <ul 
                  onMouseLeave={() => handleExit()}
                  className="absolute z-10  w-full border bg-slate-500 rounded-b shadow-lg pt-1 pl-4 pr-4 -mt-1">      
                    { options.map((it, index) => (
                        <li                      
                        key={index}
                        className="h-8 items-center flex uppercase text-gray-50 hover:text-gray-500 hover:font-bold hover:bg-gray-100 border-b border-gray-300"
                        onClick={()=>handleChanges(it)}>
                            {it.label}</li>                
                    ))}         
                    </ul>   
                    }
            
              </div>  
          </div>
          <div className='w-2/3 flex'>
                <form  onSubmit={ submitHandle} className="w-full text-gray-600">                                        
                <input 
                  type="text" 
                  name="parametro" 
                  value={parametro} 
                  onChange={(e) => setparametro(e.target.value)} 
                  className="w-full h-8 focus:ring-0 block shadow-sm sm:text-[13px] border-none "/>                                                                                      
                </form> 
                <button 
                  onClick={()=>cleanSearch()}
                  className="h-8 w-10 z-10">                  
                  <XMarkIcon className={parametro ? "h-6 w-6 text-red-500" : "h-6 w-6 text-white"} />
                </button> 
                <button 
                  onClick={()=>submitHandles()}                      
                  className="h-8 w-10 z-10">                  
                  <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
                </button> 
                
          </div>
        </div>
     );
}
 
export default ClienteSearch;



                        
