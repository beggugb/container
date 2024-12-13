import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {toastr} from 'react-redux-toastr'
import tareaService  from "../services/tareaService"

export const tareasData = createAsyncThunk(
  "tareas/data",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await tareaService._data(dato,'tareas');                                      
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)


export const tareasCreate = createAsyncThunk(
  "tareas/create",
  async(dato,thunkAPI)=>{
      try{      
          const data = await tareaService._create(dato,'tareas');                                      
          toastr.success('tarea', 'Dato creado') 
          return { response: data }
      }catch(error){
        const {response} = error        
        toastr.error('tarea', response.data.message)                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const tareaItem = createAsyncThunk(
  "tareas/eitem",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await tareaService._item(pky,'tareas'); 
            /*thunkAPI.dispatch(setAdjuntos(item.rows));         */
            return { response: item }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const tareasDelete = createAsyncThunk(
  "tareas/delete",
  async(dato,thunkAPI)=>{    
      try{      
          const item = await tareaService._delete(dato,'tareas');     
          toastr.warning('tarea', 'Eliminado')                              
          return { response: item }
      }catch(error){                  
          toastr.error('tarea', 'No se puede eliminar')                               
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const estadosData = createAsyncThunk(
  "tareas/estados",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await tareaService._informes(dato,'estados');       
                
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

const initialState = { 
    loading:false,
    data:[],
    item:{}    
  };  
  const tareaSlice = createSlice({
    name: "tarea",
    initialState,  
    reducers:{
      resetItem:(state)=>{
        state.item = {}
      },
      settarea:(state,action)=>{      
        state.item = action.payload
      },
      setsetTasks:(state,action)=>{               
        state.data = action.payload
      }, 
      resetData:(state)=>{
        state.data    = []
        state.item     = {}
      },    
    },
    extraReducers(builder) { 
        builder
        .addCase(tareasData.pending,(state) =>{
            state.loading = true            
        })
        .addCase(tareasData.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response
        })
        .addCase(tareasData.rejected,(state)=>{
          state.loading = false
         
        }) 
        .addCase(tareasDelete.pending,(state) =>{
          state.loading = true            
      })
      .addCase(tareasDelete.fulfilled,(state,action)=>{
          state.loading = false
          state.data  = action.payload.response
      })
      .addCase(tareasDelete.rejected,(state)=>{
        state.loading = false
       
      }) 
        .addCase(tareasCreate.pending,(state) =>{
          state.loading = true            
          state.item    = {}
        })
        .addCase(tareasCreate.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response         
        })
        .addCase(tareasCreate.rejected,(state)=>{
          state.loading = false            
        })
        .addCase(tareaItem.pending,(state) =>{
          state.loading = true            
          state.item    = {}
        })
        .addCase(tareaItem.fulfilled,(state,action)=>{
            state.loading = false
            state.item    = action.payload.response
        })
        .addCase(tareaItem.rejected,(state)=>{
          state.loading = false            
        })

      } 
    });
export const { resetItem, resetData, settarea, setTasks} = tareaSlice.actions
const { reducer } = tareaSlice;
export default reducer; 
