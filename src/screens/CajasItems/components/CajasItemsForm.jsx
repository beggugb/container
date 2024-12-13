import React,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {  cajaitemsCreate  } from '../../../reducers/slices/cajaItemsSlice'
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Select from '../../../components/selects/Select'
import {toastr} from 'react-redux-toastr'
const tipos =  [                                
                {"value":"ingreso","label":"ingreso"},
                {"value":"egreso","label":"egreso"},                                              
                ];



function CajasItemsForm () {     
  const dispatch = useDispatch()  
  const {item} = useSelector(state => state.caja)   
  const [nitem, setnitem] = useState({
    label:"",
    monto:0,
    tipo:"ingreso",
    ptipo:"efectivo",
    cajaId:0

  });
  /*const item  = useSelector(state => state.cajasitems.item)*/  

  const changeHandler = event => {    
    const { name, value } = event.target    
    setnitem({
      ...nitem,
        [name]:value
    })
 }

 const setTipo = (val) =>{
  setnitem({
    ...nitem,
      ptipo:val
  })
 }


 const changesHandler = (name,val) => {        
    setnitem({
      ...nitem,
        [name]:val
    })
 }

const submitHandle = event => {         
  event.preventDefault()           
  let nn = nitem
      nn.cajaId = item.id 
    if(nitem.tipo === "egreso"){      
      if(parseFloat(item.pagoefectivo) >= parseFloat(nitem.monto)){               
        dispatch(cajaitemsCreate(nn))
      }else{
        toastr.error('Error', "el monto no debe ser mayor al ingreso") 
      }
    }else{
      dispatch(cajaitemsCreate(nn))
    }    
    setnitem({
      label:"",
      monto:0,
      tipo:"ingreso",
      ptipo:"efectivo"
    })    
 } 
      
  return (    
    <div className='h-max'>
    <div className='h-9 border-b w-full bg-gray-100 font-bold pl-2 uppercase  text-[13px] pt-2 text-gray-500'>
       Datos de registro 
    </div>
    <form onSubmit={submitHandle}>
    <div className='w-full flex items-center flex-col p-2'>
        <label htmlFor="monto" className='h-7 w-full text-[13px] text-gray-500 font-bold'>Monto (BOB) :</label>
        <div className='w-full border rounded border-gray-300 flex'>
        <input                              
          type="text"
          onChange={(e)=>changeHandler(e)}
          value={nitem.monto || 0}     
          autoComplete='off'           
          name="monto"
          required={true}
          className="h-8 w-full text-[13px] pt-2 pl-2 border-none text-gray-500 focus:ring-0"
        />
        </div>        
    </div>

    <div className='w-full flex items-center flex-col p-2'>
        <label htmlFor="tipo" className='h-7 w-full text-[13px] text-gray-500 font-bold'>Tipo :</label>
        <div className='w-full flex'>
            <Select
            options={tipos}
            option={nitem.tipo}                                    
            handleChange={changesHandler} 
            name={"tipo"}
            tipo={"local"}/> 
        </div>        
    </div>

    <div className='w-full flex items-center flex-col p-2'>
        <label htmlFor="forma" className='h-7 w-full text-[13px] text-gray-500 font-bold'>Forma de Pago :</label>
        <div className='w-full flex'>
            <button className={nitem.ptipo === 'efectivo' ? 'h-7 bg-sky-500 rounded-l w-1/2 flex justify-center items-center text-gray-100 font-bold':'h-7 bg-gray-200 rounded-l w-1/2 flex justify-center items-center text-gray-500' }
             type='button'
             onClick={()=>{setTipo('efectivo')}}
            >
              Efectivo  
            </button>
            <button className={nitem.ptipo === 'qr' ? 'h-7 bg-sky-500 rounded-r w-1/2 flex text-gray-100 font-bold justify-center items-center':'h-7 bg-gray-200 justify-center items-center rounded-r w-1/2 flex text-gray-500' }
            type='button'
            onClick={()=>{setTipo('qr')}}
            >
              QR
            </button>
        </div>        
    </div>

    <div className='w-full flex items-center flex-col p-2'>
        <label htmlFor="label" className='h-7 w-full text-[13px] text-gray-500 font-bold'>Detalle :</label>
        <div className='w-full flex border border-gray-300 rounded'>
            <textarea                            
              type="text"
              onChange={(e)=>changeHandler(e)}
              value={nitem.label || ""}                
              name="label"
              rows={3}
              className="w-full  text-[13px] pl-2 block border-none text-gray-500 focus:ring-0"
            />
        </div>        
    </div>
        <div className='h-10 flex items-center mt-2 pr-1 pl-1'>
            <button           
              type="submit"
              className="w-full h-9 rounded-md bg-sky-400 flex items-center justify-center text-gray-100">
              <ChevronRightIcon  className="h-5 w- text-gray-50" />                          
            </button>
        </div> 
    </form>
  </div>                        
  );
}

export default CajasItemsForm