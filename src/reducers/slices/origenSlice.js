import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {toastr} from 'react-redux-toastr'
import cajaService  from "../services/cajaService"


export const origenesData = createAsyncThunk(
  "origenes/data",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._data(dato,'origenes');                                                    
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const origenesItems = createAsyncThunk(
  "origenes/items",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._itemsList(dato,'origenes');           
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const origenesCreate = createAsyncThunk(
  "origenes/create",
  async(dato,thunkAPI)=>{
      try{      
          const data = await cajaService._create(dato,'origenes');                                                       
          return { response: data }
      }catch(error){
        const {response} = error        
        toastr.error('origen', response.data.message)                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const origenesUpdate = createAsyncThunk(
  "origenes/update",
  async(dato,thunkAPI)=>{
      try{      
          const data = await cajaService._update(dato,'origenes');            
          toastr.success('origen', 'Actualizado')                                     
          return { response: data }
      }catch(error){     
        toastr.error('origen', 'error de actualizacion')               
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const origenItem = createAsyncThunk(
  "origenes/eitem",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await cajaService._item(pky,'origenes');           
          return { response: item }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const origenesDelete = createAsyncThunk(
  "origenes/delete",
  async(dato,thunkAPI)=>{    
      try{      
          const item = await cajaService._delete(dato,'origenes');     
          toastr.warning('origen', 'Eliminado')                              
          return { response: item }
      }catch(error){                  
          toastr.error('origen', 'No se puede eliminar')                               
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
  const origenSlice = createSlice({
    name: "origen",
    initialState,  
    reducers:{
      resetItem:(state)=>{
        state.item = {}
      },
      setorigen:(state,action)=>{      
        state.item = action.payload
      },
      setOrigenes:(state,action)=>{      
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
        .addCase(origenesData.pending,(state) =>{
            state.loading = true            
        })
        .addCase(origenesData.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas          
        })
        .addCase(origenesData.rejected,(state)=>{
          state.loading = false
         
        }) 
        .addCase(origenesDelete.pending,(state) =>{
          state.loading = true            
      })
      .addCase(origenesDelete.fulfilled,(state,action)=>{
          state.loading = false
          state.data  = action.payload.response.data    
          state.total = action.payload.response.total          
          state.pagina = action.payload.response.pagina          
          state.paginas = action.payload.response.paginas          
      })
      .addCase(origenesDelete.rejected,(state)=>{
        state.loading = false
       
      }) 
        .addCase(origenesCreate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(origenesCreate.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas           
        })
        .addCase(origenesCreate.rejected,(state)=>{
          state.loading = false            
        })
        /** update */
        .addCase(origenesUpdate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(origenesUpdate.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas  
        })
        .addCase(origenesUpdate.rejected,(state)=>{
          state.loading = false
          
        })
        .addCase(origenItem.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(origenItem.fulfilled,(state,action)=>{
            state.loading = false
            state.cstate  = action.payload.response
        })
        .addCase(origenItem.rejected,(state)=>{
          state.loading = false            
        })

  

   
      } 
    });
export const { resetItem, resetData, setorigen,setOrigenes} = origenSlice.actions
const { reducer } = origenSlice;
export default reducer; 
