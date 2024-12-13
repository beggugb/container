import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {toastr} from 'react-redux-toastr'
import clienteService  from "../services/clienteService"
import { setData, setDatas } from "./membresiaSlice"

export const clientesData = createAsyncThunk(
  "clientes/data",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await clienteService._data(dato,'clientes');                                                    
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const clientesItems = createAsyncThunk(
  "clientes/items",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await clienteService._itemsList(dato,'clientes');   
      
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const clientesCreate = createAsyncThunk(
  "clientes/create",
  async(dato,thunkAPI)=>{
      try{      
          const item = await clienteService._create(dato,'clientes');                                                              
          return { response: item }
      }catch(error){
        const {response} = error        
        toastr.error('Cliente', 'Ya existe un cliente con ese CI')                 
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const clientesUpdate = createAsyncThunk(
  "clientes/update",
  async(dato,thunkAPI)=>{
      try{      
          const data = await clienteService._update(dato,'clientes');            
          toastr.success('Cliente', 'Actualizado')                                     
          return { response: data }
      }catch(error){     
        toastr.error('Cliente', 'error de actualizacion')               
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const clienteItem = createAsyncThunk(
  "clientes/eitem",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await clienteService._item(pky,'clientes');           
          thunkAPI.dispatch(setDatas(item.rows));         
          return { response: item.row }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const clientesItem = createAsyncThunk(
  "clientes/item",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await clienteService._item(pky,'clientes');        
          thunkAPI.dispatch(setData(item.rows));         
          return { response: item.row }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const clientesDelete = createAsyncThunk(
  "clientes/delete",
  async(dato,thunkAPI)=>{    
      try{      
          const item = await clienteService._delete(dato,'clientes');     
          toastr.warning('Cliente', 'Eliminado')                              
          return { response: item }
      }catch(error){                  
          toastr.error('Cliente', 'No se puede eliminar')                               
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const estadosData = createAsyncThunk(
  "clientes/estados",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await clienteService._informes(dato,'estados');       
                
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
    scliente:{},    
    pTotal:0,
    pSaldo:0,
    pPago:0    
  };  
  const clienteSlice = createSlice({
    name: "cliente",
    initialState,  
    reducers:{
      resetItem:(state)=>{
        state.item = {}
      },
      setCliente:(state,action)=>{      
        state.item = action.payload
      },
      resetData:(state)=>{
        state.data    = []
        state.total   = 0
        state.pagina  = 0
        state.paginas = 0
        state.estados  = []
        state.scliente = {}    
        state.pTotal   = 0
        state.pSaldo   = 0
        state.pPago    = 0
        state.items    = []
        state.item     = {}
      },    
    },
    extraReducers(builder) { 
        builder
        .addCase(clientesData.pending,(state) =>{
            state.loading = true            
        })
        .addCase(clientesData.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas          
        })
        .addCase(clientesData.rejected,(state)=>{
          state.loading = false
         
        }) 
        .addCase(clientesDelete.pending,(state) =>{
          state.loading = true            
      })
      .addCase(clientesDelete.fulfilled,(state,action)=>{
          state.loading = false
          state.data  = action.payload.response.data    
          state.total = action.payload.response.total          
          state.pagina = action.payload.response.pagina          
          state.paginas = action.payload.response.paginas          
      })
      .addCase(clientesDelete.rejected,(state)=>{
        state.loading = false
       
      }) 
        .addCase(clientesCreate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(clientesCreate.fulfilled,(state,action)=>{
            state.loading = false
            state.item    = action.payload.response              
        })
        .addCase(clientesCreate.rejected,(state)=>{
          state.loading = false            
        })
        /** update */
        .addCase(clientesUpdate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(clientesUpdate.fulfilled,(state,action)=>{
            state.loading = false
            state.item    = action.payload.response.row              
            state.data    = action.payload.response.rows.data    
            state.total   = action.payload.response.rows.total          
            state.pagina  = action.payload.response.rows.pagina          
            state.paginas = action.payload.response.rows.paginas  
        })
        .addCase(clientesUpdate.rejected,(state)=>{
          state.loading = false
          
        })
        .addCase(clienteItem.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(clienteItem.fulfilled,(state,action)=>{
            state.loading = false
            state.item    = action.payload.response
        })
        .addCase(clienteItem.rejected,(state)=>{
          state.loading = false            
        })

        .addCase(clientesItem.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(clientesItem.fulfilled,(state,action)=>{
            state.loading = false
            state.item    = action.payload.response
        })
        .addCase(clientesItem.rejected,(state)=>{
          state.loading = false            
        })
        


        .addCase(clientesItems.pending,(state) =>{
          state.loading = true            
        })
        .addCase(clientesItems.fulfilled,(state,action)=>{
          state.loading = false
          state.items  = action.payload.response                      
        })
        .addCase(clientesItems.rejected,(state)=>{
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
            state.scliente  = action.payload.response.cliente
        })
        .addCase(estadosData.rejected,(state)=>{
          state.loading = false       
        })
      } 
    });
export const { resetItem, resetData, setCliente} = clienteSlice.actions
const { reducer } = clienteSlice;
export default reducer; 
