import React,{useState} from "react";
import { Table,Col,Row,Button, Input, Label, FormGroup } from "reactstrap";
import Moment from 'react-moment'
import Switch from 'react-switch'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { getFormateada } from '../../../../../helpers/functions'
import 'moment/locale/es-mx'


const ItemView = ({item, items, aprobarItem})=>{        
    const empresa = JSON.parse(localStorage.getItem('@empresaUnity22')) 
    const [cuota, setcuota] = useState(0);    
    const [inicial, setinicial] = useState(0);    
    const [subtotal, setsubtotal] = useState(0);
    const [plan, setplan] = useState([]);
    
    const calcular = () =>{
        let newArray = [];
        let diok = false;
        let dd = new Date ();        
        for(let index = 0; index < cuota; index ++){                    
            if(index === 0 && inicial){
                setinicial(parseFloat(item.totalGeneral)/cuota)
                diok = true
            } 
            let iok = {
                cuota     : index+1,
                monto     : (parseFloat(item.totalGeneral)/cuota).toFixed(2),
                estado    : diok,
                fechaPago : getFormateada(),
                mes       : dd.getMonth() + 1                
            }
            newArray.push(iok)
            diok = false                        
        }        
        setplan(newArray)
        setsubtotal(item.totalGeneral)

    }

    const onChange = (event,item) => {      
        const {name, value } = event.target    
        let xarray = [...plan]  
        for (let index = 0; index < cuota; index++) {            
          xarray[item]['fechaPago']= value    
        }  
        setplan(xarray)
      };
      const onChanges = (event,item) => {       
        const {name, value } = event.target        
        let xarray = [...plan]        
        for (let index = 0; index < cuota; index++) {            
            xarray[item]['monto']= value      
        }
        let sn = 0
        xarray.map((it,index) =>{
            sn+= parseFloat(it.monto)
        })
        setplan(xarray)
        setsubtotal(sn)
      };
  
    return(        
            <div className="reporte">
                <div className="reporteHeader">   
                  
                
                <Row>
                    <Col md={12}>
                    <h5 className="text-center pio"> <b>Resumen Compra # <b>{item.id}</b></b></h5>                             
                    </Col>            
                </Row>
                </div>
                <div className="resumenHeader">                    
                    <Table className="table-kardex">
                        <tbody>
                            <tr>                                
                                <td width="10%"><b>Origen:</b></td>
                                <td width="20%">{item.origen}</td>
                                <td width="10%"><b>Fecha:</b></td>
                                <td width="25%"><Moment format="DD-MM-YYYY">{item.fechaCompra}</Moment></td>                                
                                <td width="10%"><b>Estado:</b></td>
                                <td width="25%">{item.estado}</td>
                            </tr>
                            <tr>                                
                                <td ><b>Tipo:</b></td>
                                <td >{item.tipo}</td>
                                <td ><b>Usuario:</b></td>
                                <td >{item.usuario.nombres}</td>                                
                                <td ><b>Sucursal :</b></td>
                                <td >{item.sucursal.nombre}</td>
                            </tr>
                            <tr>                                
                                <td ><b>Proveedor:</b></td>
                                <td >{item.proveedor.razonSocial}</td>                                
                                <td ><b>NºItems :</b></td>
                                <td >{item.nroItems}</td>
                                <td ><b>Total:</b></td>
                                <td >       
                                {new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.totalGeneral)}                          
                                </td>
                            </tr>
                            <tr>
                                <td ><b>Detalle:</b></td>
                                <td colSpan={5}>{item.observaciones}</td>                                
                            </tr>
                                                     
                        </tbody>
                    </Table>                                        
                </div>      
                <div className="resumen-body">                   
                   <Row>                       
                        <Col md={2}>                
                            <FormGroup>
                                <Label for="estado">Nro. cuotas</Label>
                                <Input type="number" name="cuota" id="cuota" 
                                value={cuota || ''}                
                                onChange={ (e) => setcuota(e.target.value)} />    
                            </FormGroup> 
                        </Col>                                              
                        <Col md={2}>                               
                            <FormGroup>
                            <Button
                                className="btn-md btn-info mt-5"
                                onClick={() => calcular()}>
                                <FontAwesomeIcon icon={faCoins} />  
                                {' '} Calcular
                            </Button>                  
                            </FormGroup> 
                        </Col>                                      
                </Row>   
                <Row> 
                    <Col>
                    <h6>Compra total : {new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.totalGeneral)}</h6>
                    <Table className="table-simple">
                    <thead>
                        <tr>  
                            <th width="30%">Fecha</th>                  
                            <th width="15%">Cuota</th>                  
                            <th width="35%">Monto</th>
                            <th width="30%">Estado</th>
                        </tr>
                    </thead>
                    {plan && (
                        <tbody>
                            {plan.map((item, index) => (
                                <tr key={index}>                                                                       
                                  <td>
                                    <Input type="date" name="fechaPago" id="fechaPago" 
                                      value={item.fechaPago || ''}       
                                      onChange={ (e) => onChange(e,index)}                     
                                    />   
                                  </td> 
                                  <td>{item.cuota}</td>
                                  <td> 
                                    <Input type="number" name="monto" id="monto" 
                                      value={item.monto || ''}       
                                      onChange={ (e) => onChanges(e,index)}                     
                                    />   
                                  </td>                                                                                                                    
                                  <td>{item.estado ? "pagado":"pendiente" }</td>                                                                    
                                </tr>  
                                ))}
                        </tbody>
                    )}
                  </Table>                     
                    </Col>
                </Row> 
                <Row>             
                    <Col md="6">
                        <Button                             
                            className={ Number(item.totalGeneral) === Number(subtotal) ? "btn-md btn-info" : "btn-md btn-info disabled"}
                            onClick={() =>aprobarItem(plan,cuota)}> Aprobar</Button>             
                    </Col>
                    <Col md="6">
                        { Number(item.totalGeneral) === Number(subtotal) ? "cuadrado " : "Los montos deben coincidir con el total" }        
                    </Col>

                </Row>    
                </div>                   
            </div>            
    )
}
export default ItemView