import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {toastr} from 'react-redux-toastr'
import membresiaService  from "../services/membresiaService"
import { setnota, setplan, setitem } from "./notaSlice"


export const comprasData = createAsyncThunk(
  "compras/data",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await membresiaService._data(dato,'compras');                                           
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const comprasDatas = createAsyncThunk(
  "compras/datas",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await membresiaService._datas(dato,'compras');                                           
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const comprasItems = createAsyncThunk(
  "compras/items",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await membresiaService._itemsList(dato,'compras');   
      
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const comprasCreate = createAsyncThunk(
  "compras/create",
  async(dato,thunkAPI)=>{
      try{      
          const data = await membresiaService._create(dato,'compras');                                      
          toastr.success('compra', 'Dato creado') 
          return { response: data }
      }catch(error){
        const {response} = error        
        toastr.error('compra', response.data.message)                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)


export const comprasCreates = createAsyncThunk(
  "compras/creates",
  async(dato,thunkAPI)=>{
      try{      
          const data = await membresiaService._create(dato,'compras');                                      
          toastr.success('compra', 'Dato creado') 
          return { response: data }
      }catch(error){
        const {response} = error        
        toastr.error('compra', response.data.message)                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const comprasUpdate = createAsyncThunk(
  "compras/update",
  async(dato,thunkAPI)=>{
      try{      
          const data = await membresiaService._update(dato,'compras');  
          toastr.success('compra', 'Actualizado')                                     
          return { response: data }
      }catch(error){     
        toastr.error('compra', 'error de actualizacion')               
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const comprasUpdates = createAsyncThunk(
  "compras/updates",
  async(dato,thunkAPI)=>{
      try{      
          const data = await membresiaService._updates(dato,'compras');  
          toastr.success('compra', 'Actualizado')                                     
          return { response: data }
      }catch(error){     
        toastr.error('compra', 'error de actualizacion')               
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const compraItem = createAsyncThunk(
  "compras/eitem",
  async(pky,thunkAPI)=>{   
      try{              
          const item = await membresiaService._item(pky,'compras');                   
            return { response: item }
      }catch(error){                  
        
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const comprasItem = createAsyncThunk(
  "compras/item",
  async(pky,thunkAPI)=>{    
      try{                
          const data = await membresiaService._item(pky,'compras');               
          return { response: data }                    
      }catch(error){                     
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const comprasList = createAsyncThunk(
  "compras/list",
  async(pky,thunkAPI)=>{    
      try{                
          const data = await membresiaService._item(pky,'compras');  
          const {item,items,nota,plan} = data
          thunkAPI.dispatch(setitem(nota));  
          thunkAPI.dispatch(setplan(plan));  
          return { response: {item:item,items:items} }                    
      }catch(error){                     
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const comprasDelete = createAsyncThunk(
  "compras/delete",
  async(dato,thunkAPI)=>{    
      try{      
          const item = await membresiaService._delete(dato,'compras');     
          toastr.warning('compra', 'Eliminado')                              
          return { response: item }
      }catch(error){                  
          toastr.error('compra', 'No se puede eliminar')                               
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const estadosData = createAsyncThunk(
  "compras/estados",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await membresiaService._informes(dato,'estados');       
                
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
    scompra:{},    
    pTotal:0,
    pSaldo:0,
    pPago:0    
  };  
  const compraSlice = createSlice({
    name: "compra",
    initialState,  
    reducers:{
      resetItem:(state)=>{
        state.item = {}
      },
      setData:(state,action)=>{      
        state.data = action.payload
      },
      setitems:(state,action)=>{      
        state.items = action.payload
      },
      setDatas:(state,action)=>{              
        state.data  = action.payload.data    
        state.total = action.payload.total          
        state.pagina = action.payload.pagina          
        state.paginas = action.payload.paginas  

      },
      setcompra:(state,action)=>{      
        state.item = action.payload
      },
      resetData:(state)=>{
        state.data    = []
        state.total   = 0
        state.pagina  = 0
        state.paginas = 0
        state.estados  = []
        state.scompra = {}    
        state.pTotal   = 0
        state.pSaldo   = 0
        state.pPago    = 0
        state.items    = []
        state.item     = {}
      },    
    },
    extraReducers(builder) { 
        builder
        .addCase(comprasData.pending,(state) =>{
            state.loading = true            
        })
        .addCase(comprasData.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas          
        })
        .addCase(comprasData.rejected,(state)=>{
          state.loading = false
         
        }) 

        .addCase(comprasDatas.pending,(state) =>{
          state.loading = true            
        })
        .addCase(comprasDatas.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas          
        })
        .addCase(comprasDatas.rejected,(state)=>{
          state.loading = false
        
        }) 
        .addCase(comprasCreates.pending,(state) =>{
          state.loading = true            
        })
        .addCase(comprasCreates.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas          
        })
        .addCase(comprasCreates.rejected,(state)=>{
          state.loading = false
        
        }) 


        .addCase(comprasCreate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(comprasCreate.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas 
        })
        .addCase(comprasCreate.rejected,(state)=>{
          state.loading = false            
        })
        .addCase(comprasDelete.pending,(state) =>{
          state.loading = true            
      })
      .addCase(comprasDelete.fulfilled,(state,action)=>{
          state.loading = false
          state.data  = action.payload.response.data    
          state.total = action.payload.response.total          
          state.pagina = action.payload.response.pagina          
          state.paginas = action.payload.response.paginas          
      })
      .addCase(comprasDelete.rejected,(state)=>{
        state.loading = false
       
      }) 
     
        /** update */
        .addCase(comprasUpdate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(comprasUpdate.fulfilled,(state,action)=>{
            state.loading = false                  
            state.item    = action.payload.response.item
            state.items   = action.payload.response.items
        })
        .addCase(comprasUpdate.rejected,(state)=>{
          state.loading = false          
        })
        .addCase(comprasUpdates.fulfilled,(state,action)=>{
          state.loading = false
          state.data  = action.payload.response.data    
          state.total = action.payload.response.total          
          state.pagina = action.payload.response.pagina          
          state.paginas = action.payload.response.paginas          
      })
      .addCase(comprasUpdates.rejected,(state)=>{
        state.loading = false
       
      }) 

      .addCase(comprasUpdates.pending,(state) =>{
        state.loading = true            
      })

        .addCase(compraItem.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(compraItem.fulfilled,(state,action)=>{
            state.loading = false
            state.item    = action.payload.response.row
        })
        .addCase(compraItem.rejected,(state)=>{
          state.loading = false            
        })

        .addCase(comprasItem.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(comprasItem.fulfilled,(state,action)=>{
            state.loading = false
            state.item    = action.payload.response.item
            state.items   = action.payload.response.items  
        })
        .addCase(comprasItem.rejected,(state)=>{
          state.loading = false            
        })

        .addCase(comprasList.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(comprasList.fulfilled,(state,action)=>{
            state.loading = false
            state.item    = action.payload.response.item
            state.items   = action.payload.response.items  
        })
        .addCase(comprasList.rejected,(state)=>{
          state.loading = false            
        })
        


        .addCase(comprasItems.pending,(state) =>{
          state.loading = true            
        })
        .addCase(comprasItems.fulfilled,(state,action)=>{
          state.loading = false
          state.items  = action.payload.response                      
        })
        .addCase(comprasItems.rejected,(state)=>{
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
            state.scompra  = action.payload.response.compra
        })
        .addCase(estadosData.rejected,(state)=>{
          state.loading = false       
        })
      } 
    });
export const { resetItem, resetData, setcompra, setData, setDatas,setitems} = compraSlice.actions
const { reducer } = compraSlice;
export default reducer; 
