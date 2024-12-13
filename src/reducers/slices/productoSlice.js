import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {toastr} from 'react-redux-toastr'
import cajaService  from "../services/cajaService"
import { setCategorias } from "./categoriaSlice"
import { setMarcas }  from "./marcaSlice"
import { setModelos }  from "./modeloSlice"
import { setUnidades }  from "./unidadSlice"
import { setVolumenes }  from "./volumenSlice"
import { setOrigenes }  from "./origenSlice"
import { setIndustrias }  from "./industriaSlice"
import { setTipos }  from "./tipoSlice"

export const productosData = createAsyncThunk(
  "productos/data",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._data(dato,'productos');                                                    
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const dependencias = createAsyncThunk(
  "productos/dependencias",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._deps(dato,'productos');              
        thunkAPI.dispatch(setCategorias(data.icategoria));                                  
        thunkAPI.dispatch(setIndustrias(data.iindustria));    
        thunkAPI.dispatch(setMarcas(data.imarca));    
        thunkAPI.dispatch(setModelos(data.imodelo));    
        thunkAPI.dispatch(setOrigenes(data.iorigen));    
        thunkAPI.dispatch(setTipos(data.itipo));    
        thunkAPI.dispatch(setUnidades(data.iunidad));    
        thunkAPI.dispatch(setVolumenes(data.ivolumen));    
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const productosStocki = createAsyncThunk(
  "productos/stocki",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._data(dato,'stock');                                                    
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const productosStocks = createAsyncThunk(
  "productos/stocks",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._items(dato,'stock');                                                    
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)


export const productosItems = createAsyncThunk(
  "productos/items",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._itemsList(dato,'productos');   
      
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const stockCategoria = createAsyncThunk(
  "productos/stock",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._itemsList(dato,'stock');   
      
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const productosCreate = createAsyncThunk(
  "productos/create",
  async(dato,thunkAPI)=>{
      try{      
          const data = await cajaService._create(dato,'productos');                                                    
          toastr.success('producto', "producto registrado") 
          return { response: data }
          
      }catch(error){
        const {response} = error        
        toastr.error('producto', "el código ya esta registrado")                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const productosUpdate = createAsyncThunk(
  "productos/update",
  async(dato,thunkAPI)=>{
      try{      
          const data = await cajaService._update(dato,'productos');            
          toastr.success('producto', 'Actualizado')                                     
          return { response: data }
      }catch(error){     
        toastr.error('producto', 'error de actualizacion')               
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const productoItem = createAsyncThunk(
  "productos/eitem",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await cajaService._item(pky,'productos');           
          return { response: item }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const productosItem = createAsyncThunk(
  "productos/item",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await cajaService._item(pky,'productos');        
          /*thunkAPI.dispatch(setItems(item.rows));         */
          return { response: item.row }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const productosItemd = createAsyncThunk(
  "productos/itemd",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await cajaService._item(pky,'productos');        
         /* thunkAPI.dispatch(setData(item.rows));         */
          return { response: item.row }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const productosDelete = createAsyncThunk(
  "productos/delete",
  async(dato,thunkAPI)=>{    
      try{      
          const item = await cajaService._delete(dato,'productos');     
          toastr.warning('producto', 'Eliminado')                              
          return { response: item }
      }catch(error){                  
          toastr.error('producto', 'No se puede eliminar')                               
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const estadosData = createAsyncThunk(
  "productos/estados",
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
    sproducto:{},    
    pTotal:0,
    pSaldo:0,
    pPago:0,
    cstate:false,     
  };  
  const productoSlice = createSlice({
    name: "producto",
    initialState,  
    reducers:{
      resetItem:(state)=>{
        state.item = {}
      },
      setproducto:(state,action)=>{      
        state.item = action.payload
      },
      setLista:(state,action)=>{
        state.items =action.payload
      },
      resetData:(state)=>{
        state.data    = []
        state.total   = 0
        state.pagina  = 0
        state.paginas = 0
        state.estados  = []        
        state.items    = []
        state.item     = {}
      },    
    },
    extraReducers(builder) { 
        builder
        .addCase(productosData.pending,(state) =>{
            state.loading = true            
        })
        .addCase(productosData.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas          
        })
        .addCase(productosData.rejected,(state)=>{
          state.loading = false
         
        }) 
        .addCase(productosDelete.pending,(state) =>{
          state.loading = true            
      })
      .addCase(productosDelete.fulfilled,(state,action)=>{
          state.loading = false
          state.data  = action.payload.response.data    
          state.total = action.payload.response.total          
          state.pagina = action.payload.response.pagina          
          state.paginas = action.payload.response.paginas   
      })
      .addCase(productosDelete.rejected,(state)=>{
        state.loading = false
       
      }) 
        .addCase(productosCreate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(productosCreate.fulfilled,(state,action)=>{
            state.loading = false
            state.item    = action.payload.response        
        })
        .addCase(productosCreate.rejected,(state)=>{
          state.loading = false            
        })
        /** update */
        .addCase(productosUpdate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(productosUpdate.fulfilled,(state,action)=>{
            state.loading = false
            state.item    = action.payload.response
        })
        .addCase(productosUpdate.rejected,(state)=>{
          state.loading = false
          
        })
        .addCase(productoItem.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(productoItem.fulfilled,(state,action)=>{
            state.loading = false
            state.item  = action.payload.response
        })
        .addCase(productoItem.rejected,(state)=>{
          state.loading = false            
        })

        .addCase(productosItem.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(productosItem.fulfilled,(state,action)=>{
            state.loading = false
            state.item    = action.payload.response
        })
        .addCase(productosItem.rejected,(state)=>{
          state.loading = false            
        })


        .addCase(productosItemd.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(productosItemd.fulfilled,(state,action)=>{
            state.loading = false
            state.item    = action.payload.response
        })
        .addCase(productosItemd.rejected,(state)=>{
          state.loading = false            
        })
        
        .addCase(stockCategoria.pending,(state) =>{
          state.loading = true            
        })
        .addCase(stockCategoria.fulfilled,(state,action)=>{
          state.loading = false
          state.items  = action.payload.response                      
        })
        .addCase(stockCategoria.rejected,(state)=>{
          state.loading = false     
        })

        .addCase(productosItems.pending,(state) =>{
          state.loading = true            
        })
        .addCase(productosItems.fulfilled,(state,action)=>{
          state.loading = false
          state.items  = action.payload.response                      
        })
        .addCase(productosItems.rejected,(state)=>{
          state.loading = false     
        })

        .addCase(productosStocks.pending,(state) =>{
          state.loading = true            
        })
        .addCase(productosStocks.fulfilled,(state,action)=>{
          state.loading = false
          state.items  = action.payload.response                      
        })
        .addCase(productosStocks.rejected,(state)=>{
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
            state.sproducto  = action.payload.response.producto
        })
        .addCase(estadosData.rejected,(state)=>{
          state.loading = false       
        })
        
        .addCase(productosStocki.pending,(state) =>{
          state.loading = true            
        })
        .addCase(productosStocki.fulfilled,(state,action)=>{
            state.loading   = false
            state.items   = action.payload.response                      
        })
        .addCase(productosStocki.rejected,(state)=>{
          state.loading = false       
        })
      } 
    });
export const { resetItem, resetData, setproducto, setLista} = productoSlice.actions
const { reducer } = productoSlice;
export default reducer; 
