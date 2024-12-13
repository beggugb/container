import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {toastr} from 'react-redux-toastr'
import cajaService  from "../services/cajaService"

export const usuariosData = createAsyncThunk(
  "usuarios/data",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._data(dato,'usuarios');                                                    
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const usuariosItems = createAsyncThunk(
  "usuarios/items",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._itemsList(dato,'usuarios');   
      
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const usuariosCreate = createAsyncThunk(
  "usuarios/create",
  async(dato,thunkAPI)=>{
      try{      
          const data = await cajaService._create(dato,'usuarios');                                      
          toastr.success('usuario', 'Dato creado') 
          return { response: data }
      }catch(error){
        const {response} = error        
        toastr.error('usuario', response.data.message)                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const usuariosUpdate = createAsyncThunk(
  "usuarios/update",
  async(dato,thunkAPI)=>{
      try{      
          const data = await cajaService._update(dato,'usuarios');            
          toastr.success('usuario', 'Actualizado')                                     
          return { response: data }
      }catch(error){     
        toastr.error('usuario', 'error de actualizacion')               
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const usuarioItem = createAsyncThunk(
  "usuarios/eitem",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await cajaService._item(pky,'usuarios'); 
          
         /* thunkAPI.dispatch(setDatas(item.rows));         */
          return { response: item.row }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const usuariosItem = createAsyncThunk(
  "usuarios/item",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await cajaService._item(pky,'usuarios');        
         /* thunkAPI.dispatch(setData(item.rows));         */
          return { response: item.row }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const usuariosDelete = createAsyncThunk(
  "usuarios/delete",
  async(dato,thunkAPI)=>{    
      try{      
          const item = await cajaService._delete(dato,'usuarios');     
          toastr.warning('usuario', 'Eliminado')                              
          return { response: item }
      }catch(error){                  
          toastr.error('usuario', 'No se puede eliminar')                               
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const estadosData = createAsyncThunk(
  "usuarios/estados",
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
    susuario:{},    
    pTotal:0,
    pSaldo:0,
    pPago:0    
  };  
  const usuarioSlice = createSlice({
    name: "usuario",
    initialState,  
    reducers:{
      resetItem:(state)=>{
        state.item = {}
      },
      setusuario:(state,action)=>{      
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
        .addCase(usuariosData.pending,(state) =>{
            state.loading = true            
        })
        .addCase(usuariosData.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas          
        })
        .addCase(usuariosData.rejected,(state)=>{
          state.loading = false
         
        }) 
        .addCase(usuariosDelete.pending,(state) =>{
          state.loading = true            
      })
      .addCase(usuariosDelete.fulfilled,(state,action)=>{
          state.loading = false
          state.data  = action.payload.response.data    
          state.total = action.payload.response.total          
          state.pagina = action.payload.response.pagina          
          state.paginas = action.payload.response.paginas          
      })
      .addCase(usuariosDelete.rejected,(state)=>{
        state.loading = false
       
      }) 
        .addCase(usuariosCreate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(usuariosCreate.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas             
        })
        .addCase(usuariosCreate.rejected,(state)=>{
          state.loading = false            
        })
        /** update */
        .addCase(usuariosUpdate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(usuariosUpdate.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas   
        })
        .addCase(usuariosUpdate.rejected,(state)=>{
          state.loading = false
          
        })
        .addCase(usuarioItem.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(usuarioItem.fulfilled,(state,action)=>{
            state.loading = false
            state.item    = action.payload.response
        })
        .addCase(usuarioItem.rejected,(state)=>{
          state.loading = false            
        })

        .addCase(usuariosItem.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(usuariosItem.fulfilled,(state,action)=>{
            state.loading = false
            state.item    = action.payload.response
        })
        .addCase(usuariosItem.rejected,(state)=>{
          state.loading = false            
        })
        


        .addCase(usuariosItems.pending,(state) =>{
          state.loading = true            
        })
        .addCase(usuariosItems.fulfilled,(state,action)=>{
          state.loading = false
          state.items  = action.payload.response                      
        })
        .addCase(usuariosItems.rejected,(state)=>{
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
            state.susuario  = action.payload.response.usuario
        })
        .addCase(estadosData.rejected,(state)=>{
          state.loading = false       
        })
      } 
    });
export const { resetItem, resetData, setusuario} = usuarioSlice.actions
const { reducer } = usuarioSlice;
export default reducer; 
