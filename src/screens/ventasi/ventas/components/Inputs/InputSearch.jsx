import React,{ useState } from "react";
import { Input, Col, Row, Button, Label, ListGroup, ListGroupItem } from 'reactstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector} from 'react-redux'
import { crudActions } from '../../../../../actions/crud.actions'

const InputSearch = () =>{
    const dispatch = useDispatch()    
    const pitems  = useSelector(state => state.producto.items)
    const {items, item }  = useSelector(state => state.compra)
    const [name, setname] = useState("");
    const [view, setview] = useState(false);    
    const [cantidad, setCantidad] = useState(0);
    const [valor, setValor] = useState(0);    
    const [producto, setproducto] = useState();
    const fechaHoy = new Date()
    const mes = fechaHoy.getMonth() + 1
    const anio = fechaHoy.getFullYear()

    const handleSearch = () =>{
        let dato = {
            prop: 'nombre',
            value: name
        }        
        dispatch(crudActions.postSearchs('productosItems','productos',dato))
        setview(true)
    }
    const asignar = (it) =>{
        setproducto(it)
        setname(it.nombre)
        setview(false)

    }
    const agregar = () =>{                
        let newItems = [...items]
        let repeat = false   

        newItems.map((ite,index)=>{            
            if(ite.productoId === producto.id)
            {
                repeat = true
            }
            return null
        })

        if(!repeat){
            let newItem ={
                cantidad: cantidad,
                codigo:producto.codigo,
                nombre: producto.nombre,
                valor: valor,
                categoria: producto.categoria.nombre,
                marca: producto.marca.nombre,
                gestion: anio,
                mes: mes,
                subTotal: parseFloat(cantidad) * parseFloat(valor),
                unidad: producto.unidad.nombre,
                compraId: item.id,
                productoId: producto.id                
            }        
            newItems.push(newItem)                
            let nTotal = parseFloat(item.totalGeneral) + (parseFloat(cantidad) * parseFloat(valor))
            let nItems = parseInt(item.nroItems) + parseInt(cantidad)
            dispatch({type:"comprasItems",cantidad:nItems,value:nTotal,values:newItems})
            
        }        
        clear()        
    }
    

    const clear = () =>{
        setname('')
        setview(false)
        setproducto('')
        setCantidad(0)
        setValor(0)
    }

    /*console.log(items)*/

    return(
        <>
        <Row>
            <Col md="1">
                <Label className="label-frm" >Producto</Label>
            </Col>
            <Col md="4">
                <Input
                name="name"
                value={name || ""}
                className="input-searchs"
                onChange={(e) => setname(e.target.value)}
                />  
                <Button 
                    className=" btn-searchs border-circle"
                    onClick={() => handleSearch()}
                >                    
                    <FontAwesomeIcon icon={faSearch} />
                </Button>  
            </Col>                        
            <Col md="1">
                <Label className="label-frm" >Cantidad</Label>
            </Col>
            <Col md="2">
                <Input
                name="cantidad"
                value={cantidad || 0}
                onChange={(e) => setCantidad(e.target.value)}
                />    
            </Col>
            <Col md="1">
                <Label className="label-frm" >Valor </Label>
            </Col>
            <Col md="2">
                <Input
                name="valor"
                value={valor || 0}
                onChange={(e) => setValor(e.target.value)}
                />                    
            </Col>         
            <Col md="1">
                <Button 
                    className={(cantidad > 0 &&  valor > 0) ? "btn-add border-circle" : "disabled btn-add border-circle"}
                    onClick={() => agregar()}>                    
                    <FontAwesomeIcon icon={faPlus} />
                </Button>  
            </Col> 
        </Row>
        { view ?            
            <ListGroup className="items-search">
                {   pitems.map((item,index) =>(
                    <ListGroupItem 
                        key={index}
                        onClick={(e) => asignar(item)}
                        className="item-search"
                    >
                    {item.nombre} - ({item.categoria.nombre})
                    </ListGroupItem>                
                ))}
            </ListGroup>            
            : null
        }

        </>
        
    )

}


export default InputSearch