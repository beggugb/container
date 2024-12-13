import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { informesMembresias, resetInforme } from '../../reducers/slices/informeSlice';
import DatePicker from "react-datepicker";
import Loading from '../../components/snippets/Loading'
import Membresias from './Membresias'
import { registerLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)

const InfMembresias = () => {
    const dispatch = useDispatch()  
    const navigate = useNavigate();
    const [value1, onChange1] = useState(new Date());    
    const [value2, onChange2] = useState(new Date());      
    const {loading }= useSelector(state => state.informe) 
    const [ptipo, setptipo] = useState("%");
    const [puserId, setpuserId] = useState(0);
    const [pusers, setpusers] = useState("");
    let us = JSON.parse(localStorage.getItem('@usuarioFitt')) 



    const submitHandle = () => {  
        dispatch(resetInforme())        
        
        const item = {
            desde : value1,
            hasta : value2,
            tipo : ptipo,
            usuarioId : us.id
        }
        dispatch(informesMembresias(item)) 
        /*dispatch(crudActions.informes('INFORMES_MEMBRESIAS','amembresias',item,value1,value2))                    */
        
    }

    useEffect(() => {
        setpusers(us.username)
        return () => {
            dispatch(resetInforme())  
        };
    }, []);
    
    
 
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
                className='w-28 border bg-sky-500 h-7 text-gray-100 border-sky-500'>
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
                className='w-28 border-r bg-stone-100 hover:bg-slate-300 h-7 text-gray-500 border-stone-300'>
                    Existencias
                </button>            
            </div>
            <div className='h-14 border-b-4 border-gray-300 flex w-full bg-gray-50 pl-10 pr-4'>
                <div className='w-1/3 flex items-center justify-center'>
                    <label htmlFor="desde" className="h-8 w-1/5 p-2 font-bold text-gray-500 text-[13px]">Desde</label>    
                    <DatePicker 
                      className="text-center p-1 h-8 w-4/5 text-gray-500 rounded border-gray-300 hover:bg-gray-100 hover:border-sky-200 text-[13px]"
                      locale="es"
                      selected={value1} 
                      onChange={(date) => onChange1(date)}
                      dateFormat="PP"/>
                </div>
                <div className='w-1/3 flex items-center justify-center'>
                    <label htmlFor="hasta" className="h-8 w-1/5 p-2 font-bold text-gray-500 text-[13px]">Hasta</label>
                      <DatePicker 
                      className="text-center p-1 h-8 w-4/5 text-gray-500 rounded border-gray-300 hover:bg-gray-100 hover:border-sky-200 text-[13px]"
                      locale="es"
                      selected={value2} 
                      onChange={(date) => onChange2(date)}
                      dateFormat="PP"/> 
                </div>
                <div className='w-2/12 flex items-center justify-center text-[12px]'>
                <button 
                    onClick={()=> setptipo("%")}
                    className={ptipo === '%' ? ' rounded-l-md h-8 w-4/12 border-2 text-gray-100 flex border-gray-300 bg-sky-400 justify-center items-center font-bold': 'h-8 w-4/12 border-2 flex border-gray-300 justify-center items-center text-gray-600 bg-gray-200 rounded-l-md'}>
                        todos
                    </button> 
                    <button 
                    onClick={()=> setptipo("efectivo")}
                    className={ptipo === 'efectivo' ? ' h-8 w-4/12 border-2 text-gray-100 flex border-gray-300 bg-sky-400 justify-center items-center font-bold': 'h-8 w-4/12 border-2 flex border-gray-300 justify-center items-center text-gray-600 bg-gray-200'}>
                        efectivo
                    </button>  
                    <button 
                    onClick={()=> setptipo("qr")}
                    className={ptipo === 'qr' ? 'rounded-r-md h-8 w-4/12 border-2 text-gray-100 flex border-gray-200 bg-sky-400 justify-center items-center font-bold': 'h-8 w-4/12 border-2 flex border-gray-300 justify-center items-center text-gray-600 bg-gray-200 rounded-r-md'}>
                       QR
                    </button>   
                </div>
                <div className='w-1/3 flex items-center justify-center'>
                      <button
                          onClick={() => submitHandle()}
                          className="h-8 w-60 text-center bg-sky-400 rounded text-[13px] text-gray-50 font-bold hover:bg-sky-300"
                          type="button"> Generar
                      </button>
                </div>
            </div>
            <div className='h-550 flex border w-full bg-gray-200'>
            <Membresias tipo={ptipo} user={pusers} desde={value1} hasta={value2} />
            </div>

                 
        </div>            
        <Loading
        loading={loading}
        /> 
        </>   
     );
}
 
export default InfMembresias;