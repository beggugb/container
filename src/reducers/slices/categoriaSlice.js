import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {toastr} from 'react-redux-toastr'
import cajaService  from "../services/cajaService"


export const categoriasData = createAsyncThunk(
  "categorias/data",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._data(dato,'categorias');                                                    
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const categoriasItems = createAsyncThunk(
  "categorias/items",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._itemsList(dato,'categorias');           
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const categoriasCreate = createAsyncThunk(
  "categorias/create",
  async(dato,thunkAPI)=>{
      try{      
          const data = await cajaService._create(dato,'categorias');  
          toastr.success('marca', 'Registrado')                                                                                                   
          return { response: data }
      }catch(error){
        const {response} = error        
        toastr.error('categoria', response.data.message)                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const categoriasUpdate = createAsyncThunk(
  "categorias/update",
  async(dato,thunkAPI)=>{
      try{      
          const data = await cajaService._update(dato,'categorias');            
          toastr.success('categoria', 'Actualizado')                                     
          return { response: data }
      }catch(error){     
        toastr.error('categoria', 'error de actualizacion')               
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const categoriaItem = createAsyncThunk(
  "categorias/eitem",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await cajaService._item(pky,'categorias');           
          return { response: item }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const categoriasItem = createAsyncThunk(
  "categorias/item",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await cajaService._item(pky,'categorias');        
          /*thunkAPI.dispatch(setItems(item.rows));         */
          return { response: item.row }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const categoriasItemd = createAsyncThunk(
  "categorias/itemd",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await cajaService._item(pky,'categorias');        
          /*thunkAPI.dispatch(setData(item.rows));         */
          return { response: item.row }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const categoriasDelete = createAsyncThunk(
  "categorias/delete",
  async(dato,thunkAPI)=>{    
      try{      
          const item = await cajaService._delete(dato,'categorias');     
          toastr.warning('categoria', 'Eliminado')                              
          return { response: item }
      }catch(error){                  
          toastr.error('categoria', 'No se puede eliminar')                               
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const estadosData = createAsyncThunk(
  "categorias/estados",
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
    scategoria:{},    
    pTotal:0,
    pSaldo:0,
    pPago:0,
    cstate:false,  
       
  };  
  const categoriaSlice = createSlice({
    name: "categoria",
    initialState,  
    reducers:{
      resetItem:(state)=>{
        state.item = {}
      },
      setcategoria:(state,action)=>{      
        state.item = action.payload
      },
      setCategorias:(state,action)=>{      
        state.items = action.payload
      },
          
      resetData:(state)=>{
        state.data    = []
        state.total   = 0
        state.pagina  = 0
        state.paginas = 0
        state.estados  = []
        state.scategoria = {}    
        state.pTotal   = 0
        state.pSaldo   = 0
        state.pPago    = 0
        state.items    = []
        state.item     = {}
      },    
    },
    extraReducers(builder) { 
        builder
        .addCase(categoriasData.pending,(state) =>{
            state.loading = true            
        })
        .addCase(categoriasData.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas          
        })
        .addCase(categoriasData.rejected,(state)=>{
          state.loading = false
         
        }) 
        .addCase(categoriasDelete.pending,(state) =>{
          state.loading = true            
      })
      .addCase(categoriasDelete.fulfilled,(state,action)=>{
          state.loading = false
          state.data  = action.payload.response.data    
          state.total = action.payload.response.total          
          state.pagina = action.payload.response.pagina          
          state.paginas = action.payload.response.paginas          
      })
      .addCase(categoriasDelete.rejected,(state)=>{
        state.loading = false
       
      }) 
        .addCase(categoriasCreate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(categoriasCreate.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas           
        })
        .addCase(categoriasCreate.rejected,(state)=>{
          state.loading = false            
        })
        /** update */
        .addCase(categoriasUpdate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(categoriasUpdate.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas  
        })
        .addCase(categoriasUpdate.rejected,(state)=>{
          state.loading = false
          
        })
        .addCase(categoriaItem.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(categoriaItem.fulfilled,(state,action)=>{
            state.loading = false
            state.cstate  = action.payload.response
        })
        .addCase(categoriaItem.rejected,(state)=>{
          state.loading = false            
        })

        .addCase(categoriasItem.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(categoriasItem.fulfilled,(state,action)=>{
            state.loading = false
            state.item    = action.payload.response
        })
        .addCase(categoriasItem.rejected,(state)=>{
          state.loading = false            
        })


        .addCase(categoriasItemd.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(categoriasItemd.fulfilled,(state,action)=>{
            state.loading = false
            state.item    = action.payload.response
        })
        .addCase(categoriasItemd.rejected,(state)=>{
          state.loading = false            
        })
        


        .addCase(categoriasItems.pending,(state) =>{
          state.loading = true            
        })
        .addCase(categoriasItems.fulfilled,(state,action)=>{
          state.loading = false
          state.items  = action.payload.response                      
        })
        .addCase(categoriasItems.rejected,(state)=>{
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
            state.scategoria  = action.payload.response.categoria
        })
        .addCase(estadosData.rejected,(state)=>{
          state.loading = false       
        })
      } 
    });
export const { resetItem, resetData, setcategoria,setCategorias} = categoriaSlice.actions
const { reducer } = categoriaSlice;
export default reducer; 
