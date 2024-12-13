import React,{ useEffect, useState} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { categoriasItems } from '../../../reducers/slices/categoriaSlice'
import { setCate } from '../../../reducers/slices/ventaSlice'
import { stockCategoria } from '../../../reducers/slices/productoSlice'
import { HomeIcon } from "@heroicons/react/24/outline";

const ListaCategorias = () =>{ 
    const dispatch = useDispatch()    
    const { items } = useSelector(state => state.categoria) 
    const [category, setcategory] = useState(0);


    const chargeDatas = () =>{      
      dispatch(categoriasItems())     
    }
 
    const chargeProductos = (pky) =>{           
      setcategory(pky)
      dispatch(stockCategoria({categoriaId:pky})) 
      dispatch(setCate(pky))
    }

    useEffect(() => {
        chargeDatas(1,14)
        return () => {
         /*   dispatch({type:'categoriasReset'})*/
        };
    }, []);


 return(   
  <div className="w-full items-center bg-white flex pl-1 overflow-y-auto text-[13px]">  
    <button 
      onClick={() => chargeProductos(0)}
      className={ category === 0 ? 'h-9 bg-sky-500 rounded-t text-gray-50 border border-sky-500 font-bold hover:bg-sky-400 pl-4 pr-4':'h-9 bg-gray-200 font-bold rounded-t text-gray-500 hover:bg-sky-400 hover:text-gray-50 pl-4 pr-4 border border-gray-300'}>
        <HomeIcon className='h-5 w-5'/>
    </button>      
    {items.map((itt,inde)=>(
      <button 
        key={inde} 
        onClick={() => chargeProductos(itt.value)}
        className={ category === itt.value ? 'h-9 bg-sky-500 rounded-t text-gray-50 font-bold border border-sky-500 hover:bg-sky-400 pl-4 pr-4':'h-9 bg-gray-200 font-bold rounded-t text-gray-500 hover:bg-sky-400 hover:text-gray-50 pl-4 pr-4 border border-gray-300'}>
          {itt.label}
      </button>      
    ))
    }
  </div>      
    )
}

export default ListaCategorias
