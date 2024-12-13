import React from "react";
import {Row, Col } from 'reactstrap'

const InicioView = () =>{

    return(
        <div className="content">
        <div className="main-contenido">
           <Row>
                <Col md="6" className="cuadro-chart">   
                asd
                </Col>     

                <Col md="6" className="cuadro-chart"> 
                asdasd
                </Col>
           </Row>
           <Row>
                <Col md={6} className="cuadro-chart">
               asdasd
                </Col>
                <Col md={6} className="cuadro-chart">
                asdasdas
                </Col>
           </Row>     
        </div>          
    </div>
    )
}

export default InicioView