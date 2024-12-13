import React,{useEffect, useState} from 'react'
import { paquetesItems } from '../../reducers/slices/paqueteSlice'
import { useSelector, useDispatch } from 'react-redux'
import{ getFecha, addM, addMM, add_months, getInicio} from '../../helpers/functions'
import SelectData from '../../components/selects/SelectData'


const SelectSimple = () =>{     
    const dispatch = useDispatch()    
    const [startDate, setStartDate] = useState(new Date());   
    const [endDate, setEndDate] = useState(new Date());
    const { items }= useSelector(state => state.paquete)
    const [opt, setopt] = useState({
        id:0,
        label:"",
        medio:false,
        meses :0,
        valor:0,
        value:0
    });


    const getCharge = () =>{        
         dispatch(paquetesItems())
    }
    
    useEffect(() => {
        getCharge()
        return () => {
            /*dispatch({type:'resetMembresia'})*/
            };
    }, []);
    
    const handleChange = (it) =>{   
        let iok ={
            label  : it ? it.label:"",
            diario : it ? it.diario:false,
            medio  : it ? it.medio:0,
            meses  : it ? it.meses:0,
            valor  : it ? it.valor:0,
            value  : it ? it.value:0
        }
        setopt(iok)
        let ivigencia = ""
        let fvigencia = ""


        /* let io = it ? it.value: 0
        let va = it ? it.valor: 0
        let da = it ? it.diario: false           
        let md = it ? it.meses: 0*/

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

        console.log(ivigencia)
        console.log(fvigencia)

          /*  dispatch({type:'membresiasChange',props:'ivigencia',value:ivigencia})
            dispatch({type:'membresiasChange',props:'fvigencia',value:fvigencia})
        }else{
           /* dispatch({type:'membresiasChange',props:'ivigencia',value:startDate})
            dispatch({type:'membresiasChange',props:'fvigencia',value:endDate})
        }*/




       /* let io = it ? it.value: 0
        let va = it ? it.valor: 0
        let da = it ? it.diario: false           
        let md = it ? it.meses: 0

        dispatch({type:'membresiasChange',props:'paqueteId',value:io})
        dispatch({type:'paquetesChange',props:'id',value:io})          
        dispatch({type:'paquetesChange',props:'valor',value:va}) 
        dispatch({type:'paquetesChange',props:'diario',value:da}) 

        let ivigencia = ""
        let fvigencia = ""
        
        
        if(va !== '0' && va !== 0 )
        {
            
            if(md === '0.5')
            {            
                ivigencia = getInicio()
                fvigencia = addM(startDate)            
                
            }else if(da){              
                ivigencia = getInicio()
                fvigencia = getInicio()
            }
            else{         
                ivigencia = getFecha(startDate)
                let iok = parseInt(md) + 1            
                fvigencia = addMM(iok)
            }
          
          /*  dispatch({type:'membresiasChange',props:'ivigencia',value:ivigencia})
            dispatch({type:'membresiasChange',props:'fvigencia',value:fvigencia})
        }else{
           /* dispatch({type:'membresiasChange',props:'ivigencia',value:startDate})
            dispatch({type:'membresiasChange',props:'fvigencia',value:endDate})
        }*/
            
    }
   
    
    return(
        <div className='w-full flex items-center'> 
            <div className='flex w-2/12 items-center'>
                <label htmlFor='paqueteId' className='h-8 w-full p-2 font-bold'> Paquetes :</label>  
            </div> 
            <div className='flex w-6/12 pr-4'>
            <SelectData
                options={items}
                option={opt.value}
                handleChange={handleChange}                                                                         
                name={"paqueteId"}/>
            </div> 
            <div className='flex w-2/12 items-center justify-center font-bold'>
                Valor :
            </div> 
            <div className='h-8 flex w-2/12 items-center justify-center font-bold bg-gray-100 '>                
                {opt.valor ? new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(opt.valor): "0.00"}
            </div> 
        </div>        
    )
}

export default SelectSimple