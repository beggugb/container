import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { clientesData, clientesItem,clienteItem, clientesDelete, resetItem } from '../../reducers/slices/clienteSlice'
import ClienteSearch from './components/ClienteSearch';
import ClienteTable from './components/ClienteTable';
import ClienteView from './components/ClienteView'
import ClienteForm from './components/ClienteForm'
import { PlusIcon } from "@heroicons/react/24/outline";
import Loading from '../../components/Loading'

const ClienteInicio = () => {
    const dispatch = useDispatch()  
    const navigate = useNavigate()
    const {data, total ,pagina, paginas, loading }= useSelector(state => state.cliente)    
    const [view, setview] = useState(false);
    const [views, setviews] = useState(false);
    const [prop, setprop] = useState("nombres");
    const [parametro, setparametro] = useState("");


    const submitHandle = (page,num) =>{       
              
      if(page > 0){
          let iok={
              page  : page,
              num   : num,
              prop  : prop,
              params: parametro              
          }          
          dispatch(clientesData(iok))
      }
      
    }
    const submitHandles = (page,num) =>{        
      let iok={
          page : page ?page:1,
          num  : num ? num:14,
          prop : prop,
          params: parametro
      }      
      dispatch(clientesData(iok))
    }      
  useEffect(() =>{                
      submitHandles(1,14)
            
  }, []);


  const handleDelete = (pk) =>{
    let iok={
      clienteId : pk,      
      page   : pagina, 
      num    : 14,  
      prop   : prop, 
      params : parametro
  }  
    dispatch(clientesDelete(iok))     
  } 
  const handleEdit = (pky) =>{    
    dispatch(resetItem())    
    dispatch(clientesItem({id:pky,tip:'unit'}))     
    setviews(true)
  }

  const handleShow = (pky) =>{
    dispatch(resetItem())    
    dispatch(clientesItem({id:pky,tip:'pdf'}))   
    setview(true)
  }

  const handleNew = () =>{
    dispatch(resetItem())    
    setviews(true)
  }

  const handleMembresias = (pky) =>{
    dispatch(clienteItem({id:pky,tip:'data'}))
    navigate("/admin/membresia");
  }

return ( 
  <>
  <div className="h-600 p-1 border-2 boder-gray-300">
    <div className='h-16 flex border-l border-r border-t w-full  border-gray-300'>
      <div className='h-16 w-1/2 flex  items-center pl-2'>
          <button 
            className='h-8 border w-56 rounded flex'
            onClick={() =>handleNew()}>
                <div className='h-8 w-1/6 border border-sky-500 bg-sky-500 rounded-l flex items-center justify-center'>
                  <PlusIcon className="h-5 w-5 text-gray-50" />    
                </div>
                <div className='h-8 w-5/6 border border-sky-400 bg-sky-400 hover:bg-sky-500 rounded-r flex font-bold  justify-center items-center text-[12px] text-gray-50'>
                  Nuevo Cliente
                </div>
          </button> 
      </div>
      <div className='h-16 w-1/2 flex items-center pr-2'>
        <ClienteSearch prop={prop} setprop={setprop} parametro={parametro} setparametro={setparametro}/>
      </div>
    </div>
    <div className='h-480 border-l borde-r boder-b w-full bg-gray-100'>
    <ClienteTable
      data={data}
      pagina={pagina}
      paginas={paginas}
      total={total}
      submitHandle={submitHandle}
      handleShow={handleShow}
      handleDelete={handleDelete}
      handleEdit={handleEdit}      
      handleMembresias={handleMembresias}
    />
    </div>           
  </div>   
  <ClienteForm views={views} setviews={setviews} pagina={pagina} prop={prop} parametro={parametro} />
  <ClienteView view={view} setview={setview} />
  <Loading loading={loading}/>
  </>
);
}
 
export default ClienteInicio;



