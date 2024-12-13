import React, {useEffect, PureComponent } from 'react'
import Moment from 'react-moment'
import {nombreEmpresa, subEmpresa } from '../../../helpers/data'

const hoy = new Date()
/*const Recibo = ({user,recibo,membresia}) => {  */
export class Recibo extends PureComponent {      
    render() {
    return ( 
        <div className="border-2 border-gray-300 p-1 flex flex-row justify-center text-xs">     
        <div className="w-80 border-2 border-gray-300 rounded-md">     
            <div className="h-16 border-b-2 text-center">
            <h6 className="text-sm font-bold">{nombreEmpresa}</h6>
            <h6 className="text-sm font-bold">{subEmpresa}</h6>
            </div>

            <div className="p-1 flex flex-row justify-center">
                <p className="w-1/5">Recibo:</p> <p className="pl-3 w-4/5">{this.props.recibo.id}</p>                
            </div>
            <div className="p-1 flex flex-row justify-center">                
                <p className="w-1/5">Fecha:</p> <p className="pl-3 w-4/5"><Moment format="DD/MM/YYYY">{hoy}</Moment></p>                
            </div>
            <div className="p-1 flex flex-row justify-center">                
                <p className="w-1/5">Cliente:</p> <p className="pl-3 w-4/5">{this.props.recibo.cliente}</p>                
            </div>
            <div className="p-1 flex flex-row justify-center">                
                <p className="w-1/5">Vigencia:</p> <p className="pl-3 w-4/5">
                    <Moment format="DD/MM/YYYY">{this.props.membresia.ivigencia}</Moment> - <Moment format="DD/MM/YYYY">{this.props.membresia.fvigencia}</Moment>
                </p>
            </div>

            <div className="border-2 mt-2 flex flex-row">                
                <p className="pl-2 w-9/12 bg-gray-200 font-bold">Detalle</p> 
                <p className="pl-2 w-3/12 bg-gray-200 font-bold">Total</p>                                               
            </div>

            <div className="h-20 border-1 flex flex-row pt-2">                                
                <p className="w-9/12 pl-2 mt-1">{this.props.membresia.npaquete || ''}</p> 
                <p className="w-3/12 pl-2 mt-1">
                {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.recibo.importe)}
                </p> 
            </div>

            <div className="h-6 p-2 flex">                                
                <p className="w-1/6 ">Usuario</p> 
                <p className="w-3/6 font-bold"> {this.props.recibo.usuario}</p>                                               
            </div>
            <div className="h-6 p-2 flex">                                
                <p className="w-4/6">Fecha y hora de impresión</p> 
                <p className="w-4/6"> <Moment format="DD/MM/YYYY HH:mm:ss">{hoy}</Moment></p>                                               
            </div>
        </div>
    </div>   
     );
    }
}
 
export default Recibo;