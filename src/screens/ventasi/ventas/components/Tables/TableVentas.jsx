import React from "react";
import { Table, Input  } from "reactstrap";
import Moment from 'react-moment'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPencil } from "@fortawesome/free-solid-svg-icons";

const TableVenta = ({data,setIndicador,indicador}) =>{
    return(   
        <div className="tableContenedor">
        <Table className="table-simple">            
            <thead>
                <tr>                    
                    <th width='5%'></th>                    
                    <th width='15%'>Fecha</th>
                    <th width='25%'>Tipo</th>
                    <th width='20%'>Detalle</th>
                    <th width='15%'>Cliente</th>
                    <th width='10%'>Estado</th>
                </tr>
            </thead>
            {data.length > 0 ?
            <tbody>
                { data.map((item,index) =>(
                <tr key={index} className={item.estado === 'pendiente' ? 'rawActivo':null }>
                    <td>
                        <Input type="checkbox" 
                          onChange={() => { setIndicador(item.id, item.estado, item.totalGeneral) }} 
                          checked={ item.id === indicador ? true : false}
                          />
                    </td>                    
                    <td><Moment format="DD-MM-YYYY">{item.fechaVenta}</Moment></td>
                    <td>{item.tipo}</td>
                    <td>{item.observaciones}</td>
                    <td>{item.cliente.nombres || ''}</td>                   
                    <td className="text-center">{item.estado}{item.estado === 'pendiente' ? <FontAwesomeIcon icon={faPencil} className="btn-tabla"/>: null} </td>                   
                </tr>
                ))}
            </tbody>
            : 
            <tbody>                
                <tr>                    
                   <td colSpan={5}>Sin resultados</td>                                        
                </tr>                
            </tbody>
            }           
        </Table> 
        </div>       
    )
}

export default TableVenta;