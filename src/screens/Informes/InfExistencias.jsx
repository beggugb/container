import { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { informesExistencias,resetInforme } from '../../reducers/slices/informeSlice';
import { categoriasItems } from '../../reducers/slices/categoriaSlice'
import { productosStocki } from '../../reducers/slices/productoSlice'
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Loading from '../../components/snippets/Loading'
import Existencias from './Existencias'
import SelectData from '../../components/selects/SelectDataU'
import { registerLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)

const InfExistencias = () => {
    const dispatch = useDispatch()  
    const navigate = useNavigate();
    const items = useSelector(state => state.categoria.items)
    const pitems  = useSelector(state => state.producto.items)    
    const {loading }= useSelector(state => state.informe)     
    const [view, setview] = useState(false);  
    const [cate, setcate] = useState("%");
    const [cateId, setcateId] = useState(0);
    const [product, setproduct] = useState("");
    const [productId, setproductId] = useState(0);
    

    const handleChange = event =>{        
        const  {value, label} = event
        let io = value ? value: 0            
        let lio = label ? label: ""            
        setcateId(io)
        setcate(lio)
    }

    const handleDelete = () =>{
        setcateId(0)
        setcate("")      
    }
   
    const submitHandle = () => {  
        dispatch(resetInforme())   
        
        const item = {            
            categoriaId: cateId,         
            productoId: productId,
            
        }
        dispatch(informesExistencias(item)) 
        
    }

    const getCharge = () =>{        
        dispatch(categoriasItems())   
        
   }
   
   useEffect(() => {
       getCharge()
       return () => {
        dispatch(resetInforme())   
       };
   }, []);

   const handleSearch = () =>{
    let dato = {
        prop: 'nombre',
        value: product
    }        
    dispatch(productosStocki(dato))
    setview(true)
}
const asignar = (it) =>{                        
    setproductId(it.id)
    setproduct(it.nombre)    
    setview(false)
    
}

const handleDeletex = () =>{
    setproductId(0)
    setproduct("")    
}
 
    
 
    return ( 
        <>
         <div className="h-600 flex flex-col border-2">
            <div className='h-8 flex border w-full text-[13px] font-bold '>
                <button 
                onClick={()=> navigate('/admin/informes')} 
                className='w-28 border-r bg-stone-100 hover:bg-slate-300 h-7 text-gray-500 border-stone-300'>
                    Clientes
                </button> 
                <button 
                onClick={()=> navigate('/admin/infmembresias')} 
                className='w-28 border-r bg-stone-100 hover:bg-slate-300 h-7 text-gray-500 border-stone-300'>
                    Membresias
                </button> 
                <button 
                onClick={()=> navigate('/admin/infcajas')} 
                className='w-28 border-r bg-stone-100 hover:bg-slate-300 h-7 text-gray-500 border-stone-300'>        
                    Cajas
                </button> 
                <button 
                onClick={()=> navigate('/admin/infconsolidado')} 
                className='w-28 border-r bg-stone-100 hover:bg-slate-300 h-7 text-gray-500 border-stone-300'>                  
                    Consolidado
                </button>                                  
                <button 
                onClick={()=> navigate('/admin/infasistencia')} 
                className='w-28 border-r bg-stone-100 hover:bg-slate-300 h-7 text-gray-500 border-stone-300'>
                
                    Asistencia
                </button> 
                <button 
                onClick={()=> navigate('/admin/infventas')} 
                className='w-28 border-r bg-stone-100 hover:bg-slate-300 h-7 text-gray-500 border-stone-300'>
                    Ventas
                </button>    
                <button 
                onClick={()=> navigate('/admin/infexistencias')} 
                className='w-28 border bg-sky-500 h-7 text-gray-100 border-sky-500'>                      
                    Existencias
                </button>              
            </div>
            <div className='h-14 border-b-4 border-gray-300 flex w-full bg-gray-50 pl-10 pr-4'>
                
            <div className='w-1/12 flex items-center pr-2'>
                </div>    
                <div className='w-4/12 flex items-center pr-2 text-gray-500'>
                    <label htmlFor='categoriaId' className='h-8 w-1/3 p-2 text-[12px] font-bold'> Categoría :</label>      
                    <div className='w-full flex pl-2 pr-2'>
                        <SelectData
                        options={items}
                        option={cateId}
                        handleChange={handleChange}     
                        handleDelete={handleDelete}                                                     
                        name={"categoriaId"}/>          
                    </div> 
                
                </div>
                <div className='w-1/12 flex justify-end items-center pr-2 font-bold text-gray-500 text-[12px]'>
                    Producto :
                </div>
                <div className='w-4/12 flex items-center pr-2'>
                        <div className="flex w-full rounded">
                                <div className='h-8 flex w-full bg-white border border-gray-300'>
                                    <input
                                    onChange={(e) => setproduct(e.target.value)}
                                    type="text"
                                    name="product"                                
                                    autoComplete="off"
                                    value={product ||"" }                                   
                                    className="w-full focus:ring-0 border-none"
                                    />
                                </div>                            
                                <button
                                    onClick={() => handleDeletex()}
                                    type="button"
                                    className="-ml-16 h-8 w-6 font-bold flex  items-center justify-center">
                                    <XMarkIcon className={product ? "h-5 text-red-400":"h-5 text-white"} />
                                </button>
                                <button
                                    onClick={() => handleSearch()}
                                    type="button"
                                    className="h-8 w-6 ml-1 font-bold flex  items-center justify-center">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-stone-500"/>
                                </button>
                            </div> 
                            { view && pitems.length > 0  ?
                                <div onMouseLeave={() => setview(false)} className="ml-1 mt-2 absolute w-56 z-10 shadow-md border bg-slate-500 p-1">
                                    <table className="border-collapse w-full">
                                        <tbody>
                                            {pitems.map((ite,index)=>(
                                            <tr 
                                            key={index}
                                            onClick={() => asignar(ite)}>                                                                            
                                                <td className="h-6 border-b border-stone-300 text-[13px] text-stone-50 hover:text-stone-600 hover:bg-stone-200">
                                                {ite.nombre} - ({ite.categoria.nombre})
                                                </td>                                        
                                            </tr>
                                            ))}                                
                                        </tbody>
                                    </table>
                                </div>  : null
                            }
                </div>
                <div className='w-1/12 flex items-center justify-center'>
                      <button
                          onClick={() => submitHandle()}
                          className="h-8 w-60 text-center bg-sky-400 rounded text-[13px] text-gray-50 font-bold hover:bg-sky-300"
                          type="button"> Generar
                      </button>
                </div>
            </div>
            <div className='h-550 flex border w-full bg-gray-200'>
            <Existencias product= {product} cate={cate} />
            </div>

                 
        </div>            
        <Loading
        loading={loading}
        /> 
        </>   
     );
}
 
export default InfExistencias;