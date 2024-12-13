import { useEffect, useState} from "react";
import { Link } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import { QRCodeSVG } from "qrcode.react";
import Barcode from "react-barcode"
import Switch from 'react-switch'
import SelectData from '../../../../../components/selects/SelectDataRedux'
import FormImg from '../../../../../components/frms/FormIp'
import { productosUpdate, productosCreate, resetItem } from "../../../../../reducers/slices/productoSlice"
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
let iok = {        
        codigo: "",
        estado: true,
        filename: "",
        inCatalogo: true,
        inOferta: false,        
        ncategoria: "",
        nindustria: "",
        nmarca: "",
        nmodelo: "",
        nombre: "",
        norigen: "",
        ntipos: "",
        nunidad: "",
        nvolumen: "",        
        precioOferta: 0,
        precioVenta: 0,
        industriaId: 1,
        marcaId: 1,
        modeloId: 1,
        origenId: 1,
        categoriaId:1,
        tipoId: 1,
        unidadId: 1,
        volumenId: 1    
}

const ProductoEdit = () =>{
    const dispatch = useDispatch() 
    const { item } = useSelector(state => state.producto)   
    const categorias = useSelector(state => state.categoria.items)
    const marcas = useSelector(state => state.marca.items)
    const modelos = useSelector(state => state.modelo.items)
    const unidades = useSelector(state => state.unidad.items)
    const origenes = useSelector(state => state.origen.items)
    const industrias = useSelector(state => state.industria.items)
    const volumenes = useSelector(state => state.volumen.items)
    const tipos = useSelector(state => state.tipo.items)    
    const [nitem, setnitem] = useState(iok);
    
   useEffect(() => {    
        if(item.id){
            setnitem(item)
        }
    return () => {        
        
    };
   }, [item]);


   const handleChange = (e) =>{
    const { value, name } = e.target        
        setnitem({
            ...nitem,
                [name]:value
        })
  }

  const changeSwitch = (checked,name) => {      
        setnitem({
            ...nitem,
                [name]:checked
        })
  }
  
  const submitHandle = event =>{
      event.preventDefault()    
    if(item.id){            
        dispatch(productosUpdate(nitem))        
    }else{        
        dispatch(productosCreate(nitem))
    }
  }
  
  const handleChanges = (vale,name,redx) =>{
    const { label, value } = vale    
    setnitem({
        ...nitem,
            [name]:value
    })
  }
  const handleDelete = (name,redx) =>{    
    /*dispatch({type:redx,name:name,value:0})  */
  }

    return(
        <div className=" justify-center items-center flex-1">
          <div className="border-b-2 h-8 flex flex-row text-sm text-gray-500 font-bold pl-2">       
            <Link to={"/admin/inventario/productos/list"}>
            <div className="h-7 w-7 text-center rounded-l-md bg-sky-400 hover:bg-sky-300 mr-1 flex items-center">                        
              <ArrowLeftIcon className="h-5 w-5 text-gray-50" />
            </div>
            </Link>
            <span className="p-1 text-[12px]">Edición de producto</span>
          </div>

          <div className="h-500 p-1 flex flex-row">   
                <div className="w-1/3 border rounded flex-col">
                    <div className='h-8 border-b bg-gray-100 rounded-t flex items-center pl-2'>
                        <span className='font-bold ml-1 text-gray-500 text-[13px]'>  
                            Imagen
                        </span>
                    </div>
                    <div className='m-4 flex justify-center items-center p-2 border-2'>                        
                        <FormImg
                            item={item}
                            payload={"producto"}
                            payloads={"productos"}/>                      
                    </div> 
                      
                </div>     
                <div className="w-2/3 border rounded ml-1">  
                    <div className='h-8 border-b bg-gray-100 rounded-t flex items-center pl-2'>
                        <span className='font-bold ml-1 text-gray-500 text-[13px]'>  
                            Datos de producto
                        </span>
                    </div>  
                   
                    <form onSubmit={submitHandle} className="rounded p-2 flex-col text-[13px] ">    
                          <div className='w-full flex p-2 rounded-md'>
                                <div className="w-4/6 flex-col mr-2">
                                    <label htmlFor="codigo" className="p-1 font-bold text-gray-500">Código</label>
                                    <div className="border border-gray-300">
                                    <input
                                        type="text"
                                        onChange={(e) => handleChange(e)}                                                                    
                                        value={nitem.codigo}
                                        required={true}
                                        name="codigo"
                                        className="h-8 pt-2 pl-2 w-full text-[13px] border-none text-gray-600 focus:ring-0 "/>                                                                                         
                                    </div>    
                                </div>                                                            
                                <div className="w-2/6 flex-col mr-2">
                                    <label htmlFor="estado" className="p-1 font-bold text-gray-500">Estado</label>
                                    <div className="h-8 pl-2 items-center flex">
                                    <Switch                                               
                                      onChange={ (e) =>{ changeSwitch(e,'estado')}}    
                                      checked={nitem.estado} 
                                      height={20}
                                      width={48}
                                      borderRadius={20}
                                      onColor="#86d3ff"
                                      onHandleColor="#2693e6"
                                      offHandleColor="#c1c1c1"
                                    />
                                    </div>
                                </div>                                                            
                                <div className="w-2/6 flex-col">
                                    <label htmlFor="oferta" className="p-1 font-bold text-gray-500">Oferta</label>
                                    <div className="h-8 pl-2 items-center flex">
                                    <Switch                                               
                                      onChange={ (e) =>{ changeSwitch(e,'inOferta')}}  
                                      checked={nitem.inOferta}  
                                      height={20}
                                      width={48}
                                      borderRadius={20}
                                      onColor="#86d3ff"
                                      onHandleColor="#2693e6"
                                      offHandleColor="#c1c1c1"
                                    />
                                    </div>
                                </div>                                                            
                            </div>   

                            <div className='w-full flex p-2 rounded-md'>
                                <div className="w-4/6 flex-col mr-2">
                                    <label htmlFor="nombre" className="p-1 font-bold text-gray-500">Nombre</label>
                                    <div className="border border-gray-300">
                                    <input
                                        type="text"
                                        onChange={(e) => handleChange(e)}                                                                    
                                        value={nitem.nombre}
                                        required={true}
                                        name="nombre"
                                        className="h-8 pt-2 pl-2 w-full text-[13px] border-none text-gray-600 focus:ring-0 "/>  </div>
                                </div>                                                            
                                <div className="w-2/6 flex-col mr-2">
                                    <label htmlFor="precioVenta" className="p-1 font-bold text-gray-500">Precio Venta</label>
                                    <div className="border border-gray-300">
                                    <input
                                        type="number"
                                        onChange={(e) => handleChange(e)}                                                                    
                                        value={nitem.precioVenta}
                                        name="precioVenta"
                                        className="h-8 pt-2 pl-2 w-full text-[13px] border-none text-gray-600 focus:ring-0 "/>  </div>
                                   
                                </div>                                                            
                                <div className="w-2/6 flex-col">
                                    <label htmlFor="precioCompra" className="p-1 font-bold text-gray-500">Precio Compra</label>
                                    <div className="border border-gray-300">
                                    <input
                                        type="number"
                                        onChange={(e) => handleChange(e)}                                                                    
                                        value={nitem.precioCompra}
                                        readOnly={true}
                                        name="precioCompra"
                                        className="h-8 pt-2 pl-2 w-full text-[13px] border-none text-gray-600 focus:ring-0 "/>    </div>                                                                                       
                                </div>                                                            
                            </div>

                            <div className='w-full flex p-2 rounded-md'>                                                                                          
                                <div className="w-1/3 flex-col mr-2">                                    
                                    <label htmlFor='categoriaId' className='w-1/3 pl-1 font-bold text-gray-500'> Categoría </label>                 
                                    <div className='w-full flex'>
                                        <SelectData
                                            options={categorias}
                                            option={nitem.categoriaId}
                                            handleChange={handleChanges}   
                                            handleDelete={handleDelete}                                                                                              
                                            name={"categoriaId"}
                                            redux={"productoChange"}
                                        />          
                                    </div>     
                                </div>                                                            
                                <div className="w-1/3 flex-col mr-2 ">                                    
                                    <label htmlFor='marcaId' className='w-1/3 pl-1 font-bold text-gray-500'> Marcas </label>                 
                                    <div className='w-full flex'>
                                        <SelectData
                                            options={marcas}
                                            option={nitem.marcaId}
                                            handleChange={handleChanges}   
                                            handleDelete={handleDelete}                                                                                              
                                            name={"marcaId"}
                                            redux={"productoChange"}
                                        />      
                                    </div>     
                                </div>
                                <div className="w-1/3 flex-col">                                    
                                    <label htmlFor='marcaId' className='w-1/3 pl-1 font-bold text-gray-500'> Modelos </label>                 
                                    <div className='w-full flex'>
                                        <SelectData
                                            options={modelos}
                                            option={nitem.modeloId}
                                            handleChange={handleChanges}   
                                            handleDelete={handleDelete}                                                                                              
                                            name={"modeloId"}
                                            redux={"productoChange"}
                                        />      
                                    </div>     
                                </div>                                                            
                            </div>

                            <div className='w-full flex p-2 rounded-md'>                                                                                          
                                <div className="w-1/3 flex-col mr-2">                                    
                                    <label htmlFor='origenId' className='w-1/3 pl-1 font-bold text-gray-500'> Origen </label>                 
                                    <div className='w-full flex'>
                                        <SelectData
                                            options={origenes}
                                            option={nitem.origenId}
                                            handleChange={handleChanges}   
                                            handleDelete={handleDelete}                                                                                              
                                            name={"origenId"}
                                            redux={"productoChange"}
                                        />          
                                    </div>     
                                </div>                                                            
                                <div className="w-1/3 flex-col mr-2 ">                                    
                                    <label htmlFor='unidadId' className='w-1/3 pl-1 font-bold text-gray-500'> Unidad </label>                 
                                    <div className='w-full flex'>
                                        <SelectData
                                            options={unidades}
                                            option={nitem.unidadId}
                                            handleChange={handleChanges}   
                                            handleDelete={handleDelete}                                                                                              
                                            name={"unidadId"}
                                            redux={"productoChange"}
                                        />      
                                    </div>     
                                </div>
                                <div className="w-1/3 flex-col">                                    
                                    <label htmlFor='industriaId' className='w-1/3 pl-1 font-bold text-gray-500'> Industria </label>                 
                                    <div className='w-full flex'>
                                        <SelectData
                                            options={industrias}
                                            option={nitem.industriaId}
                                            handleChange={handleChanges}   
                                            handleDelete={handleDelete}                                                                                              
                                            name={"industriaId"}
                                            redux={"productoChange"}
                                        />      
                                    </div>     
                                </div> 
                            </div>

                            <div className='w-full flex p-2 rounded-md'>                                                                                          
                                <div className="w-1/3 flex-col mr-2">                                    
                                    <label htmlFor='volumenId' className='w-1/3 pl-1 font-bold text-gray-500'> Volumen </label>                 
                                    <div className='w-full flex'>
                                        <SelectData
                                            options={volumenes}
                                            option={nitem.volumenId}
                                            handleChange={handleChanges}   
                                            handleDelete={handleDelete}                                                                                              
                                            name={"volumenId"}
                                            redux={"productoChange"}
                                        />          
                                    </div>     
                                </div>                                                            
                                <div className="w-1/3 flex-col mr-2 ">                                    
                                    <label htmlFor='tipoId' className='w-1/3 pl-1 font-bold text-gray-500'> Tipo </label>                 
                                    <div className='w-full flex'>
                                        <SelectData
                                            options={tipos}
                                            option={nitem.tipoId}
                                            handleChange={handleChanges}   
                                            handleDelete={handleDelete}                                                                                              
                                            name={"tipoId"}
                                            redux={"productoChange"}
                                        />      
                                    </div>     
                                </div> 
                                <div className="w-1/3 flex justify-end">                                    
                                    <button
                                        className="mt-3 ml-1 bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-5 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit"> {nitem.id ? "Actualizar":"Registrar"}
                                    </button>
                                </div>                                
                            </div>

                    </form> 
                    { item.id &&
                        <div className="h-20 flex">                            
                            <div className="w-4/6 flex border justify-center">
                                <Barcode value={nitem.codigo || 0 } width={1.7} height={40} fontSize={12} />
                            </div>
                            <div className="w-2/6 flex border justify-center items-center">
                                <QRCodeSVG value={nitem.codigo} style={{ width: 60, height: 60, padding:2, border: 'solid 1px #c1c1c1', marginRight: 5 }}/>
                            </div>
                        </div>                
                    }                    
                  </div>         
            </div>

                
      </div> 
    )
}

export default ProductoEdit