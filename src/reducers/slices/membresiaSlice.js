import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {toastr} from 'react-redux-toastr'
import membresiaService  from "../services/membresiaService"
import { setnota, setplan } from "./notaSlice"


export const membresiasData = createAsyncThunk(
  "membresias/data",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await membresiaService._data(dato,'membresias');                                           
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const membresiasDatas = createAsyncThunk(
  "membresias/datas",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await membresiaService._datas(dato,'membresias');                                           
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const membresiasItems = createAsyncThunk(
  "membresias/items",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await membresiaService._itemsList(dato,'membresias');   
      
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const membresiasCreate = createAsyncThunk(
  "membresias/create",
  async(dato,thunkAPI)=>{
      try{      
          const data = await membresiaService._create(dato,'membresias');                                      
          toastr.success('membresia', 'Dato creado') 
          return { response: data }
      }catch(error){
        const {response} = error        
        toastr.error('membresia', response.data.message)                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)


export const membresiasCreates = createAsyncThunk(
  "membresias/creates",
  async(dato,thunkAPI)=>{
      try{      
          const data = await membresiaService._create(dato,'membresias');                                      
          toastr.success('membresia', 'Dato creado') 
          return { response: data }
      }catch(error){
        const {response} = error        
        toastr.error('membresia', response.data.message)                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const membresiasUpdate = createAsyncThunk(
  "membresias/update",
  async(dato,thunkAPI)=>{
      try{      
          const data = await membresiaService._update(dato,'membresias');  
          toastr.success('membresia', 'Actualizado')                                     
          return { response: null }
      }catch(error){     
        toastr.error('membresia', 'error de actualizacion')               
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const membresiaItem = createAsyncThunk(
  "membresias/eitem",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await membresiaService._item(pky,'membresias');                   
            return { response: item }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const membresiasItem = createAsyncThunk(
  "membresias/item",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await membresiaService._item(pky,'membresias');                
          thunkAPI.dispatch(setnota(item.rows));         
          thunkAPI.dispatch(setplan(item.items));   
          return { response: item.row }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const membresiasDelete = createAsyncThunk(
  "membresias/delete",
  async(dato,thunkAPI)=>{    
      try{      
          const item = await membresiaService._delete(dato,'membresias');     
          toastr.warning('membresia', 'Eliminado')                              
          return { response: item }
      }catch(error){                  
          toastr.error('membresia', 'No se puede eliminar')                               
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const estadosData = createAsyncThunk(
  "membresias/estados",
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
    smembresia:{},    
    pTotal:0,
    pSaldo:0,
    pPago:0    
  };  
  const membresiaSlice = createSlice({
    name: "membresia",
    initialState,  
    reducers:{
      resetItem:(state)=>{
        state.item = {}
      },
      setData:(state,action)=>{      
        state.data = action.payload
      },
      setDatas:(state,action)=>{              
        state.data  = action.payload.data    
        state.total = action.payload.total          
        state.pagina = action.payload.pagina          
        state.paginas = action.payload.paginas  

      },
      setmembresia:(state,action)=>{      
        state.item = action.payload
      },
      resetData:(state)=>{
        state.data    = []
        state.total   = 0
        state.pagina  = 0
        state.paginas = 0
        state.estados  = []
        state.smembresia = {}    
        state.pTotal   = 0
        state.pSaldo   = 0
        state.pPago    = 0
        state.items    = []
        state.item     = {}
      },    
    },
    extraReducers(builder) { 
        builder
        .addCase(membresiasData.pending,(state) =>{
            state.loading = true            
        })
        .addCase(membresiasData.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas          
        })
        .addCase(membresiasData.rejected,(state)=>{
          state.loading = false
         
        }) 

        .addCase(membresiasDatas.pending,(state) =>{
          state.loading = true            
        })
        .addCase(membresiasDatas.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas          
        })
        .addCase(membresiasDatas.rejected,(state)=>{
          state.loading = false
        
        }) 
        .addCase(membresiasCreates.pending,(state) =>{
          state.loading = true            
        })
        .addCase(membresiasCreates.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas          
        })
        .addCase(membresiasCreates.rejected,(state)=>{
          state.loading = false
        
        }) 


        .addCase(membresiasCreate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(membresiasCreate.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas 
        })
        .addCase(membresiasCreate.rejected,(state)=>{
          state.loading = false            
        })
        .addCase(membresiasDelete.pending,(state) =>{
          state.loading = true            
      })
      .addCase(membresiasDelete.fulfilled,(state,action)=>{
          state.loading = false
          state.data  = action.payload.response.data    
          state.total = action.payload.response.total          
          state.pagina = action.payload.response.pagina          
          state.paginas = action.payload.response.paginas          
      })
      .addCase(membresiasDelete.rejected,(state)=>{
        state.loading = false
       
      }) 
     
        /** update */
        .addCase(membresiasUpdate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(membresiasUpdate.fulfilled,(state,action)=>{
            state.loading = false                  
        })
        .addCase(membresiasUpdate.rejected,(state)=>{
          state.loading = false          
        })
        .addCase(membresiaItem.pending,(state) =>{
          state.loading = true            
          state.item    = {}
        })
        .addCase(membresiaItem.fulfilled,(state,action)=>{
            state.loading = false
            state.item    = action.payload.response.row
        })
        .addCase(membresiaItem.rejected,(state)=>{
          state.loading = false            
        })

        .addCase(membresiasItem.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(membresiasItem.fulfilled,(state,action)=>{
            state.loading = false
            state.item    = action.payload.response  
        })
        .addCase(membresiasItem.rejected,(state)=>{
          state.loading = false            
        })
        


        .addCase(membresiasItems.pending,(state) =>{
          state.loading = true            
        })
        .addCase(membresiasItems.fulfilled,(state,action)=>{
          state.loading = false
          state.items  = action.payload.response                      
        })
        .addCase(membresiasItems.rejected,(state)=>{
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
            state.smembresia  = action.payload.response.membresia
        })
        .addCase(estadosData.rejected,(state)=>{
          state.loading = false       
        })
      } 
    });
export const { resetItem, resetData, setmembresia, setData, setDatas} = membresiaSlice.actions
const { reducer } = membresiaSlice;
export default reducer; 
