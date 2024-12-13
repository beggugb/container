import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {toastr} from 'react-redux-toastr'
import cajaService  from "../services/cajaService"


export const marcasData = createAsyncThunk(
  "marcas/data",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._data(dato,'marcas');                                                    
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const marcasItems = createAsyncThunk(
  "marcas/items",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._itemsList(dato,'marcas');           
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const marcasCreate = createAsyncThunk(
  "marcas/create",
  async(dato,thunkAPI)=>{
      try{      
          const data = await cajaService._create(dato,'marcas');      
          toastr.success('marca', 'Registrado')                                                     
          return { response: data }
      }catch(error){
        const {response} = error        
        toastr.error('marca', response.data.message)                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const marcasUpdate = createAsyncThunk(
  "marcas/update",
  async(dato,thunkAPI)=>{
      try{      
          const data = await cajaService._update(dato,'marcas');            
          toastr.success('marca', 'Actualizado')                                     
          return { response: data }
      }catch(error){     
        toastr.error('marca', 'error de actualizacion')               
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const marcaItem = createAsyncThunk(
  "marcas/eitem",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await cajaService._item(pky,'marcas');           
          return { response: item }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const marcasDelete = createAsyncThunk(
  "marcas/delete",
  async(dato,thunkAPI)=>{    
      try{      
          const item = await cajaService._delete(dato,'marcas');     
          toastr.warning('marca', 'Eliminado')                              
          return { response: item }
      }catch(error){                  
          toastr.error('marca', 'No se puede eliminar')                               
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
  const marcaSlice = createSlice({
    name: "marca",
    initialState,  
    reducers:{
      resetItem:(state)=>{
        state.item = {}
      },
      setmarca:(state,action)=>{      
        state.item = action.payload
      },
      setMarcas:(state,action)=>{      
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
        .addCase(marcasData.pending,(state) =>{
            state.loading = true            
        })
        .addCase(marcasData.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas          
        })
        .addCase(marcasData.rejected,(state)=>{
          state.loading = false
         
        }) 
        .addCase(marcasDelete.pending,(state) =>{
          state.loading = true            
      })
      .addCase(marcasDelete.fulfilled,(state,action)=>{
          state.loading = false
          state.data  = action.payload.response.data    
          state.total = action.payload.response.total          
          state.pagina = action.payload.response.pagina          
          state.paginas = action.payload.response.paginas          
      })
      .addCase(marcasDelete.rejected,(state)=>{
        state.loading = false
       
      }) 
        .addCase(marcasCreate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(marcasCreate.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas           
        })
        .addCase(marcasCreate.rejected,(state)=>{
          state.loading = false            
        })
        /** update */
        .addCase(marcasUpdate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(marcasUpdate.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas  
        })
        .addCase(marcasUpdate.rejected,(state)=>{
          state.loading = false
          
        })
        .addCase(marcaItem.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(marcaItem.fulfilled,(state,action)=>{
            state.loading = false
            state.cstate  = action.payload.response
        })
        .addCase(marcaItem.rejected,(state)=>{
          state.loading = false            
        })

   


        


        .addCase(marcasItems.pending,(state) =>{
          state.loading = true            
        })
        .addCase(marcasItems.fulfilled,(state,action)=>{
          state.loading = false
          state.items  = action.payload.response                      
        })
        .addCase(marcasItems.rejected,(state)=>{
          state.loading = false     
        })
   
      } 
    });
export const { resetItem, resetData, setmarca,setMarcas} = marcaSlice.actions
const { reducer } = marcaSlice;
export default reducer; 
