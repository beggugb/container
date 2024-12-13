import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {toastr} from 'react-redux-toastr'
import cajaService  from "../services/cajaService"


export const tiposData = createAsyncThunk(
  "tipos/data",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._data(dato,'tipos');                                                    
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const tiposItems = createAsyncThunk(
  "tipos/items",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._itemsList(dato,'tipos');           
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const tiposCreate = createAsyncThunk(
  "tipos/create",
  async(dato,thunkAPI)=>{
      try{      
          const data = await cajaService._create(dato,'tipos');                                                        
          toastr.success('tipo', 'Regitrado')    
          return { response: data }
      }catch(error){
        const {response} = error        
        toastr.error('tipo', response.data.message)                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const tiposUpdate = createAsyncThunk(
  "tipos/update",
  async(dato,thunkAPI)=>{
      try{      
          const data = await cajaService._update(dato,'tipos');            
          toastr.success('tipo', 'Actualizado')                                     
          return { response: data }
      }catch(error){     
        toastr.error('tipo', 'error de actualizacion')               
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const tipoItem = createAsyncThunk(
  "tipos/eitem",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await cajaService._item(pky,'tipos');           
          return { response: item }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const tiposDelete = createAsyncThunk(
  "tipos/delete",
  async(dato,thunkAPI)=>{    
      try{      
          const item = await cajaService._delete(dato,'tipos');     
          toastr.warning('tipo', 'Eliminado')                              
          return { response: item }
      }catch(error){                  
          toastr.error('tipo', 'No se puede eliminar')                               
          return thunkAPI.rejectWithValue();           
      }   
  }
)


const initialState = { 
    loading:false,
    data:[],
    item:{},
    items:[],    
    total:0,
    pagina:0,
    paginas:0,      
       
  };  
  const tipoSlice = createSlice({
    name: "tipo",
    initialState,  
    reducers:{
      resetItem:(state)=>{
        state.item = {}
      },
      settipo:(state,action)=>{      
        state.item = action.payload
      },
      setTipos:(state,action)=>{      
        state.items = action.payload
      },
          
      resetData:(state)=>{
        state.data    = []
        state.total   = 0
        state.pagina  = 0
        state.paginas = 0        
        state.items    = []
        state.item     = {}
      },    
    },
    extraReducers(builder) { 
        builder
        .addCase(tiposData.pending,(state) =>{
            state.loading = true            
        })
        .addCase(tiposData.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas          
        })
        .addCase(tiposData.rejected,(state)=>{
          state.loading = false
         
        }) 
        .addCase(tiposDelete.pending,(state) =>{
          state.loading = true            
      })
      .addCase(tiposDelete.fulfilled,(state,action)=>{
          state.loading = false
          state.data  = action.payload.response.data    
          state.total = action.payload.response.total          
          state.pagina = action.payload.response.pagina          
          state.paginas = action.payload.response.paginas          
      })
      .addCase(tiposDelete.rejected,(state)=>{
        state.loading = false
       
      }) 
        .addCase(tiposCreate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(tiposCreate.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas           
        })
        .addCase(tiposCreate.rejected,(state)=>{
          state.loading = false            
        })
        /** update */
        .addCase(tiposUpdate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(tiposUpdate.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas  
        })
        .addCase(tiposUpdate.rejected,(state)=>{
          state.loading = false
          
        })
        .addCase(tipoItem.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(tipoItem.fulfilled,(state,action)=>{
            state.loading = false
            state.cstate  = action.payload.response
        })
        .addCase(tipoItem.rejected,(state)=>{
          state.loading = false            
        })


        

   
      } 
    });
export const { resetItem, resetData, settipo,setTipos} = tipoSlice.actions
const { reducer } = tipoSlice;
export default reducer; 
