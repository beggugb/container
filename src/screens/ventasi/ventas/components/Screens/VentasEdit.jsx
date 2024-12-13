import React,{ useEffect} from "react";
import { Col, Row } from "reactstrap"
import {useDispatch, useSelector} from 'react-redux'
import { crudActions }  from '../../../../../actions/crud.actions'
import FormVenta from '../Forms/FormVenta'
import InputSearch from '../Inputs/InputSearch'
import ProductosLista from '../../../ventas/components/Lists/ProductosLista'
const VentasEdit = () =>{
    const dispatch = useDispatch()  
    const { item, items, indicador } = useSelector(state => state.venta)     
    
   const handleChange = (e) =>{
        const { value, name } = e.target        
        dispatch({type:'ventaChange',name:name,value:value}) 
   }
 
  

   const submitHandle = event =>{
    event.preventDefault()        
    const dato ={
        item: item,
        items: items
    }
    dispatch(crudActions.putUpdates('ventaAdd','ventas',dato,indicador,'unit'))    
   } 
   
   useEffect(() => {    
    return () => {
        dispatch({type:'ventaReset'}) 
    };
   }, []);

   
    return(
        <div className="content">
            <div className="main-contenido">  
            <div className="nav-sunitys" expand="lg">            
            <Row>
                <Col md="12" className="menu">
                    {indicador > 0 ? "Editar venta":"Nueva venta" }
                </Col>                
            </Row>
            <Row>
                <Col>
                    <FormVenta
                        handleChange={handleChange}                
                        item={item}     
                        submitHandle={submitHandle}     
                    />
                </Col>
            </Row>
            <div className="items-form">
                <Row>
                    <Col>
                        <InputSearch/>
                    </Col>
                </Row>                
            </div>
            <div className="items-lista">
                <Row>
                    <Col>
                    <ProductosLista />
                    </Col>
                </Row>                
            </div>            
          </div>   
        </div>          
     </div>
    )
}

export default VentasEdit