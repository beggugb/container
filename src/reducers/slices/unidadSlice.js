import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {toastr} from 'react-redux-toastr'
import cajaService  from "../services/cajaService"


export const unidadesData = createAsyncThunk(
  "unidades/data",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._data(dato,'unidades');                                                    
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const unidadesItems = createAsyncThunk(
  "unidades/items",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._itemsList(dato,'unidades');           
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const unidadesCreate = createAsyncThunk(
  "unidades/create",
  async(dato,thunkAPI)=>{
      try{      
          const data = await cajaService._create(dato,'unidades');                                      
          toastr.success('unidad', 'Registrado')                                         
          return { response: data }
      }catch(error){
        const {response} = error        
        toastr.error('unidad', response.data.message)                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const unidadesUpdate = createAsyncThunk(
  "unidades/update",
  async(dato,thunkAPI)=>{
      try{      
          const data = await cajaService._update(dato,'unidades');            
          toastr.success('unidad', 'Actualizado')                                     
          return { response: data }
      }catch(error){     
        toastr.error('unidad', 'error de actualizacion')               
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const unidadItem = createAsyncThunk(
  "unidades/eitem",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await cajaService._item(pky,'unidades');           
          return { response: item }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const unidadesDelete = createAsyncThunk(
  "unidades/delete",
  async(dato,thunkAPI)=>{    
      try{      
          const item = await cajaService._delete(dato,'unidades');     
          toastr.warning('unidad', 'Eliminado')                              
          return { response: item }
      }catch(error){                  
          toastr.error('unidad', 'No se puede eliminar')                               
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
  const unidadeslice = createSlice({
    name: "unidad",
    initialState,  
    reducers:{
      resetItem:(state)=>{
        state.item = {}
      },
      setunidad:(state,action)=>{      
        state.item = action.payload
      },
      setUnidades:(state,action)=>{      
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
        .addCase(unidadesData.pending,(state) =>{
            state.loading = true            
        })
        .addCase(unidadesData.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas          
        })
        .addCase(unidadesData.rejected,(state)=>{
          state.loading = false
         
        }) 
        .addCase(unidadesDelete.pending,(state) =>{
          state.loading = true            
      })
      .addCase(unidadesDelete.fulfilled,(state,action)=>{
          state.loading = false
          state.data  = action.payload.response.data    
          state.total = action.payload.response.total          
          state.pagina = action.payload.response.pagina          
          state.paginas = action.payload.response.paginas          
      })
      .addCase(unidadesDelete.rejected,(state)=>{
        state.loading = false
       
      }) 
        .addCase(unidadesCreate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(unidadesCreate.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas           
        })
        .addCase(unidadesCreate.rejected,(state)=>{
          state.loading = false            
        })
        /** update */
        .addCase(unidadesUpdate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(unidadesUpdate.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas  
        })
        .addCase(unidadesUpdate.rejected,(state)=>{
          state.loading = false
          
        })
        .addCase(unidadItem.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(unidadItem.fulfilled,(state,action)=>{
            state.loading = false
            state.cstate  = action.payload.response
        })
        .addCase(unidadItem.rejected,(state)=>{
          state.loading = false            
        })

      

        


        .addCase(unidadesItems.pending,(state) =>{
          state.loading = true            
        })
        .addCase(unidadesItems.fulfilled,(state,action)=>{
          state.loading = false
          state.items  = action.payload.response                      
        })
        .addCase(unidadesItems.rejected,(state)=>{
          state.loading = false     
        })
   
      } 
    });
export const { resetItem, resetData, setunidad,setUnidades} = unidadeslice.actions
const { reducer } = unidadeslice;
export default reducer; 
