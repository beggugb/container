import React,{useEffect,useState,useRef} from "react";
import { tareasData, tareasCreate, tareasDelete } from '../../reducers/slices/tareaSlice'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'
import timeGridPlugin from '@fullcalendar/timegrid'
import { getMes } from '../../helpers/functions'
import { useDispatch, useSelector } from 'react-redux'
import { XMarkIcon } from "@heroicons/react/24/solid"

const Calendar = () =>{
    const dispatch = useDispatch()
    const calendarRef = useRef()
    const {data} = useSelector(state=>state.tarea)    
    const user = JSON.parse(localStorage.getItem('@usuarioFitt')) 
    const [fecha, setfecha] = useState(null);
    const [showModal, setShowModal] = React.useState(false);
    const [showModals, setShowModals] = React.useState(false);
    const [titulo, settitulo] = useState('');
    const [tareaId, settareaId] = useState(0);
    const [detalle,setdetalle] = useState('');     

    const chargeData = () =>{
        const { desde, hasta} = getMes()
        let dato ={
            usuarioId: user.id,
            start: desde,
            end: hasta,
            gstart: desde,
            gend: hasta
        }
        dispatch(tareasData(dato))
        /*dispatch(tareaActions.getList('tareaData','tareas',dato,'lista'))*/
        
    }

    useEffect(() => {
      chargeData()
      return () => {
        
      };
    }, []);

    const handleClick = (it) =>{
      settareaId(it.event.id)        
      settitulo(it.event.title)                
      setdetalle(it.event.extendedProps.detalle)       
      setShowModals(true) 
    }

    const handleDate = (e) =>{
        setShowModal(true)
        setfecha(e.dateStr)        
    }

    const handleClear = () =>{
        settitulo('')
        setfecha('')
        settareaId(0)
        setdetalle('')
        setShowModal(false)
        setShowModals(false)
    }
 
    const toggleModalView = () => {    
        handleClear()
    };
    const toggleModalViews = () => {    
        handleClear()
    };

    const submitHandle = event =>{    
       event.preventDefault()
      let calendarApi = calendarRef.current.getApi()              
      const {start, end } = calendarApi.currentDataManager.data.dateProfile.currentRange      
      let xstart = new Date(start)
      let xend = new Date(end)  
        let iok ={            
            start: fecha,
            end: fecha,
            gstart : xstart.getFullYear()+'-'+("0" + (xstart.getMonth() + 1)).slice(-2)+'-01',
            gend   : xend.getFullYear()+'-'+("0" + (xend.getMonth() + 1)).slice(-2)+'-31',
            title: titulo,
            detalle: detalle,
            backgroundColor: "#1fa2f2",
            usuarioId: user.id
          }
          dispatch(tareasCreate(iok))
       /* dispatch(tareaActions.postAdd('tareaData','tareas',iok))   */
        iok = {}
        handleClear()

    }

    const deleteHandle = () =>{ 
        let calendarApi = calendarRef.current.getApi()              
        const {start, end } = calendarApi.currentDataManager.data.dateProfile.currentRange      
        let xstart = new Date(start)
        let xend = new Date(end) 
        let iok ={
            tareaId: tareaId,              
            gstart : xstart.getFullYear()+'-'+("0" + (xstart.getMonth() + 1)).slice(-2)+'-01',
            gend   : xend.getFullYear()+'-'+("0" + (xend.getMonth() + 1)).slice(-2)+'-31',
            usuarioId: user.id
          }
          /*dispatch(tareaActions.postSearch('tareaData','tareas',iok))   */
          dispatch(tareasDelete(iok))
        iok = {} 
        handleClear()        
    }

   

    const handlePrev = () => {      
        let calendarApi = calendarRef.current.getApi()        
        calendarApi.prev()       
        const {start, end } = calendarApi.currentDataManager.data.dateProfile.currentRange      
        let xstart = new Date(start)
        let xend = new Date(end)      
        let dato = {            
          gstart : xstart.getFullYear()+'-'+("0" + (xstart.getMonth() + 1)).slice(-2)+'-01',
          gend   : xend.getFullYear()+'-'+("0" + (xend.getMonth() + 1)).slice(-2)+'-31',
          usuarioId: user.id,
        }   
        dispatch(tareasData(dato))
        /*dispatch(tareaActions.getList('tareaData','tareas',dato,'lista'))*/
        
      }

    const handleNext = () => {      
        let calendarApi = calendarRef.current.getApi()        
        calendarApi.next()
        const {start, end } = calendarApi.currentDataManager.data.dateProfile.currentRange
        let xstart = new Date(start)
        let xend = new Date(end)      
        let dato = {            
          gstart : xstart.getFullYear()+'-'+("0" + (xstart.getMonth() + 1)).slice(-2)+'-01',
          gend   : xend.getFullYear()+'-'+("0" + (xend.getMonth() + 1)).slice(-2)+'-31',
          usuarioId: user.id,
        }   
        dispatch(tareasData(dato))
        /*dispatch(tareaActions.getList('tareaData','tareas',dato,'lista'))       */
        
    }  
    
      


 return(
  <div className="h-2/4 flex-1 mx-auto p-2 mb-10">         
    <FullCalendar
        ref={calendarRef}
        locales={[esLocale]}
        locale={'es'}
        timeZone={'America/La_Paz'}
        navLinks={true}
        height={540}
        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
        
        events={data}  
        eventClick={handleClick}   
        dateClick={handleDate}
        customButtons={{
            prev:{              
                click: function(){                              
                  handlePrev()
               }
            },
            next:{              
              click: function(){                              
                handleNext()
             }
            }
          }}
    />
    {showModal ? (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-2/5 my-6 "> 
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">                   
              <button 
                    onClick={() => toggleModalView()}
                    className="w-7 h-7 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    <XMarkIcon className="h-6 w-6" />
              </button>        

            <div className="p-3 text-[13px] text-gray-600">
              <h6>Detalle</h6>
              <div className="border border-gray-100">                                
                <textarea 
                  type="text" 
                  name="titulo" 
                  id="titulo" 
                  rows={4}
                  required
                  value={titulo || ''} 
                  onChange={ (e) => settitulo(e.target.value)}
                  className="focus:ring-0 w-full bg-slate-200" 
                />
              </div>
              <div>
                <button
                  onClick={submitHandle}
                  className="mt-2 bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-5 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit" >Guardar
                </button>                        
              </div>
          </div>  
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>        
    ) : null} 

  {showModals ? (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-2/5 my-6"> 
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">                   
              <button 
                    onClick={() => toggleModalViews()}
                    className="w-7 h-7 bg-red-500 rounded-full text-xs text-white mt-1 mr-4">
                    X
              </button>        

            <div className="p-3">
              <h6>Detalle</h6>
              <div className="h-20 border-2 border-gray-200 rounded-md">                                
                {titulo}
              </div>
              <div>
               
                <button
                  onClick={deleteHandle}
                  className="mt-2 bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-5 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit" >Borrar
                </button>                      
              </div>
          </div>  
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>        
    ) : null}

   
  </div>
    )
}
export default Calendar