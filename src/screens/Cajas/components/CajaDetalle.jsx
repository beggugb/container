import React from 'react';
import { useSelector } from 'react-redux'
function CajaDetalle() {              
  const {item}  = useSelector(state => state.caja)    
  return (    
  <div className='h-max w-full flex-col text-[13px] text-gray-600'>
    <div className='h-7 flex w-full'>
        <div className='h-7 bg-sky-200 w-1/6 flex items-center justify-center'>
          <span>Inicial</span>
        </div>
        <div className='h-7 bg-green-200 w-2/6 flex items-center justify-center'>
          <span>Σ Ingresos</span>
        </div>
        <div className='h-7 bg-red-200 w-1/6 flex items-center justify-center'>
          <span>Σ Egresos</span>
        </div>
        <div className='h-7 bg-stone-200 w-1/6 flex items-center justify-center'>
          <span>Σ Total</span>
        </div>
        <div className='h-7 bg-sky-500 text-gray-50 w-1/6 flex items-center justify-center'>
          <span>Saldo Efectivo</span>
        </div>
    </div>
    <div className='flex w-full'>
        <div className='h-14 border w-1/6 flex items-center justify-center'>
          <span>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoInicial)}</span>
        </div>
        <div className='h-14  bg-green-100 w-2/6 flex items-center justify-center flex-col'>
          <div className='h-7 flex items-center pl-2 pr-2'>
            <span>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoIngreso)}</span>
          </div>
          <div className='h-7 flex w-full'>
              <div className='border border-sky-500 flex w-2/12 justify-center items-center bg-sky-500 text-gray-100 font-bold'>
              EFE
              </div>
              <div className='border-t flex w-4/12 items-center justify-center'>                
              <span>{new Intl.NumberFormat('es-BO',{minimumFractionDigits: 2}).format(item.pagoefectivo)} </span>                
              </div>
              <div className='border border-red-500 flex w-2/12 justify-center items-center bg-red-500 text-gray-100 font-bold'>
              QR
              </div>
              <div className='border-t flex w-4/12 items-center justify-center'>                
              <span>{new Intl.NumberFormat('es-BO',{minimumFractionDigits: 2}).format(item.pagoqr)} </span>  
              </div>
          </div>          
        </div>
        <div className='h-14 border w-1/6 flex items-center justify-center '>
          <span>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoEgreso)}</span>
        </div>
        <div className='h-14 border w-1/6 flex items-center justify-center'>
          <span>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoFinal)}</span>
        </div>
        <div className='h-14 border w-1/6 flex items-center justify-center'>
          <span>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.saldoefectivo)}</span>
        </div>
    </div>
  </div> 

  );
}

export default CajaDetalle