import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {toastr} from 'react-redux-toastr'
import cajaService  from "../services/cajaService"


export const modelosData = createAsyncThunk(
  "modelos/data",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._data(dato,'modelos');                                                    
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const modelosItems = createAsyncThunk(
  "modelos/items",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._itemsList(dato,'modelos');           
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const modelosCreate = createAsyncThunk(
  "modelos/create",
  async(dato,thunkAPI)=>{
      try{      
          const data = await cajaService._create(dato,'modelos');                                      
          toastr.success('modelo', 'Registrado')          
          return { response: data }
      }catch(error){
        const {response} = error        
        toastr.error('modelo', response.data.message)                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const modelosUpdate = createAsyncThunk(
  "modelos/update",
  async(dato,thunkAPI)=>{
      try{      
          const data = await cajaService._update(dato,'modelos');            
          toastr.success('modelo', 'Actualizado')                                     
          return { response: data }
      }catch(error){     
        toastr.error('modelo', 'error de actualizacion')               
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const modeloItem = createAsyncThunk(
  "modelos/eitem",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await cajaService._item(pky,'modelos');           
          return { response: item }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const modelosDelete = createAsyncThunk(
  "modelos/delete",
  async(dato,thunkAPI)=>{    
      try{      
          const item = await cajaService._delete(dato,'modelos');     
          toastr.warning('modelo', 'Eliminado')                              
          return { response: item }
      }catch(error){                  
          toastr.error('modelo', 'No se puede eliminar')                               
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
  const modeloSlice = createSlice({
    name: "modelo",
    initialState,  
    reducers:{
      resetItem:(state)=>{
        state.item = {}
      },
      setmodelo:(state,action)=>{      
        state.item = action.payload
      },
      setModelos:(state,action)=>{      
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
        .addCase(modelosData.pending,(state) =>{
            state.loading = true            
        })
        .addCase(modelosData.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas          
        })
        .addCase(modelosData.rejected,(state)=>{
          state.loading = false
         
        }) 
        .addCase(modelosDelete.pending,(state) =>{
          state.loading = true            
      })
      .addCase(modelosDelete.fulfilled,(state,action)=>{
          state.loading = false
          state.data  = action.payload.response.data    
          state.total = action.payload.response.total          
          state.pagina = action.payload.response.pagina          
          state.paginas = action.payload.response.paginas          
      })
      .addCase(modelosDelete.rejected,(state)=>{
        state.loading = false
       
      }) 
        .addCase(modelosCreate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(modelosCreate.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas           
        })
        .addCase(modelosCreate.rejected,(state)=>{
          state.loading = false            
        })
        /** update */
        .addCase(modelosUpdate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(modelosUpdate.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas  
        })
        .addCase(modelosUpdate.rejected,(state)=>{
          state.loading = false
          
        })
        .addCase(modeloItem.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(modeloItem.fulfilled,(state,action)=>{
            state.loading = false
            state.cstate  = action.payload.response
        })
        .addCase(modeloItem.rejected,(state)=>{
          state.loading = false            
        })

   

        


        .addCase(modelosItems.pending,(state) =>{
          state.loading = true            
        })
        .addCase(modelosItems.fulfilled,(state,action)=>{
          state.loading = false
          state.items  = action.payload.response                      
        })
        .addCase(modelosItems.rejected,(state)=>{
          state.loading = false     
        })
   
      } 
    });
export const { resetItem, resetData, setmodelo,setModelos} = modeloSlice.actions
const { reducer } = modeloSlice;
export default reducer; 
