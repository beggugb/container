import React from "react";
import { Row,Col,Button, Form, FormGroup, Input, Label } from "reactstrap"
import { useSelector } from 'react-redux'
import Moment from 'react-moment'
import 'moment/locale/es-mx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave  } from "@fortawesome/free-solid-svg-icons";
import { tiposCompra, tiposOrigen } from '../../../../../data/dataLoad'
import SelectLocalForm from "../../../../../components/Select/SelectLocalForm"
import SelectSimpleForm from "../../../../../components/Select/SelectSimpleForm";

const FormCompra = ({handleChange,item,submitHandle}) =>{
    const { items } = useSelector(state => state.proveedor)
    const empresa = JSON.parse(localStorage.getItem('@empresaUnity22')) 
    return(        
            <div className="formDato">
                <Form className="formDatos" onSubmit={submitHandle}>
                    <Row >                                         
                        <Col md="2">
                            <SelectSimpleForm
                                label={'Proveedor'}
                                items={items}
                                xredux={'proveedoresLista'}
                                xreduxItem={'compraChange'}
                                payload={'proveedores'}
                                keyId={'proveedorId'}
                                itemId={item.proveedorId}
                            />
                        </Col>
                        <Col md="2">
                            <SelectLocalForm
                                label={'Tipo'}
                                items={tiposCompra}
                                xreduxItem={'compraChange'}
                                keyId={'tipo'}
                                itemId={item.tipo}
                            />
                        </Col>
                        <Col md="2">
                            <SelectLocalForm
                                label={'Origen'}
                                items={tiposOrigen}
                                xreduxItem={'compraChange'}
                                keyId={'origen'}
                                itemId={item.origen}
                            />
                        </Col>                       
                                                 
                        <Col md="2">
                            <FormGroup>
                                <Label>Fecha Compra</Label>
                                <div className="text-date">
                                   <Moment format="LL">{item.fechaCompra}</Moment> 
                                </div>                                
                            </FormGroup>
                        </Col>
                        <Col md="2">
                            <FormGroup>
                                <Label>Cantidad</Label>
                                <Input
                                    id="nroItems"
                                    name="nroItems"
                                    type="text"
                                    value={item.nroItems}
                                    onChange={(e)=>{ handleChange(e)}}
                                    readOnly={true}
                                />                                
                            </FormGroup>
                        </Col>  
                        <Col md="2">
                           <FormGroup>
                            <Label>Total {new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(0)}</Label>
                            <Input
                             id="totalGeneral"
                                name="totalGeneral"
                                type="text"
                                value={item.totalGeneral}
                                onChange={(e)=>{ handleChange(e)}}
                                readOnly={true}
                            />
                           </FormGroup> 
                        </Col>                 
                    </Row>                    
                    <Row>
                        <Col md="8">
                            <FormGroup>
                                <Label>Detalle</Label>
                                <Input
                                id="observaciones"
                                name="observaciones"
                                type="text"                                     
                                value={item.observaciones}
                                onChange={(e)=>{ handleChange(e)}}                                    
                                />
                            </FormGroup>
                        </Col>
                        <Col md="2">
                            <FormGroup>
                                <Label>Estado</Label>
                                <Input
                                    id="estado"
                                    name="estado"
                                    type="text"
                                    value={item.estado}
                                    onChange={(e)=>{ handleChange(e)}}
                                    readOnly={true}
                                />                                
                            </FormGroup>
                        </Col> 
                        <Col md="2">
                            <Button 
                                type="submit"
                                className="btn-menu-large">
                                <FontAwesomeIcon icon={faSave} />  
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>        
    )
}


export default FormCompra