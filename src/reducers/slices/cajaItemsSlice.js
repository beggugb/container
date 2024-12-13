import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {toastr} from 'react-redux-toastr'
import cajaService  from "../services/cajaService"
import { setcaja } from "./cajaSlice"

export const cajaitemsData = createAsyncThunk(
  "cajaitems/data",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._data(dato,'cajaitems');                                                    
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const cajaitemsItems = createAsyncThunk(
  "cajaitems/items",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._itemsList(dato,'cajaitems');   
      
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const cajaitemsCreate = createAsyncThunk(
  "cajaitems/create",
  async(dato,thunkAPI)=>{
      try{      
          const data = await cajaService._create(dato,'cajaitems');                                      
          thunkAPI.dispatch(setcaja(data.row));  
          toastr.success('cajaitems', 'Dato creado') 
          return { response: data.rows }
      }catch(error){
        const {response} = error        
        toastr.error('cajaitems', response.data.message)                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const cajaitemsUpdate = createAsyncThunk(
  "cajaitems/update",
  async(dato,thunkAPI)=>{
      try{      
          const data = await cajaService._update(dato,'cajaitems');            
          toastr.success('cajaitems', 'Actualizado')                                     
          return { response: data }
      }catch(error){     
        toastr.error('cajaitems', 'error de actualizacion')               
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const cajaitemsItem = createAsyncThunk(
  "cajaitems/eitem",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await cajaService._item(pky,'cajaitems');           
          return { response: item }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const cajaitemsDelete = createAsyncThunk(
  "cajaitems/delete",
  async(dato,thunkAPI)=>{    
      try{      
          const item = await cajaService._delete(dato,'cajaitems');     
          toastr.warning('cajaitems', 'Eliminado')                              
          return { response: item }
      }catch(error){                  
          toastr.error('cajaitems', 'No se puede eliminar')                               
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const estadosData = createAsyncThunk(
  "cajaitems/estados",
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
    scajaitems:{},    
    pTotal:0,
    pSaldo:0,
    pPago:0,
    cstate:false,     
  };  
  const cajaitemslice = createSlice({
    name: "cajaitems",
    initialState,  
    reducers:{
      resetItem:(state)=>{
        state.item = {}
      },
      setItems:(state,action)=>{
        state.items= action.payload
      },
      setData:(state,action)=>{
        state.data    = action.payload.data    
        state.total   = action.payload.total          
        state.pagina  = action.payload.pagina          
        state.paginas = action.payload.paginas
      },
      setcajaitems:(state,action)=>{      
        state.item = action.payload
      },
      resetData:(state)=>{
        state.data    = []
        state.total   = 0
        state.pagina  = 0
        state.paginas = 0
        state.estados  = []
        state.scajaitems = {}    
        state.pTotal   = 0
        state.pSaldo   = 0
        state.pPago    = 0
        state.items    = []
        state.item     = {}
      },    
    },
    extraReducers(builder) { 
        builder
        .addCase(cajaitemsData.pending,(state) =>{
            state.loading = true            
        })
        .addCase(cajaitemsData.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas          
        })
        .addCase(cajaitemsData.rejected,(state)=>{
          state.loading = false
         
        }) 
        .addCase(cajaitemsDelete.pending,(state) =>{
          state.loading = true            
      })
      .addCase(cajaitemsDelete.fulfilled,(state,action)=>{
          state.loading = false
          state.data  = action.payload.response.data    
          state.total = action.payload.response.total          
          state.pagina = action.payload.response.pagina          
          state.paginas = action.payload.response.paginas          
      })
      .addCase(cajaitemsDelete.rejected,(state)=>{
        state.loading = false
       
      }) 
        .addCase(cajaitemsCreate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(cajaitemsCreate.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas            
        })
        .addCase(cajaitemsCreate.rejected,(state)=>{
          state.loading = false            
        })
        /** update */
        .addCase(cajaitemsUpdate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(cajaitemsUpdate.fulfilled,(state,action)=>{
            state.loading = false
            state.item    = action.payload.response.row              
            state.data    = action.payload.response.rows.data    
            state.total   = action.payload.response.rows.total          
            state.pagina  = action.payload.response.rows.pagina          
            state.paginas = action.payload.response.rows.paginas  
        })
        .addCase(cajaitemsUpdate.rejected,(state)=>{
          state.loading = false
          
        })
        .addCase(cajaitemsItem.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(cajaitemsItem.fulfilled,(state,action)=>{
            state.loading = false
            state.cstate  = action.payload.response
        })
        .addCase(cajaitemsItem.rejected,(state)=>{
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
            state.scajaitems  = action.payload.response.cajaitems
        })
        .addCase(estadosData.rejected,(state)=>{
          state.loading = false       
        })
      } 
    });
export const { resetItem, resetData, setcajaitems, setData, setItems} = cajaitemslice.actions
const { reducer } = cajaitemslice;
export default reducer; 
