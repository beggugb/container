import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom';
import { membresiasData, membresiasDelete, membresiasItem } from '../../reducers/slices/membresiaSlice'
import { notaItem } from '../../reducers/slices/notaSlice'
import { cajaItem } from '../../reducers/slices/cajaSlice'
import { resetItem } from '../../reducers/slices/clienteSlice'    
import { paquetesItems } from '../../reducers/slices/paqueteSlice'
import MembresiaTable from './components/MembresiaTable'
import MembresiaInfo from './components/MembresiaInfo'
import MembresiaForm from './components/MembresiaForm'
import MembresiaPagar from './components/MembresiaPagar'
import {toastr} from 'react-redux-toastr'
import Loading from '../../components/Loading'


import {  ChevronDoubleLeftIcon  } from "@heroicons/react/24/outline";
const MembresiaInicio = () => {
    const dispatch = useDispatch()             
    const { item }= useSelector(state => state.cliente)
    const { data, total, pagina, paginas, loading }= useSelector(state => state.membresia)
    const {cstate} = useSelector(state => state.caja)
    let us = JSON.parse(localStorage.getItem('@usuarioFitt'))
    const [view, setview] = useState(false);
    

    const makeHttpRequestWithPage =  (page, num) =>{
      if(page > 0){
        let iok={
          page : page,
          num  : num,
          clienteId: item.id
        }
        dispatch(membresiasData(iok))
        
      }      
      
  }
    
    const delHandler = (pky) => {               
      dispatch(membresiasDelete({membresiaId:pky,clienteId:item.id}))

    }


    const getUtils = () => {               
       dispatch(cajaItem({id:us.id,tip:"usuario"}))
       dispatch(paquetesItems())
    }

    useEffect(() =>{   
      getUtils()           
      return () =>{            
        dispatch(resetItem())    
        /*dispatch({type:'resetMembresia'}) */
        /*dispatch({type:'clientesResetItem'}) */
      };
    }, []);

    /*<Link to={`/admin/notas/${item.id}`}>*/
       
    const handlePagar = (pky) =>{           
      if(cstate){ 
        dispatch(membresiasItem({id:pky,tip:"list"})) 
        setview(true)
      }else{
        toastr.error('Error', "no tiene caja abierta") 
      }      
    }


    return ( 
      <div className="h-620 p-1 border-b ">
        <div className="flex flex-col mb-1">
          <div className="h-8 flex flex-row w-full">
            <div className="w-1/12 pl-1 border-b justify-end">
              <Link to={"/admin/clientes"}>
                <div className="h-7 w-8 text-center rounded-l-md bg-sky-400 hover:bg-sky-300 flex items-center justify-center">                        
                  <ChevronDoubleLeftIcon className="h-5 w-5 text-gray-50"/>                
                </div>
              </Link>
            </div>            
            <div className="w-11/12 pl-1 pt-1 border-b">
            <span className="pl-2 text-xs">Edición de membresias  cliente: ( {item.nombres} )</span>    
            </div>           
          </div>

          <div className="h-520 flex p-1"> 
              <div className=' w-9/12 flex flex-col'>
                <div className='h-1/6 border flex border-gray-200 w-full bg-gray-50'>
                <MembresiaForm/> 
                </div>
                <div className='h-5/6' >
                  <MembresiaTable
                    data={data} 
                    total={total}
                    pagina={pagina}
                    paginas={paginas}
                    makeHttpRequestWithPage={makeHttpRequestWithPage}
                    delHandler={delHandler}
                    handlePagar={handlePagar}
                    />
                </div>
              </div>
              <div className='pl-2 w-3/12 flex'>
               <MembresiaInfo item={item}/> 
              </div>              
          </div>
        </div>
        <MembresiaPagar view={view} setview={setview} />
        <Loading loading={loading}/>
      </div>     
     );
}
 
export default MembresiaInicio;