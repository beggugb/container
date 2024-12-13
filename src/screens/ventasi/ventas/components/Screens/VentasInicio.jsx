import React,{ useEffect} from "react";
import { Modal, ModalBody, Row,Col,Button, ButtonGroup } from "reactstrap"
import { useSelector, useDispatch} from 'react-redux'
import { crudActions } from '../../../../../actions/crud.actions'
import Pagination from '../../../../../components/Navigations/Pagination'
import FormSearch from "../../../../../components/Forms/SearchCompuesto"
import TableVentas from "../Tables/TableVentas"
import { useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faPlus, faTrash, faFilePdf, faTimes } from "@fortawesome/free-solid-svg-icons";
import { mVenta  } from '../../../../../data/dataLoad'
import VentaView from '../View/VentaView'
import ItemView from '../View/ItemView'

const VentasInicio = () =>{
    const dispatch = useDispatch()  
    let navigate = useNavigate();
    const { nota, plan,  data, item, items, total, pagina, paginas,indicador, indicadorTotal, indicadorEstado, modalView, modalViews } = useSelector(state => state.venta)    
    const user = JSON.parse(localStorage.getItem('@usuarioUnity22')) 
    const chargeData = (page,num) =>{
        dispatch(crudActions.getData('ventasData','ventas',page,num,'id','desc'))
    }  
    const setIndicador = (pky,est,total) => {            
        let iok = pky === indicador  ? 0 : pky        
        dispatch({type:'ventaIndicador',response:iok,estado:est,total:total}) 
    };
  
    const toggleModalView = (view) => {    
        let est = !modalView            
        if(indicador !== 0){
            dispatch({type:'ventaView',response:est})            
            dispatch(crudActions.getItem('ventaAdd','ventas',indicador))
        }                 
    };  

    const toggleModalViews = (view) => {    
        let est = !modalViews            
        if(indicador !== 0){
            dispatch({type:'ventaViews',response:est})            
            dispatch(crudActions.getItem('ventaAdd','ventas',indicador))
        }                 
    };
    const editar = () =>{
        if(indicador !==0){
            dispatch(crudActions.getItem('ventaAdd','ventas',indicador))
            navigate('/admin/ventas/nuevo');
        }        
    }
    /*plan, nroPagos, contado, banco, inicial, cuota, total, usuarioId */
    const aprobarItem = (plan,cuota) =>{                
        if(indicador !== 0){
            let iok={ 
                id: indicador,
                plan: plan,
                nroPagos: cuota,
                contado: true,
                banco: true,
                inicial: 0,
                cuota: cuota,
                total: indicadorTotal
            }
                             
            dispatch(crudActions.putAprobar('ventasData','ventas',iok,'unit'))            
        }   
        console.log(indicador)     
    }

    const deleteItem = () =>{
        if(indicador !== 0 ){
            dispatch(crudActions.dDelete('ventasData','ventas',indicador))
        }
    }

    const submitHandle = ()=>{                
        if(indicador !==0){
                dispatch(crudActions.getItem('ventaAdd','ventas',indicador))
                navigate('/admin/ventas/nuevo');            
        }
        else{
            let dok={
                usuarioId: user.id
            }
            dispatch(crudActions.postAdd('ventasData','ventas',dok,'unit'))        
        }        
    }

    useEffect(() => {
        chargeData(1,12)
        return () => {
            //*cleanup
        };
    }, []);

    return(
     <div className="content">
        <div className="main-contenido">
            <div className="navigador">
                <Row>
                  <Col md="6">
                    <ButtonGroup>                
                        <Button 
                                className={indicador !== 0 ? "btn-ts disabled border-top-left": "btn-ts border-top-left"} 
                                onClick={()=> submitHandle()}>
                                <FontAwesomeIcon icon={faPlus} className="bts"/>
                        </Button> 
                        <Button 
                                className={indicador === 0 || indicadorEstado === 'aprobado' ? "btn-ts disabled": "btn-ts"} 
                                onClick={()=> editar()}>
                                <FontAwesomeIcon icon={faEdit} className="bts"/>
                        </Button>                                       
                        <Button 
                                className={indicador === 0 || indicadorEstado === 'aprobado' ? "btn-ts disabled": "btn-ts"} 
                                onClick={()=> deleteItem()}>
                                <FontAwesomeIcon icon={faTrash} className="bts"/>
                        </Button>                       
                        <Button 
                                className={indicador === 0 ? "btn-ts disabled": "btn-ts"} 
                                onClick={()=> toggleModalView()}>
                                <FontAwesomeIcon icon={faFilePdf} className="bts"/>
                        </Button>
                        <Button 
                                className={indicador === 0 || indicadorEstado === 'aprobado' ? "btn-ts disabled border-top-right": "btn-ts border-top-right"} 
                                onClick={()=> toggleModalViews()}>
                                <FontAwesomeIcon icon={faCheck} className="bts"/>
                        </Button>                 
                        </ButtonGroup>
                    </Col>
                    <Col md="6" >
                      <FormSearch
                        xredux={'ventasData'}
                        payload={'ventas'}
                        items={mVenta}
                        inicial={'observaciones'}
                      />  
                    </Col>
                </Row>
            </div>
            <TableVentas
                data={data}
                setIndicador={setIndicador}    
                indicador={indicador}                
            />
            <Pagination 
                chargeData={chargeData}
                total={total}
                paginas={paginas}
                current={pagina}            
            />

            <Modal isOpen={modalView} toggle={toggleModalView}>
                <Button className="btn-view btn-danger" onClick={()=> toggleModalView()}>
                    <FontAwesomeIcon icon={faTimes}/>
                </Button>  
                <ModalBody>
                  <VentaView
                    item={item}
                    items={items}
                    nota={nota}
                    plan={plan}
                  />
                </ModalBody>
            </Modal>

            <Modal isOpen={modalViews} toggle={toggleModalViews}>
                <Button className="btn-view btn-danger" onClick={()=> toggleModalViews()}>
                    <FontAwesomeIcon icon={faTimes}/>
                </Button>  
                <ModalBody>
                  <ItemView
                    item={item}
                    items={items}
                    aprobarItem={aprobarItem}
                  />
                </ModalBody>
            </Modal>
        </div>
     </div>   

    )
}    

export default VentasInicio