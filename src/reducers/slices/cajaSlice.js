import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {toastr} from 'react-redux-toastr'
import cajaService  from "../services/cajaService"
import { setItems, setData } from "./cajaItemsSlice"

export const cajasData = createAsyncThunk(
  "cajas/data",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._data(dato,'cajas');                                                    
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const cajasItems = createAsyncThunk(
  "cajas/items",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._itemsList(dato,'cajas');   
      
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const cajasCreate = createAsyncThunk(
  "cajas/create",
  async(dato,thunkAPI)=>{
      try{      
          const data = await cajaService._create(dato,'cajas');                                      
          const {rows, bdn} = data
          if(bdn){
            toastr.success('caja', 'Dato creado') 
          }else{
            toastr.error('caja', 'Tiene caja abierta hoy') 
          }          
          return { response: rows }
      }catch(error){
        const {response} = error        
        toastr.error('caja', response.data.message)                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const cajasUpdate = createAsyncThunk(
  "cajas/update",
  async(dato,thunkAPI)=>{
      try{      
          const data = await cajaService._update(dato,'cajas');            
          toastr.success('caja', 'Actualizado')                                     
          return { response: data }
      }catch(error){     
        toastr.error('caja', 'error de actualizacion')               
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const cajaItem = createAsyncThunk(
  "cajas/eitem",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await cajaService._item(pky,'cajas');           
          return { response: item }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const cajasItem = createAsyncThunk(
  "cajas/item",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await cajaService._item(pky,'cajas');        
          thunkAPI.dispatch(setItems(item.rows));         
          return { response: item.row }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const cajasItemd = createAsyncThunk(
  "cajas/itemd",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await cajaService._item(pky,'cajas');        
          thunkAPI.dispatch(setData(item.rows));         
          return { response: item.row }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const cajasDelete = createAsyncThunk(
  "cajas/delete",
  async(dato,thunkAPI)=>{    
      try{      
          const item = await cajaService._delete(dato,'cajas');     
          toastr.warning('caja', 'Eliminado')                              
          return { response: item }
      }catch(error){                  
          toastr.error('caja', 'No se puede eliminar')                               
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const estadosData = createAsyncThunk(
  "cajas/estados",
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
    scaja:{},    
    pTotal:0,
    pSaldo:0,
    pPago:0,
    cstate:false,     
  };  
  const cajaSlice = createSlice({
    name: "caja",
    initialState,  
    reducers:{
      resetItem:(state)=>{
        state.item = {}
      },
      setcaja:(state,action)=>{      
        state.item = action.payload
      },
      resetData:(state)=>{
        state.data    = []
        state.total   = 0
        state.pagina  = 0
        state.paginas = 0
        state.estados  = []
        state.scaja = {}    
        state.pTotal   = 0
        state.pSaldo   = 0
        state.pPago    = 0
        state.items    = []
        state.item     = {}
      },    
    },
    extraReducers(builder) { 
        builder
        .addCase(cajasData.pending,(state) =>{
            state.loading = true            
        })
        .addCase(cajasData.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas          
        })
        .addCase(cajasData.rejected,(state)=>{
          state.loading = false
         
        }) 
        .addCase(cajasDelete.pending,(state) =>{
          state.loading = true            
      })
      .addCase(cajasDelete.fulfilled,(state,action)=>{
          state.loading = false
          state.data  = action.payload.response.data    
          state.total = action.payload.response.total          
          state.pagina = action.payload.response.pagina          
          state.paginas = action.payload.response.paginas          
      })
      .addCase(cajasDelete.rejected,(state)=>{
        state.loading = false
       
      }) 
        .addCase(cajasCreate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(cajasCreate.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas           
        })
        .addCase(cajasCreate.rejected,(state)=>{
          state.loading = false            
        })
        /** update */
        .addCase(cajasUpdate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(cajasUpdate.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas  
        })
        .addCase(cajasUpdate.rejected,(state)=>{
          state.loading = false
          
        })
        .addCase(cajaItem.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(cajaItem.fulfilled,(state,action)=>{
            state.loading = false
            state.cstate  = action.payload.response
        })
        .addCase(cajaItem.rejected,(state)=>{
          state.loading = false            
        })

        .addCase(cajasItem.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(cajasItem.fulfilled,(state,action)=>{
            state.loading = false
            state.item    = action.payload.response
        })
        .addCase(cajasItem.rejected,(state)=>{
          state.loading = false            
        })


        .addCase(cajasItemd.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(cajasItemd.fulfilled,(state,action)=>{
            state.loading = false
            state.item    = action.payload.response
        })
        .addCase(cajasItemd.rejected,(state)=>{
          state.loading = false            
        })
        


        .addCase(cajasItems.pending,(state) =>{
          state.loading = true            
        })
        .addCase(cajasItems.fulfilled,(state,action)=>{
          state.loading = false
          state.items  = action.payload.response                      
        })
        .addCase(cajasItems.rejected,(state)=>{
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
            state.scaja  = action.payload.response.caja
        })
        .addCase(estadosData.rejected,(state)=>{
          state.loading = false       
        })
      } 
    });
export const { resetItem, resetData, setcaja} = cajaSlice.actions
const { reducer } = cajaSlice;
export default reducer; 
