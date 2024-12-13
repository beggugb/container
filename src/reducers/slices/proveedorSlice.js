import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {toastr} from 'react-redux-toastr'
import cajaService  from "../services/cajaService"


export const proveedoresData = createAsyncThunk(
  "proveedores/data",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._data(dato,'proveedores');                                                    
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const proveedoresItems = createAsyncThunk(
  "proveedores/items",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._itemsList(dato,'proveedores');           
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const proveedoresCreate = createAsyncThunk(
  "proveedores/create",
  async(dato,thunkAPI)=>{
      try{      
          const data = await cajaService._create(dato,'proveedores');      
          toastr.success('proveedor', 'Registrado')                                                     
          return { response: data }
      }catch(error){
        const {response} = error        
        toastr.error('proveedor', response.data.message)                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const proveedoresUpdate = createAsyncThunk(
  "proveedores/update",
  async(dato,thunkAPI)=>{
      try{      
          const data = await cajaService._update(dato,'proveedores');            
          toastr.success('proveedor', 'Actualizado')                                     
          return { response: data }
      }catch(error){     
        toastr.error('proveedor', 'error de actualizacion')               
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const proveedorItem = createAsyncThunk(
  "proveedores/eitem",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await cajaService._item(pky,'proveedores');              
          return { response: item }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const proveedoresDelete = createAsyncThunk(
  "proveedores/delete",
  async(dato,thunkAPI)=>{    
      try{      
          const item = await cajaService._delete(dato,'proveedores');     
          toastr.warning('proveedor', 'Eliminado')                              
          return { response: item }
      }catch(error){                  
          toastr.error('proveedor', 'No se puede eliminar')                               
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
       
  };  
  const proveedoreslice = createSlice({
    name: "proveedor",
    initialState,  
    reducers:{
      resetItem:(state)=>{
        state.item = {}
      },
      setproveedor:(state,action)=>{      
        state.item = action.payload
      },
      setProveedores:(state,action)=>{      
        state.items = action.payload
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
        .addCase(proveedoresData.pending,(state) =>{
            state.loading = true            
        })
        .addCase(proveedoresData.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas          
        })
        .addCase(proveedoresData.rejected,(state)=>{
          state.loading = false
         
        }) 
        .addCase(proveedoresDelete.pending,(state) =>{
          state.loading = true            
      })
      .addCase(proveedoresDelete.fulfilled,(state,action)=>{
          state.loading = false
          state.data  = action.payload.response.data    
          state.total = action.payload.response.total          
          state.pagina = action.payload.response.pagina          
          state.paginas = action.payload.response.paginas          
      })
      .addCase(proveedoresDelete.rejected,(state)=>{
        state.loading = false
       
      }) 
        .addCase(proveedoresCreate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(proveedoresCreate.fulfilled,(state,action)=>{
            state.loading = false
            state.item  = action.payload.response         
        })
        .addCase(proveedoresCreate.rejected,(state)=>{
          state.loading = false            
        })
        /** update */
        .addCase(proveedoresUpdate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(proveedoresUpdate.fulfilled,(state,action)=>{
            state.loading = false
            state.item  = action.payload.response           
        })
        .addCase(proveedoresUpdate.rejected,(state)=>{
          state.loading = false
          
        })
        .addCase(proveedorItem.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(proveedorItem.fulfilled,(state,action)=>{
            state.loading = false
            state.item    = action.payload.response
        })
        .addCase(proveedorItem.rejected,(state)=>{
          state.loading = false            
        })

   


        


        .addCase(proveedoresItems.pending,(state) =>{
          state.loading = true            
        })
        .addCase(proveedoresItems.fulfilled,(state,action)=>{
          state.loading = false
          state.items  = action.payload.response                      
        })
        .addCase(proveedoresItems.rejected,(state)=>{
          state.loading = false     
        })
   
      } 
    });
export const { resetItem, resetData, setproveedor,setProveedores} = proveedoreslice.actions
const { reducer } = proveedoreslice;
export default reducer; 
