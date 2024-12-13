import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { informesClientes,resetInforme } from '../../reducers/slices/informeSlice';
import Clientes from '../Informes/Clientes'
import Loading from '../../components/snippets/Loading'
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { registerLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)


const ReportesView = () => {
    const dispatch = useDispatch()  
    const navigate = useNavigate();
    const [value1, onChange1] = useState(new Date());    
    const [value2, onChange2] = useState(new Date());          
    const {loading }= useSelector(state => state.informe) 
    
   
    
   
    const submitHandle = () => {  
        dispatch(resetInforme())            
        
        const item = {
         desde : value1,
         hasta : value2,         
         usuarioId : 0         
        }
        dispatch(informesClientes(item))               
        
    }

    useEffect(() => {        
        return () => {
            dispatch(resetInforme())      
        };
    }, []);
 
    return ( 
        <>        
        <div className="h-600 flex flex-col border-2">
            <div className='h-8 flex border w-full text-[13px] font-bold '>
                <button className='w-28 border bg-sky-500 h-7 text-gray-100 border-sky-500'>
                    Clientes
                </button> 
                <button 
                onClick={()=> navigate('/admin/repmembresias')} 
                className='w-28 border-r bg-stone-100 hover:bg-slate-300 h-7 text-gray-500 border-stone-300'>
                    Membresias
                </button> 
                <button 
                onClick={()=> navigate('/admin/repcajas')} 
                className='w-28 border-r bg-stone-100 hover:bg-slate-300 h-7 text-gray-500 border-stone-300'>
                    Cajas
                </button> 
                <button 
                onClick={()=> navigate('/admin/repconsolidado')} 
                className='w-28 border-r bg-stone-100 hover:bg-slate-300 h-7 text-gray-500 border-stone-300'>
                    Consolidado
                </button> 
                <button 
                onClick={()=> navigate('/admin/repexistecias')} 
                className='w-28 border-r bg-stone-100 hover:bg-slate-300 h-7 text-gray-500 border-stone-300'>
                    Existencias
                </button>                 
                <button 
                onClick={()=> navigate('/admin/repasistencia')} 
                className='w-28 border-r bg-stone-100 hover:bg-slate-300 h-7 text-gray-500 border-stone-300'>
                    Asistencia
                </button> 
                <button 
                onClick={()=> navigate('/admin/repventas')} 
                className='w-28 border-r bg-stone-100 hover:bg-slate-300 h-7 text-gray-500 border-stone-300'>
                    Ventas
                </button>
                <button 
                onClick={()=> navigate('/admin/repcompras')} 
                className='w-28 border-r bg-stone-100 hover:bg-slate-300 h-7 text-gray-500 border-stone-300'>
                    Compras
                </button> 
                <button 
                onClick={()=> navigate('/admin/repcomparativo')} 
                className='w-28 border-r bg-stone-100 hover:bg-slate-300 h-7 text-gray-500 border-stone-300'>
                    Comparativo
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
                <div className='w-1/3 flex items-center justify-center'>
                      <button
                          onClick={() => submitHandle()}
                          className="h-8 w-60 text-center bg-sky-400 rounded text-[13px] text-gray-50 font-bold hover:bg-sky-300"
                          type="button"> Generar
                      </button>
                </div>
            </div>
            <div className='h-550 flex border w-full bg-gray-200'>
                    <Clientes desde={value1} hasta={value2} />
            </div>

                 
        </div>            
        <Loading
        loading={loading}
        /> 
        </>     
    );
}
 
export default ReportesView;