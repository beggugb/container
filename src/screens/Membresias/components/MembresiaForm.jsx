import {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {toastr} from 'react-redux-toastr'
import SelectData from '../../../components/selects/SelectData'
import {  membresiasCreate } from '../../../reducers/slices/membresiaSlice'
import{ getFecha, addM, addMM, getInicio} from '../../../helpers/functions'

const MembresiaForm = () => {     
    const dispatch = useDispatch()    
    const { item }= useSelector(state => state.cliente)
    const [startDate, setStartDate] = useState(new Date());       
    const { items }= useSelector(state => state.paquete)
    let us = JSON.parse(localStorage.getItem('@usuarioFitt'))
    const [opt, setopt] = useState({
        id:0,
        label:"",
        medio:false,
        meses :0,
        valor:0,
        value:0,
        orden:1,
        num:1,
        ingresos:0,
        intros : 0,
        clienteId:0,
        ncliente:"",
        estado : false,
        paquete:"",
        paqueteId:0,        
        usuarioId:us.id,
        ivigencia:new Date(),
        fvigencia:new Date()
    });
          
    const submitHandle = () => {      
    let dat = opt
    dat.orden     = '1'
    dat.num       = 1
    dat.ingresos  = parseInt(opt.valor)
    dat.valor     = parseInt(opt.valor)
    dat.intros    = 30    
    dat.clienteId = item.id
    dat.ncliente  = item.nombres
    dat.usuarioId = us.id
    dat.paqueteId  = opt.value
    dat.estado     = false
    dat.paquete    = opt.label    
    if(dat.paqueteId){
            dispatch(membresiasCreate(dat))
            setopt({
                id:0,
                label:"",
                medio:false,
                meses :0,
                valor:0,
                value:0,
                orden:1,
                num:1,
                ingresos:0,
                intros : 0,
                clienteId:item.id,
                ncliente:item.nombres,
                estado : false,
                paquete:"",
                paqueteId:0,        
                usuarioId:us.id,
                ivigencia:new Date(),
                fvigencia:new Date()
            })
    }else{
        toastr.error('Error', 'debe seleccionar paquete') 
    }    
 }

 const handleChange = (e) =>{
    const { name, value } = e.target
    setopt({
        ...opt,
        [name]:value
    })
 }
 

 const handleChangex = (it) =>{       
    let iok ={
        label  : it ? it.label:"",
        diario : it ? it.diario:false,
        medio  : it ? it.medio:0,
        meses  : it ? it.meses:0,
        valor  : it ? it.valor:0,
        value  : it ? it.value:0
    }    
    let ivigencia = ""
    let fvigencia = ""

    if(iok.valor !== '0' && iok.valor !== 0 )
    {
        
        if(iok.meses === '0.5')
        {            
            ivigencia = getInicio()
            fvigencia = addM(startDate)            
            
        }else if(iok.diario){              
            ivigencia = getInicio()
            fvigencia = getInicio()
        }
        else{         
            ivigencia = getFecha(startDate)
            let fok = parseInt(iok.meses) + 1            
            fvigencia = addMM(fok)
        }
      
    }    
    iok.fvigencia = fvigencia
    iok.ivigencia = ivigencia
    setopt(iok)
}


 return (  
    <div className="w-full flex-col flex rounded-md text-[13px] text-gray-500">
        <div className="h-10 w-full flex rounded-md text-[13px] text-gray-500">
            <div className='flex w-2/12 items-center'>
                <label htmlFor='paqueteId' className='h-8 w-full p-2 font-bold'> Paquetes :</label>  
            </div> 
            <div className='flex w-6/12 pr-4'>
            <SelectData
                options={items}
                option={opt.value}
                handleChange={handleChangex}                                                                         
                name={"paqueteId"}/>
            </div> 
            <div className='flex w-2/12 items-center justify-center font-bold'>
                Valor :
            </div> 
            <div className='h-8 flex w-2/12 items-center justify-center font-bold bg-gray-100 '>                
                {opt.valor ? new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(opt.valor): "0.00"}
            </div> 
        </div>      
        <div className="h-10 w-full flex rounded-md text-[13px] text-gray-500">
            <div className='w-5/12 flex pr-2 items-center'>
                <label htmlFor="ivigencia" className='h-8 w-1/3 p-2 text-[13px] text-gray-500 font-bold'>
                    Fecha Inicio :</label>
                    <input                              
                    type="date"
                    onChange={(e) => handleChange(e)}
                    required={true} 
                    value={opt.ivigencia}                
                    name="ivigencia"
                    className="pt-1 pl-2 h-8 w-2/3  block text-[13px] border border-gray-300  rounded"
                    />
            </div>
            <div className='w-5/12 flex pr-2 items-center'>
                <label htmlFor="fvigencia" className='h-8 w-1/3 p-2 text-[13px] text-gray-500 font-bold'>
                    Fecha Fin :</label>
                <input                              
                    type="date"
                    onChange={(e) => handleChange(e)}
                    required={true} 
                    value={opt.fvigencia}                
                    name="fvigencia"
                    className="pt-1 pl-2 h-8 w-2/3  block text-[13px] border border-gray-300  rounded"
                />
            </div>
            <div className='w-2/12 justify-center items-center flex pl-1'>
                <button
                   onClick={() =>submitHandle()}
                   className="h-8 w-full  bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-[13px] rounded"> Registrar
                </button>     
            </div>
        </div>                          
    </div>            
  );
}
 
export default MembresiaForm;