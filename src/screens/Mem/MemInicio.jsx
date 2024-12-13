import { useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MemTable from './components/MemTable'
import { membresiasDatas, membresiasDelete, membresiasItem, membresiasUpdate } from '../../reducers/slices/membresiaSlice'
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Loading from '../../components/Loading'
import Moment from 'react-moment';


const MemInicio = () => {
    const dispatch = useDispatch()             
    const { data, total, pagina, paginas, loading }= useSelector(state => state.membresia)
    const [view, setview] = useState(false);    
    const [parametro, setparametro] = useState("");
    const [nitem, setnitem] = useState();

    const handleEdit = (itt) =>{
        setnitem(itt)
        setview(true)
    }
    const getDatas = (page,num) =>{
        if(page > 0){
            let iok={
              page : page,
              num  : num,
              parametro:parametro
            }
            dispatch(membresiasDatas(iok))            
          }  
    }
    const getData = () =>{
        let iok={
            page:1,
            num:14,
            parametro:""
        }
        dispatch(membresiasDatas(iok))
    }

    useEffect(() => {
        getData()
        return () => {
            
        };
    }, []);

    const cleanSearch = () =>{
        let iok={
            page:1,
            num:14,
            parametro:""
        }
        dispatch(membresiasDatas(iok))
        setparametro("")
    } 
    
    const sNview = () =>{
        setview(false)
        let iok={
            page:1,
            num:14,
            parametro:""
        }
        dispatch(membresiasDatas(iok))

    }

    const submitHandles = () =>{
        let iok={
            page:1,
            num:14,
            parametro:parametro
        }
        dispatch(membresiasDatas(iok))
    }
    const submitHandle = event =>{
        event.preventDefault() 
        let iok={
            page:1,
            num:14,
            parametro:parametro
        }
        dispatch(membresiasDatas(iok))
    }
    
    const handleSave = event =>{
        event.preventDefault() 
        dispatch(membresiasUpdate(nitem))
    }
    const onChange = (name,value) => {                         
            setnitem({
                ...nitem,
                [name]:value
            })
    }
     
    /*data,pagina,paginas,total,edit,submitHandle*/
    return ( 
        <>
        <div className="h-600 p-1">   
            <div className='h-14 border-4 w-full flex'>
                <div className='w-1/2 flex border-l border-t border-b border-gray-300 items-center font-bold pl-4 text-red-500 text-[13px]'>
                    ACTUALIZACION DE MEMBRESIAS 
                </div>
                <div className='w-1/2 flex items-center justify-center border-r border-t border-b border-gray-300'>
                <form  onSubmit={ submitHandle } className="w-full flex pl-2 pr-2">                                        
                    <div className='h-9 border flex w-full items-center justify-center border-gray-400'>
                    <input 
                    type="text" 
                    name="parametro" 
                    value={parametro || ''} 
                    onChange={(e) => setparametro(e.target.value)} 
                    className="w-full h-8 text-[13px] text-gray-500 border-none bg-slate-100 focus:ring-0"/>                                                                                                      
                    <button   
                        onClick={() => cleanSearch()}
                        type="button"                    
                        className="h-7 w-7 border z-10 -ml-14 border-transparent shadow-sm text-[10px] font-medium rounded-full text-gray-600">
                        <XMarkIcon className={parametro ? "h-6 w-6 text-red-500" :"h-6 w-6 text-slate-100" }/>                
                    </button>
                    <button   
                        onClick={() => submitHandles()}
                        type="button"                    
                        className="h-7 w-7 border z-10 border-transparent shadow-sm text-[10px] font-medium rounded-full text-gray-600">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
                    </button>
                    </div>
                </form> 
                </div>
            </div>                              
            <MemTable 
                data={data}
                pagina={pagina}
                paginas={paginas}
                total={total}
                getDatas={getDatas}
                handleEdit={handleEdit}
            />
            
        </div>
        
        { view ?
        <>
        <div className="justify-center items-center flex-1 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-lg">
                <div className="h-450 border rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className='h-12 bg-gradient-to-t from-gray-100 to-gray-200'>
                        <button 
                        className="w-7 h-7 bg-red-500 rounded-full m-1 flex justify-center items-center"
                        onClick={() => sNview()}>
                            <XMarkIcon  className='h-5 w-5 text-white'/> 
                        </button>    
                    </div>                     
                    { nitem ? 
                    <div className="h-400 p-1 flex-col flex">   
                        <div className="h-12 border-b text-center mt-2 flex items-center justify-center">
                            <h6 className="text-sm font-bold">Membresia # <b>{nitem.id}</b></h6>                                               
                        </div>

                        <div className="rounded p-1 mt-2 border border-gray-300 text-[13px] text-gray-600">
                            <div className="border-b flex h-7 pt-1">                        
                                <p className="w-2/12  pl-1 font-bold">
                                    Nombres :
                                </p>
                                <p className="w-6/12 pl-1">
                                { nitem.clienten || '' }
                                </p>
                                <p className="w-2/12  pl-1 font-bold">
                                    CI :
                                </p>
                                <p className="w-2/12 pl-1">
                                { nitem.ci || '' }
                                </p>

                            </div>
                            <div className="border-b flex h-7 pt-1">
                                <p className="w-2/12 pl-1 font-bold">
                                    Paquete :
                                </p>
                                <p className="w-6/12 pl-1">
                                { nitem.paqueten || '' }
                                </p>
                                <p className="w-2/12  pl-1 font-bold">
                                    Valor :
                                </p>
                                <p className="w-2/12 pl-1">
                                { nitem.valor || 0 } Bs.
                                </p>
                            </div>
                            <div className="border-b flex h-7 pt-1">
                                <p className="w-1/6 pl-1 font-bold">
                                    I.Vigencia :
                                </p>
                                <p className="w-2/6 pl-1">
                                    <Moment format="DD/MM/YYYY">{nitem.ivigencia}</Moment>
                                </p>
                                <p className="w-1/6  pl-1 font-bold">
                                    F.Vigencia :
                                </p>
                                <p className="w-2/6 pl-1">
                                <Moment format="DD/MM/YYYY">{nitem.fvigencia}</Moment>
                                </p>
                            </div>
                            <div className="border-b flex h-7 pt-1 bg-red-100">
                                <p className="w-4/12 pl-1 font-bold text-red-500">
                                    Ultima modificación !:
                                </p>
                                <p className="w-8/12 pl-1 font-bold text-red-500">
                                    <Moment format="DD/MM/YYYY HH:mm:ss">{nitem.modificacion}</Moment>
                                </p>                        
                            </div>
                        </div>     
                        
                        <div className="rounded p-1 mt-2 border border-gray-300 text-[13px] text-gray-600">
                            <form onSubmit={ handleSave}>
                                <div className="h-24 flex items-center justify-around"> 
                                    <div className='w-2/6 flex-col'>
                                        <label htmlFor='ivigencia' className="block text-gray-600 tracking-wide text-grey-darker text-[12px] font-bold ">
                                            Inicio Vigencia 
                                        </label>
                                        <input 
                                            className="h-9 border-gray-400 block w-full bg-grey-lighter text-gray-600 text-[12px] rounded" 
                                            id="ivigencia" 
                                            name="ivigencia"
                                            type="date" 
                                            value={nitem.ivigencia}                            
                                            onChange={(e) => onChange(e.target.name,e.target.value)}
                                        /> 
                                    </div>  
                                    <div className='w-2/6 flex-col'>
                                        <label htmlFor='fvigencia' className="block text-gray-60 tracking-wide text-grey-darker text-[12px] font-bold ">
                                            Fin Vigencia 
                                        </label>
                                        <input 
                                            className="h-9 border-gray-400 block w-full bg-grey-lighter text-gray-600 text-[12px] rounded" 
                                            id="fvigencia" 
                                            name="fvigencia"
                                            type="date" 
                                            value={nitem.fvigencia}
                                            onChange={(e) => onChange(e.target.name,e.target.value)}
                                        />
                                    
                                    </div>          
                                </div>  
                                <div className="h-20 p-1 flex justify-center items-center">                    
                                    <button
                                    className="w-80 h-10 bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="submit" > Actualizar
                                    </button>                        
                                </div>

                            </form>
                        </div>         
                    </div>:null}
              </div>
            </div>    
        </div>
        <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </> :null}
        <Loading loading={loading}/>
    </>
     );
}
 
export default MemInicio;



