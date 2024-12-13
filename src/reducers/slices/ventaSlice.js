import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {toastr} from 'react-redux-toastr'
import cajaService  from "../services/cajaService"


export const ventasData = createAsyncThunk(
  "ventas/data",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._data(dato,'ventas');                                                    
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const ventasItems = createAsyncThunk(
  "ventas/items",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._itemsList(dato,'ventas');   
      
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const ventasCreate = createAsyncThunk(
  "ventas/create",
  async(dato,thunkAPI)=>{
      try{      
          const data = await cajaService._create(dato,'tpv');                                                        
          return { response: data }
      }catch(error){
        const {response} = error        
        toastr.error('venta', response.data.message)                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const ventasUpdate = createAsyncThunk(
  "ventas/update",
  async(dato,thunkAPI)=>{
      try{      
          const data = await cajaService._update(dato,'ventas');            
          toastr.success('venta', 'Actualizado')                                     
          return { response: data }
      }catch(error){     
        toastr.error('venta', 'error de actualizacion')               
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const ventaItem = createAsyncThunk(
  "ventas/eitem",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await cajaService._item(pky,'ventas');           
          return { response: item }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const ventasItem = createAsyncThunk(
  "ventas/item",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await cajaService._item(pky,'ventas');        
          /*thunkAPI.dispatch(setItems(item.rows));         */
          return { response: item.row }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const ventasItemd = createAsyncThunk(
  "ventas/itemd",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await cajaService._item(pky,'ventas');        
          /*thunkAPI.dispatch(setData(item.rows));         */
          return { response: item.row }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const ventasDelete = createAsyncThunk(
  "ventas/delete",
  async(dato,thunkAPI)=>{    
      try{      
          const item = await cajaService._delete(dato,'ventas');     
          toastr.warning('venta', 'Eliminado')                              
          return { response: item }
      }catch(error){                  
          toastr.error('venta', 'No se puede eliminar')                               
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const estadosData = createAsyncThunk(
  "ventas/estados",
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
    vitems:[],    
    total:0,
    pagina:0,
    paginas:0,
    estados:[],
    sventa:{},    
    pTotal:0,
    pSaldo:0,
    pPago:0,
    cstate:false, 
    categoryId:0,
    item:{    
        cantidad:0,    
        impuesto:0,
        vImpuesto:0.13,
        nroItems:0,
        subTotal:0,
        subImpuestos:0,
        descuento:0,
        totalGeneral:0,    
        clienteId:1,
        clients:"",
        nits:"",
      }, 
        
  };  
  const ventaSlice = createSlice({
    name: "venta",
    initialState,  
    reducers:{
      resetItem:(state)=>{
        state.item = {}
      },
      setventa:(state,action)=>{      
        state.item = action.payload
      },
      setItems:(state,action)=>{
        state.vitems = action.payload
      },            
      setItem:(state,action)=>{
        state.item = action.payload
      },
      setCate:(state,action)=>{
        state.categoryId = action.payload
      },
      
      resetItem:(state)=>{
        state.item ={
          cantidad:0,    
          impuesto:0,
          vImpuesto:0.13,
          nroItems:0,
          subTotal:0,
          subImpuestos:0,
          descuento:0,
          totalGeneral:0,    
          clienteId:1,
          ncliente:"",
          nit:"",       
        }
        state.vitems  = []        
        
      },
      resetData:(state)=>{
        state.data    = []
        state.total   = 0
        state.pagina  = 0
        state.paginas = 0
        state.estados  = []
        state.sventa = {}    
        state.pTotal   = 0
        state.pSaldo   = 0
        state.pPago    = 0
        state.items    = []
        state.item     = {}
      },    
    },
    extraReducers(builder) { 
        builder
        .addCase(ventasData.pending,(state) =>{
            state.loading = true            
        })
        .addCase(ventasData.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas          
        })
        .addCase(ventasData.rejected,(state)=>{
          state.loading = false
         
        }) 
        .addCase(ventasDelete.pending,(state) =>{
          state.loading = true            
      })
      .addCase(ventasDelete.fulfilled,(state,action)=>{
          state.loading = false
          state.data  = action.payload.response.data    
          state.total = action.payload.response.total          
          state.pagina = action.payload.response.pagina          
          state.paginas = action.payload.response.paginas          
      })
      .addCase(ventasDelete.rejected,(state)=>{
        state.loading = false
       
      }) 
        .addCase(ventasCreate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(ventasCreate.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas           
        })
        .addCase(ventasCreate.rejected,(state)=>{
          state.loading = false            
        })
        /** update */
        .addCase(ventasUpdate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(ventasUpdate.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas  
        })
        .addCase(ventasUpdate.rejected,(state)=>{
          state.loading = false
          
        })
        .addCase(ventaItem.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(ventaItem.fulfilled,(state,action)=>{
            state.loading = false
            state.cstate  = action.payload.response
        })
        .addCase(ventaItem.rejected,(state)=>{
          state.loading = false            
        })

        .addCase(ventasItem.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(ventasItem.fulfilled,(state,action)=>{
            state.loading = false
            state.item    = action.payload.response
        })
        .addCase(ventasItem.rejected,(state)=>{
          state.loading = false            
        })


        .addCase(ventasItemd.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(ventasItemd.fulfilled,(state,action)=>{
            state.loading = false
            state.item    = action.payload.response
        })
        .addCase(ventasItemd.rejected,(state)=>{
          state.loading = false            
        })
        


        .addCase(ventasItems.pending,(state) =>{
          state.loading = true            
        })
        .addCase(ventasItems.fulfilled,(state,action)=>{
          state.loading = false
          state.items  = action.payload.response                      
        })
        .addCase(ventasItems.rejected,(state)=>{
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
            state.sventa  = action.payload.response.venta
        })
        .addCase(estadosData.rejected,(state)=>{
          state.loading = false       
        })
      } 
    });
export const { resetItem, resetData, setventa, setItem, setItems, setCate} = ventaSlice.actions
const { reducer } = ventaSlice;
export default reducer; 
