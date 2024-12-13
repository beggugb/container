import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import {apis, api} from '../../helpers/api'
import Moment from 'react-moment'
import RegistroForm from './components/RegistroForms';

const  RegistroView = () => {   
  const { cliente, membresia, message, bandera  } = useSelector(state => state.registro)
  const [mount, setMount] = useState(false)   
  const audioTune1 = new Audio(`${apis}/static/audios/acceso.mp3`);
  const audioTune2 = new Audio(`${apis}/static/audios/denegado.mp3`);

  const [playInLoop1] = useState(false);
  const [playInLoop2] = useState(false);
 
  const playSound1 = () => {
    audioTune1.play();
  }
  const playSound2 = () => {
    audioTune2.play();
  }

   useEffect(() => {
     if(!mount) {
      setMount(true); 
      audioTune1.load();
      audioTune2.load();
    }
    }, [mount,audioTune1,audioTune2])

     useEffect(() => {
      if(!mount) {
      setMount(true); 
      audioTune1.loop = playInLoop1;
      audioTune2.loop = playInLoop2;
      }
    },[playInLoop1,playInLoop2,audioTune1.loop,audioTune2.loop,mount])
 
    switch(bandera){
      case 1:
        playSound1()
      break;
      case 2:
        playSound2()
      break;
      case 3:
        playSound2()
      break;  
      default:
      break;
    }  



return ( 
  <div className="h-620 flex p-2 "> 
      <div className='h-600 w-1/2 border flex bg-[#212b34] p-2 items-center justify-center'>
            { cliente.filename ?  
              <img
              alt=""
              className="h-580 flex w-full bg-lackgray-600"
              src={apis + "/static/images/clientes/lg/" + cliente.filename}
              />
              :
             <img
                    alt="..."
                    className="h-300"
                    src={require("../../assets/img/logo.png")}
                /> }
      </div>
      <div className='h-600 w-1/2 border flex flex-col bg-stone-300 p-1'>
          <div className='h-20'>
            <RegistroForm/> 
          </div>
          <div className='h-500 flex-col flex p-1 bg-gray-300'>
                <div className="h-20 flex flex-row border-2 bg-gray-100 justify-between">
                    <p className="pt-6 pl-4 w-2/5 border-2 bg-blue-400">NOMBRES :</p> 
                    <p className="pt-6 pl-4 w-3/5 border-2">{cliente.nombres}</p> 
                </div>

                <div className="h-20 flex flex-row border-2 bg-gray-100 justify-between">
                    <p className="pt-6 pl-4 w-2/5 border-2 bg-blue-400">CI :</p> 
                    <p className="pt-6 pl-4 w-3/5 border-2">{cliente.ci}</p> 
                </div>                                  
                
                <div className="h-20 flex flex-row border-2 bg-gray-100 justify-between">
                    <p className="pt-6 pl-4 w-2/5 border-2 bg-blue-400">PAQUETE :</p> 
                    <p className="pt-6 pl-4 w-3/5 border-2">{membresia.paquete}</p> 
                </div>

                <div className="h-20 flex flex-row border-2 bg-gray-100 justify-between">
                    <p className="pt-6 pl-4 w-2/5 border-2 bg-blue-400">VENCIMIENTO :</p> 
                    <p className="pt-6 pl-4 w-3/5 border-2">
                    { membresia.fvigencia ? <Moment format="l">{membresia.fvigencia}</Moment>:"" }
                    </p> 
                </div>                                       
                <div className="h-44 flex w-full border  text-white text-4xl">
                    <div className={bandera === 1 ?"h-44 items-center justify-center flex w-full bg-green-500 border-2" :"h-44 items-center justify-center flex bg-red-500 w-full border-2" }>
                        <span>{ message } </span>
                    </div>                      
                </div> 
          </div>
      </div>
  </div> 
);
}
 

export default RegistroView ;
