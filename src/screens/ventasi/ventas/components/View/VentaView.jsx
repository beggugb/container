import React,{useEffect, useRef} from "react";
import { useDispatch } from 'react-redux'
import { Table,Col,Row,Button } from "reactstrap";
import ReactToPrint from "react-to-print";
import Moment from 'react-moment'
import 'moment/locale/es-mx'

const ComponentToPrint = React.forwardRef((props,ref)=>{    
    const fechaHoy = new Date()    
    const empresa = JSON.parse(localStorage.getItem('@empresaUnity22')) 
    return(
        <div ref={ref}>
            <div className="reporte">
                <div className="reporteHeader">
                <p>Usuario: {props.usuario.nombres} - Fecha : <Moment format="DD-MM-YYYY">{ fechaHoy }</Moment></p>
                <Row>
                    <Col md={12}>
                    <h5 className="text-center pio"> <b>Resumen Compra # <b>{props.item.id}</b></b></h5>                             
                    </Col>            
                </Row>
                </div>
                <div className="resumenHeader">                    
                    <Table className="table-kardex">
                        <tbody>
                            <tr>                                
                                <td width="10%"><b>Origen:</b></td>
                                <td width="20%">{props.item.origen}</td>
                                <td width="10%"><b>Fecha:</b></td>
                                <td width="25%"><Moment format="DD-MM-YYYY">{props.item.fechaCompra}</Moment></td>                                
                                <td width="10%"><b>Estado:</b></td>
                                <td width="25%">{props.item.estado}</td>
                            </tr>
                            <tr>                                
                                <td ><b>Tipo:</b></td>
                                <td >{props.item.tipo}</td>
                                <td ><b>Usuario:</b></td>
                                <td >{props.item.usuario.nombres}</td>                                
                                <td ><b>Sucursal :</b></td>
                                <td >{props.item.sucursal.nombre}</td>
                            </tr>
                            <tr>                                
                                <td ><b>Proveedor:</b></td>
                                <td >{props.item.proveedor.razonSocial}</td>                                
                                <td ><b>NºItems :</b></td>
                                <td >{props.item.nroItems}</td>
                                <td ><b>Total:</b></td>
                                <td >       
                                {new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(props.item.totalGeneral)}                          
                                </td>
                            </tr>
                            <tr>
                                <td ><b>Detalle:</b></td>
                                <td colSpan={5}>{props.item.observaciones}</td>                                
                            </tr>
                                                     
                        </tbody>
                    </Table>                                        
                </div>      
                <div className="resumen-body">
                <Table className="table-simples">
                        <thead>   
                            <tr>
                                <th width="10%">Código</th>
                                <th width="20%">Marca</th>                                
                                <th width="40%">Nombre</th>                                
                                <th width="10%">Cantidad</th>
                                <th width="10%">Precio</th>
                                <th width="10%">SubTotal</th>
                            </tr>
                        </thead>    
                        {props.items && 
                        <tbody>    
                            { props.items.map((it,index) =>(                            
                            <tr key={index}>
                                <td>{it.codigo}</td>
                                <td>{it.marca}</td>
                                <td>{it.nombre}</td>
                                <td>{it.cantidad}/{it.unidad}</td>
                                <td>
                                {new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(it.valor)}
                                </td>
                                <td>
                                {new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(it.subTotal)}
                                </td>
                                
                            </tr>   
                            ))}
                        </tbody>    
                        }
                </Table>  
                <div className="notaResumen">
                <Row>
                  <Col md="4" className="cuadro">
                    <h6>Nota Pago</h6>
                    {props.nota &&  
                    
                    <Table className="table-kardex">
                        <tbody>
                            <tr>                                
                              <td width="40%"><b>Nro:</b></td>
                              <td width="60%">{props.nota.id}</td>
                            </tr>
                            <tr>                                
                              <td ><b>Vencimiento:</b></td>
                              <td >{props.nota.fechaVencimiento}</td>
                            </tr>
                            <tr>                                
                              <td ><b>Nº Cuotas:</b></td>
                              <td >{props.nota.cuotas}</td>
                            </tr>
                            <tr>                                
                              <td ><b>Tipo:</b></td>
                              <td >{props.nota.tipo}</td>
                            </tr>
                            <tr>                                
                              <td ><b>Monto Total:</b></td>
                              <td >
                              {new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(props.nota.montoTotal)}
                              </td>
                            </tr>
                            <tr>                                
                              <td ><b>Pago Total:</b></td>
                              <td >
                              {new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(props.nota.pagoTotal)}
                              </td>
                            </tr>
                            <tr>                                
                              <td ><b>Saldo Total:</b></td>
                              <td >
                              {new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(props.nota.saldoTotal)}
                              </td>
                            </tr>
                        </tbody>       
                    </Table> 
                    }   
                  </Col>      
                  <Col md="8" className="cuadro">
                  <h6>Plan Pagos</h6>     
                  <Table className="table-simples">
                        <thead>   
                            <tr>
                                <th width="10%">Cuota</th>
                                <th width="25%">Monto</th>                                                                                                
                                <th width="22%">F.Pago</th>
                                <th width="20%">Estado</th>
                                <th width="23%">F.Pagado</th>                                
                            </tr>
                        </thead>    
                        {props.plan && 
                        <tbody>    
                            { props.plan.map((it,index) =>(                            
                            <tr key={index}>
                                <td>{it.cuota}</td>                                
                                <td>
                                {new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(it.monto)}
                                </td>
                                <td>{it.fechaPago}</td>
                                <td>{it.estado ? "pagado":"pendiente"}</td>
                                <td>{it.fechaPagado ? it.fechaPagado : "sin pago"}</td>
                            </tr>   
                            ))}
                        </tbody>    
                        }
                </Table>  
                  </Col>      
                </Row>
                </div>
                </div>                   
            </div>    
        </div>
    )
})


const CompraView = ({item, items, nota, plan}) =>{
    const dispatch = useDispatch()
    const usuario = JSON.parse(localStorage.getItem('@usuarioUnity22'))
    const componentRef = useRef()
    useEffect(() => {        
        return () => {
            dispatch({type:'compraReset'})
        };
    }, []);

    return(
        <div className="itemReporte">
           <ReactToPrint
            trigger={() => <Button className="fas fa-print btn-sm btn-info">Imprimir</Button>}
            content={() => componentRef.current}        
        />
        <ComponentToPrint
            ref={componentRef}       
            item={item} 
            items={items}
            nota={nota}
            plan={plan}
            usuario={usuario}                          
        />    
        </div>
    )

}

export default CompraView