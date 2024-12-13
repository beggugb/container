import { useState, useEffect} from "react";
import { useSelector, useDispatch} from 'react-redux'
import { resetData, industriasData,industriasDelete, industriasUpdate, industriasCreate, resetItem } from '../../../reducers/slices/industriaSlice'
import Pagination from '../../../components/Pagination'
import TableIndustria from "../../../components/Tables/TableSimple";
import FormIndustria from '../../../components/Forms/FormSimple'
import Loading from '../../../components/snippets/Loading'
import { XMarkIcon, MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";


const IndustriasView = () =>{
    const dispatch = useDispatch()      
    const { data, total, pagina, paginas, loading } = useSelector(state => state.industria)     
    const [parametro, setparametro] = useState("");
    const [indicador, setindicador] = useState(-1);
    const [nitem, setnitem] = useState({        
        nombre:"",
        abreviacion:"",
    });

    const chargeDatas = (page,num) =>{      
        setnitem({        
            nombre:"",
            abreviacion:"",
        })
        let iok = {
            page:page,
            num:num,
            parametro:""
        }
        dispatch(industriasData(iok)) 
    }  
    const chargeData = (page,num) =>{   
        if(page > 0){
            let iok = {
                page:page,
                num:num,
                parametro:""
            }
            dispatch(industriasData(iok)) 
        }           
    } 
  
    useEffect(() => {
        chargeDatas(1,12)
        return () => {
            dispatch(resetData())
        };
    }, []);
    
    const handleDelete = (pky) =>{     
        dispatch(industriasDelete({industriaId:pky})) 
    }   

    const handleEdit = (ite) =>{ 
        if(ite.id === indicador){
            handleClear()
        }else{
            setnitem(ite)
            setindicador(ite.id)
        }        
       
    } 

    const handleChange = (e) =>{
        const { value, name } = e.target
        setnitem({
            ...nitem,
            [name]:value
        })
    }

    const submitHandle = event =>{               
        event.preventDefault()    
        if(nitem.id){            
            dispatch(industriasUpdate(nitem)) 
        }else{            
            dispatch(industriasCreate(nitem)) 
        }
      handleClear()
    }

    const hdelete = () =>{
        let iok = {
            page:1,
            num:12,
            parametro:""
        }
        dispatch(industriasData(iok)) 

    }
    const submitSearch = event =>{
        event.preventDefault()  
        let iok = {
            page:1,
            num:12,
            parametro:parametro
        }
        dispatch(industriasData(iok)) 
    }
    const handleClear = () =>{
        setnitem({            
            nombre:"",
            abreviacion:"",
        })
        setindicador(-1)
    }    
 return(   
    <div className="justify-center items-center flex-1">
        <div className="h-500 p-1 flex flex-row">   
            <div className="w-1/4 border rounded flex-col">
                <div className='h-10 border-b bg-gray-100 rounded-t flex items-center pl-2'>
                  <button 
                  onClick={()=>handleClear()}
                  className="bg-sky-500 hover:bg-sky-400 w-10 h-7 text-gray-50 rounded flex justify-center items-center">
                    <PlusIcon className="h-6 w-6"/>
                  </button>
                </div>
                <div className='m-2 flex justify-center items-center p-2 border-2'>                        
                   <FormIndustria
                   handleChange={handleChange}
                   item={nitem}
                   submitHandle={submitHandle}
                   />
                </div> 
            </div>     
            <div className="w-3/4 flex-col rounded ml-1">  
                <div className='h-10 border-b bg-gray-50 flex items-center'>
                    <form  onSubmit={ submitSearch } className="w-full flex">
                      <div className="border flex w-full bg-white rounded">
                        <input 
                        type="text" 
                        name="parametro"                         
                        value={parametro || ''} 
                        onChange={(e) => setparametro(e.target.value)} 
                        className="w-full h-8  text-[13px] text-gray-600 border-none focus:ring-0 bg-none"/>                                                                                                          
                            <button   
                                onClick={() => hdelete()}
                                type="button"                    
                                className="h-8 w-7 border z-10 border-transparent shadow-sm text-[12px] font-medium rounded-full text-gray-600">
                                <XMarkIcon className={parametro ? "h-6 w-6 text-red-500" :"h-6 w-6 text-white" }/>                
                            </button>
                            <button                                   
                                type="submit"
                                className="h-8 w-7 border z-10 border-transparent shadow-sm text-[12px] font-medium rounded-full text-gray-600">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
                            </button>                           
                        </div>                        
                    </form> 
                </div>  
                <div className='h-470 flex-col'>
                    <div className="">
                        <TableIndustria
                        data={data}                
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        indicador={indicador}
                        />  
                    </div>    
                    <div className="">
                    <Pagination
                        makeHttpRequestWithPage={ chargeData}
                        total={total}
                        paginas={paginas}
                        pagina={pagina}
                        num={12}
                        />
                    </div> 
                </div>              
            </div>         
        </div>
        <Loading loading={loading}/>          
</div>  
  )
}


export default IndustriasView
