import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {toastr} from 'react-redux-toastr'
import cajaService  from "../services/cajaService"


export const industriasData = createAsyncThunk(
  "industrias/data",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._data(dato,'industrias');                                                    
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const industriasItems = createAsyncThunk(
  "industrias/items",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._itemsList(dato,'industrias');           
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const industriasCreate = createAsyncThunk(
  "industrias/create",
  async(dato,thunkAPI)=>{
      try{      
          const data = await cajaService._create(dato,'industrias');                                      
          toastr.success('industria', 'Registrado')            
          return { response: data }
      }catch(error){
        const {response} = error        
        toastr.error('industria', response.data.message)                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const industriasUpdate = createAsyncThunk(
  "industrias/update",
  async(dato,thunkAPI)=>{
      try{      
          const data = await cajaService._update(dato,'industrias');            
          toastr.success('industria', 'Actualizado')                                     
          return { response: data }
      }catch(error){     
        toastr.error('industria', 'error de actualizacion')               
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const industriaItem = createAsyncThunk(
  "industrias/eitem",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await cajaService._item(pky,'industrias');           
          return { response: item }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const industriasDelete = createAsyncThunk(
  "industrias/delete",
  async(dato,thunkAPI)=>{    
      try{      
          const item = await cajaService._delete(dato,'industrias');     
          toastr.warning('industria', 'Eliminado')                              
          return { response: item }
      }catch(error){                  
          toastr.error('industria', 'No se puede eliminar')                               
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
  const industriaslice = createSlice({
    name: "industria",
    initialState,  
    reducers:{
      resetItem:(state)=>{
        state.item = {}
      },
      setindustria:(state,action)=>{      
        state.item = action.payload
      },
      setIndustrias:(state,action)=>{      
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
        .addCase(industriasData.pending,(state) =>{
            state.loading = true            
        })
        .addCase(industriasData.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas          
        })
        .addCase(industriasData.rejected,(state)=>{
          state.loading = false
         
        }) 
        .addCase(industriasDelete.pending,(state) =>{
          state.loading = true            
      })
      .addCase(industriasDelete.fulfilled,(state,action)=>{
          state.loading = false
          state.data  = action.payload.response.data    
          state.total = action.payload.response.total          
          state.pagina = action.payload.response.pagina          
          state.paginas = action.payload.response.paginas          
      })
      .addCase(industriasDelete.rejected,(state)=>{
        state.loading = false
       
      }) 
        .addCase(industriasCreate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(industriasCreate.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas           
        })
        .addCase(industriasCreate.rejected,(state)=>{
          state.loading = false            
        })
        /** update */
        .addCase(industriasUpdate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(industriasUpdate.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas  
        })
        .addCase(industriasUpdate.rejected,(state)=>{
          state.loading = false
          
        })
        .addCase(industriaItem.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(industriaItem.fulfilled,(state,action)=>{
            state.loading = false
            state.cstate  = action.payload.response
        })
        .addCase(industriaItem.rejected,(state)=>{
          state.loading = false            
        })

      

        


        .addCase(industriasItems.pending,(state) =>{
          state.loading = true            
        })
        .addCase(industriasItems.fulfilled,(state,action)=>{
          state.loading = false
          state.items  = action.payload.response                      
        })
        .addCase(industriasItems.rejected,(state)=>{
          state.loading = false     
        })
   
      } 
    });
export const { resetItem, resetData, setindustria,setIndustrias} = industriaslice.actions
const { reducer } = industriaslice;
export default reducer; 
