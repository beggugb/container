import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {toastr} from 'react-redux-toastr'
import cajaService  from "../services/cajaService"


export const paquetesData = createAsyncThunk(
  "paquetes/data",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._data(dato,'paquetes');                                                    
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const paquetesItems = createAsyncThunk(
  "paquetes/items",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._itemsList(dato,'paquetes');   
      
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const paquetesCreate = createAsyncThunk(
  "paquetes/create",
  async(dato,thunkAPI)=>{
      try{      
          const data = await cajaService._create(dato,'paquetes');                                      
          toastr.success('paquete', 'Dato creado') 
          return { response: data }
      }catch(error){
        const {response} = error        
        toastr.error('paquete', response.data.message)                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const paquetesUpdate = createAsyncThunk(
  "paquetes/update",
  async(dato,thunkAPI)=>{
      try{      
          const data = await cajaService._update(dato,'paquetes');            
          toastr.success('paquete', 'Actualizado')                                     
          return { response: data }
      }catch(error){     
        toastr.error('paquete', 'error de actualizacion')               
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const paqueteItem = createAsyncThunk(
  "paquetes/eitem",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await cajaService._item(pky,'paquetes');           
          return { response: item.row }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const paquetesItem = createAsyncThunk(
  "paquetes/item",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await cajaService._item(pky,'paquetes');        
         /* thunkAPI.dispatch(setData(item.rows));         */
          return { response: item.row }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const paquetesDelete = createAsyncThunk(
  "paquetes/delete",
  async(dato,thunkAPI)=>{    
      try{      
          const item = await cajaService._delete(dato,'paquetes');     
          toastr.warning('paquete', 'Eliminado')                              
          return { response: item }
      }catch(error){                  
          toastr.error('paquete', 'No se puede eliminar')                               
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const estadosData = createAsyncThunk(
  "paquetes/estados",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._informes(dato,'estados');       
                
        return { response: data }
      }catch(error){                  
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
    estados:[],
    spaquete:{},    
    pTotal:0,
    pSaldo:0,
    pPago:0    
  };  
  const paqueteSlice = createSlice({
    name: "paquete",
    initialState,  
    reducers:{
      resetItem:(state)=>{
        state.item = {}
      },
      setpaquete:(state,action)=>{      
        state.item = action.payload
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
        .addCase(paquetesData.pending,(state) =>{
            state.loading = true            
        })
        .addCase(paquetesData.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas          
        })
        .addCase(paquetesData.rejected,(state)=>{
          state.loading = false
         
        }) 
        .addCase(paquetesDelete.pending,(state) =>{
          state.loading = true            
      })
      .addCase(paquetesDelete.fulfilled,(state,action)=>{
          state.loading = false
          state.data  = action.payload.response.data    
          state.total = action.payload.response.total          
          state.pagina = action.payload.response.pagina          
          state.paginas = action.payload.response.paginas          
      })
      .addCase(paquetesDelete.rejected,(state)=>{
        state.loading = false
       
      }) 
        .addCase(paquetesCreate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(paquetesCreate.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas             
        })
        .addCase(paquetesCreate.rejected,(state)=>{
          state.loading = false            
        })
        /** update */
        .addCase(paquetesUpdate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(paquetesUpdate.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas   
        })
        .addCase(paquetesUpdate.rejected,(state)=>{
          state.loading = false
          
        })
        .addCase(paqueteItem.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(paqueteItem.fulfilled,(state,action)=>{
            state.loading = false
            state.item    = action.payload.response
        })
        .addCase(paqueteItem.rejected,(state)=>{
          state.loading = false            
        })

        .addCase(paquetesItem.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(paquetesItem.fulfilled,(state,action)=>{
            state.loading = false
            state.item    = action.payload.response
        })
        .addCase(paquetesItem.rejected,(state)=>{
          state.loading = false            
        })
        


        .addCase(paquetesItems.pending,(state) =>{
          state.loading = true            
        })
        .addCase(paquetesItems.fulfilled,(state,action)=>{
          state.loading = false
          state.items  = action.payload.response                      
        })
        .addCase(paquetesItems.rejected,(state)=>{
          state.loading = false     
        })
        .addCase(estadosData.pending,(state) =>{
          state.loading = true            
        })
        .addCase(estadosData.fulfilled,(state,action)=>{
            state.loading   = false
            state.estados   = action.payload.response.data          
            state.total     = action.payload.response.total
            state.pPago     = action.payload.response.pPago
            state.pSaldo    = action.payload.response.pSaldo
            state.pTotal    = action.payload.response.pTotal
            state.spaquete  = action.payload.response.paquete
        })
        .addCase(estadosData.rejected,(state)=>{
          state.loading = false       
        })
      } 
    });
export const { resetItem, resetData, setpaquete} = paqueteSlice.actions
const { reducer } = paqueteSlice;
export default reducer; 
