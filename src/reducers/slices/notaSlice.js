import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {toastr} from 'react-redux-toastr'
import cajaService  from "../services/cajaService"
import { setDatas } from "./membresiaSlice"
export const notasData = createAsyncThunk(
  "notas/data",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._data(dato,'notas');                                                    
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const notasItems = createAsyncThunk(
  "notas/items",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._itemsList(dato,'notas');   
      
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const notasCreate = createAsyncThunk(
  "notas/create",
  async(dato,thunkAPI)=>{
      try{      
          const data = await cajaService._create(dato,'notas');                                      
          thunkAPI.dispatch(setDatas(data));              
          return { response: "ok" }
      }catch(error){
        const {response} = error        
        toastr.error('nota', response.data.message)                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const notasUpdate = createAsyncThunk(
  "notas/update",
  async(dato,thunkAPI)=>{
      try{      
          const data = await cajaService._update(dato,'notas');            
          toastr.success('nota', 'Actualizado')                                     
          return { response: data }
      }catch(error){     
        toastr.error('nota', 'error de actualizacion')               
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const notaItem = createAsyncThunk(
  "notas/eitem",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await cajaService._item(pky,'notas');           
          return { response: item }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const notasItem = createAsyncThunk(
  "notas/item",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await cajaService._item(pky,'notas');        
          /*thunkAPI.dispatch(setItems(item.rows));         */
          return { response: item.row }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const notasItemd = createAsyncThunk(
  "notas/itemd",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await cajaService._item(pky,'notas');        
          /*thunkAPI.dispatch(setData(item.rows));         */
          return { response: item.row }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const notasDelete = createAsyncThunk(
  "notas/delete",
  async(dato,thunkAPI)=>{    
      try{      
          const item = await cajaService._delete(dato,'notas');     
          toastr.warning('nota', 'Eliminado')                              
          return { response: item }
      }catch(error){                  
          toastr.error('nota', 'No se puede eliminar')                               
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const estadosData = createAsyncThunk(
  "notas/estados",
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
    nota:{},
    items:[],  
    plan:[],  
    total:0,
    pagina:0,
    paginas:0,
    estados:[],
    snota:{},    
    pTotal:0,
    pSaldo:0,
    pPago:0,
    cstate:false,     
  };  
  const notaSlice = createSlice({
    name: "nota",
    initialState,  
    reducers:{
      resetItem:(state)=>{
        state.item = {}
      },
      setnota:(state,action)=>{      
        state.item = action.payload
      },
      setitem:(state,action)=>{      
        state.nota = action.payload
      },
      setplan:(state,action)=>{      
        state.plan = action.payload
      },
      resetData:(state)=>{
        state.data    = []
        state.total   = 0
        state.pagina  = 0
        state.paginas = 0
        state.estados  = []
        state.snota = {}    
        state.pTotal   = 0
        state.pSaldo   = 0
        state.pPago    = 0
        state.items    = []
        state.item     = {}
        state.nota     = {}
      },    
    },
    extraReducers(builder) { 
        builder
        .addCase(notasData.pending,(state) =>{
            state.loading = true            
        })
        .addCase(notasData.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas          
        })
        .addCase(notasData.rejected,(state)=>{
          state.loading = false
         
        }) 
        .addCase(notasDelete.pending,(state) =>{
          state.loading = true            
      })
      .addCase(notasDelete.fulfilled,(state,action)=>{
          state.loading = false
          state.data  = action.payload.response.data    
          state.total = action.payload.response.total          
          state.pagina = action.payload.response.pagina          
          state.paginas = action.payload.response.paginas          
      })
      .addCase(notasDelete.rejected,(state)=>{
        state.loading = false
       
      }) 
        .addCase(notasCreate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(notasCreate.fulfilled,(state,action)=>{
            state.loading = false         
        })
        .addCase(notasCreate.rejected,(state)=>{
          state.loading = false            
        })
        /** update */
        .addCase(notasUpdate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(notasUpdate.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas  
        })
        .addCase(notasUpdate.rejected,(state)=>{
          state.loading = false
          
        })
        .addCase(notaItem.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(notaItem.fulfilled,(state,action)=>{
            state.loading = false
            state.cstate  = action.payload.response
        })
        .addCase(notaItem.rejected,(state)=>{
          state.loading = false            
        })

        .addCase(notasItem.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(notasItem.fulfilled,(state,action)=>{
            state.loading = false
            state.item    = action.payload.response
        })
        .addCase(notasItem.rejected,(state)=>{
          state.loading = false            
        })


        .addCase(notasItemd.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(notasItemd.fulfilled,(state,action)=>{
            state.loading = false
            state.item    = action.payload.response
        })
        .addCase(notasItemd.rejected,(state)=>{
          state.loading = false            
        })
        


        .addCase(notasItems.pending,(state) =>{
          state.loading = true            
        })
        .addCase(notasItems.fulfilled,(state,action)=>{
          state.loading = false
          state.items  = action.payload.response                      
        })
        .addCase(notasItems.rejected,(state)=>{
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
            state.snota  = action.payload.response.nota
        })
        .addCase(estadosData.rejected,(state)=>{
          state.loading = false       
        })
      } 
    });
export const { resetItem, resetData, setnota, setplan, setitem} = notaSlice.actions
const { reducer } = notaSlice;
export default reducer; 
