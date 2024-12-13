import React from 'react'
import { useDispatch } from 'react-redux'
import Select from "react-select";
import { custom } from '../../helpers/customStyles'
import {Col, Label, FormGroup} from 'reactstrap'
import { defaultVal } from "../../helpers/functions"


const SelectLocalPaises = ({label,items,xreduxItem,keyId,itemId,monedas}) =>{     
    const dispatch = useDispatch()     
    const empresa = JSON.parse(localStorage.getItem('@empresaUnity22'))
    const handleChange = event =>{        
        const {value, indice} = event ? event : ''         
        dispatch({type:xreduxItem,name:keyId,value:value})     
        
        let datc = monedas.filter(d => (d.indice === indice) )   
        let iok  = datc[0].label + ' ('+datc[0].value+')'             
        dispatch({type:xreduxItem,name:'moneda',value:datc[0].value})     
        dispatch({type:xreduxItem,name:'labelMoneda',value:iok})     
        
        let newData = empresa
        newData.moneda = datc[0].value
        newData.labelMoneda =  iok       
        localStorage.setItem("@empresaUnity22", JSON.stringify(newData));

    }

    return(        
        <Col md={4}>
            <FormGroup>
            <Label for="nombre">{label} </Label>         
            <Select
                defaultValue={items[0]}
                name={keyId}
                id={keyId}
                options={items}      
                isClearable={false}                                   
                styles={custom}
                value={defaultVal(items,itemId)}
                onChange={(e)=>handleChange(e)}
            />
            </FormGroup>
        </Col>                
    )
}

export default SelectLocalPaises