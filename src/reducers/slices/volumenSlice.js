import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {toastr} from 'react-redux-toastr'
import cajaService  from "../services/cajaService"


export const volumenesData = createAsyncThunk(
  "volumenes/data",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._data(dato,'volumenes');                                                    
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const volumenesItems = createAsyncThunk(
  "volumenes/items",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._itemsList(dato,'volumenes');           
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const volumenesCreate = createAsyncThunk(
  "volumenes/create",
  async(dato,thunkAPI)=>{
      try{      
          const data = await cajaService._create(dato,'volumenes');     
          toastr.error('volumen', 'Registrado')                                               
          return { response: data }
      }catch(error){
        const {response} = error        
        toastr.error('volumen', response.data.message)                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const volumenesUpdate = createAsyncThunk(
  "volumenes/update",
  async(dato,thunkAPI)=>{
      try{      
          const data = await cajaService._update(dato,'volumenes');            
          toastr.success('volumen', 'Actualizado')                                     
          return { response: data }
      }catch(error){     
        toastr.error('volumen', 'error de actualizacion')               
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const volumenItem = createAsyncThunk(
  "volumenes/eitem",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await cajaService._item(pky,'volumenes');           
          return { response: item }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const volumenesDelete = createAsyncThunk(
  "volumenes/delete",
  async(dato,thunkAPI)=>{    
      try{      
          const item = await cajaService._delete(dato,'volumenes');     
          toastr.warning('volumen', 'Eliminado')                              
          return { response: item }
      }catch(error){                  
          toastr.error('volumen', 'No se puede eliminar')                               
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
  const volumeneslice = createSlice({
    name: "volumen",
    initialState,  
    reducers:{
      resetItem:(state)=>{
        state.item = {}
      },
      setvolumen:(state,action)=>{      
        state.item = action.payload
      },
      setVolumenes:(state,action)=>{      
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
        .addCase(volumenesData.pending,(state) =>{
            state.loading = true            
        })
        .addCase(volumenesData.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas          
        })
        .addCase(volumenesData.rejected,(state)=>{
          state.loading = false
         
        }) 
        .addCase(volumenesDelete.pending,(state) =>{
          state.loading = true            
      })
      .addCase(volumenesDelete.fulfilled,(state,action)=>{
          state.loading = false
          state.data  = action.payload.response.data    
          state.total = action.payload.response.total          
          state.pagina = action.payload.response.pagina          
          state.paginas = action.payload.response.paginas          
      })
      .addCase(volumenesDelete.rejected,(state)=>{
        state.loading = false
       
      }) 
        .addCase(volumenesCreate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(volumenesCreate.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas           
        })
        .addCase(volumenesCreate.rejected,(state)=>{
          state.loading = false            
        })
        /** update */
        .addCase(volumenesUpdate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(volumenesUpdate.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas  
        })
        .addCase(volumenesUpdate.rejected,(state)=>{
          state.loading = false
          
        })
        .addCase(volumenItem.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(volumenItem.fulfilled,(state,action)=>{
            state.loading = false
            state.cstate  = action.payload.response
        })
        .addCase(volumenItem.rejected,(state)=>{
          state.loading = false            
        })


        


        .addCase(volumenesItems.pending,(state) =>{
          state.loading = true            
        })
        .addCase(volumenesItems.fulfilled,(state,action)=>{
          state.loading = false
          state.items  = action.payload.response                      
        })
        .addCase(volumenesItems.rejected,(state)=>{
          state.loading = false     
        })
   
      } 
    });
export const { resetItem, resetData, setvolumen,setVolumenes} = volumeneslice.actions
const { reducer } = volumeneslice;
export default reducer; 
