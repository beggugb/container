import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom';
import { cajasItemd, resetItem } from '../../reducers/slices/cajaSlice'
import { cajaitemsData } from '../../reducers/slices/cajaItemsSlice'
import CajasItemsTable from './components/CajasItemsTable'
import CajaDetalle from '../Cajas/components/CajaDetalle';
import CajasItemsForm from './components/CajasItemsForm';
import Moment from 'react-moment'
import {  ChevronDoubleLeftIcon  } from "@heroicons/react/24/outline";

function CajasItemsView() {     
  const dispatch = useDispatch()  
  const { item } = useSelector(state => state.caja)   
  const { data, pagina, paginas, total } = useSelector(state => state.cajaitems)
  let { cajaId } = useParams();   
  

  const utils = () =>{    
    dispatch(cajasItemd({id:cajaId,tip:'data'}))
  }
  
  useEffect(() => {
    if(cajaId){            
      utils()
    }    
    return () => {
      dispatch(resetItem())      
    };
  }, []);


  const getData = (page,num) =>{
    if(page > 0){
      let iok={
        page:page,
        num:num,
        cajaId: cajaId
      }
      dispatch(cajaitemsData(iok))  
    }  

  }

    return (
    <div className="h-620 p-1 border border-gray-200">
    <div className="border-b h-8 flex flex-row text-sm text-gray-500 font-bold">       
      <div className="w-3/5 flex">
        <Link to={"/admin/cajas"}>
            <div className="h-7 w-8 text-center rounded-l-md bg-sky-400 hover:bg-sky-300 flex items-center justify-center">                        
                  <ChevronDoubleLeftIcon className="h-5 w-5 text-gray-50"/>                
            </div>
        </Link>
      </div>
      <div className="w-2/5 pt-1 flex justify-around">
        <span className="w-1/2 pl-2 text-xs">Caja Nº : { item.id } </span> 
        <span className="w-1/2 pl-2 text-xs">Fecha : <Moment format="DD-MM-YYYY">{ item.registro }</Moment></span>
      </div>
    </div>

    <div className="flex flex-row">            
      <div className='h-560 w-1/5 p-1  bg-gray-100'>
      <CajasItemsForm/>
      </div>
      <div className='h-560 w-4/5 pl-2'>
      <CajaDetalle/>
       <CajasItemsTable
        data={data}
        total={total}
        pagina={pagina}
        paginas={paginas}
        getData={getData}
       /> 
      </div>
    </div>
  </div>     
 );  
}

export default CajasItemsView