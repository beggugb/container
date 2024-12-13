import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {toastr} from 'react-redux-toastr'
import cajaService  from "../services/cajaService"


export const informesClientes = createAsyncThunk(
  "informes/clientes",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await cajaService._informes(dato,'clientes');                                                     
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const informesMembresias = createAsyncThunk(
    "informes/membresias",
    async(dato,thunkAPI)=>{
        try{                    
          const data = await cajaService._informes(dato,'membresias');                                                     
          return { response: data }
        }catch(error){                  
            return thunkAPI.rejectWithValue();           
        }   
    }
  )

  export const informesCajas = createAsyncThunk(
    "informes/cajas",
    async(dato,thunkAPI)=>{
        try{                    
          const data = await cajaService._informes(dato,'cajas');                                                     
          return { response: data }
        }catch(error){                  
            return thunkAPI.rejectWithValue();           
        }   
    }
  )

  export const informesConsolidado = createAsyncThunk(
    "informes/consolidado",
    async(dato,thunkAPI)=>{
        try{                    
          const data = await cajaService._informes(dato,'consolidado');                                                         
          return { response: data }
        }catch(error){                  
            return thunkAPI.rejectWithValue();           
        }   
    }
  )


  export const informesAsistencia = createAsyncThunk(
    "informes/asistencia",
    async(dato,thunkAPI)=>{
        try{                    
          const data = await cajaService._informes(dato,'registro');                                                          
          return { response: data }
        }catch(error){                  
            return thunkAPI.rejectWithValue();           
        }   
    }
  )

  export const informesVentas = createAsyncThunk(
    "informes/ventas",
    async(dato,thunkAPI)=>{
        try{                    
          const data = await cajaService._informes(dato,'ventas');                                                
          return { response: data }
        }catch(error){                  
            return thunkAPI.rejectWithValue();           
        }   
    }
  )

  export const informesExistencias = createAsyncThunk(
    "informes/existencias",
    async(dato,thunkAPI)=>{
        try{                    
          const data = await cajaService._informes(dato,'existencias');                  
          return { response: data }
        }catch(error){                  
            return thunkAPI.rejectWithValue();           
        }   
    }
  )


  export const informesCompras = createAsyncThunk(
    "informes/compras",
    async(dato,thunkAPI)=>{
        try{                    
          const data = await cajaService._informes(dato,'compras');                
          return { response: data }
        }catch(error){                  
            return thunkAPI.rejectWithValue();           
        }   
    }
  )


  export const informesComparativo = createAsyncThunk(
    "informes/comparativo",
    async(dato,thunkAPI)=>{
        try{                    
          const data = await cajaService._informes(dato,'comparativo');                                                             
          return { response: data }
        }catch(error){                  
            return thunkAPI.rejectWithValue();           
        }   
    }
  )








const initialState = { 
    loading:false,
    clientes: [],    
    cajas: [],    
    membresias: [],
    consolidado: [],  
    registros:[],  
    ventas:[], 
    compras:[],
    comparativo:[],
    existencias:[],
    data: [],    
    pagina: 0,
    paginas: 0,
    total: 0,
    desde:'2024-01-01',
    hasta:'2024-12-01',
    detalle:0,
    categoriaId:0,
    productoId:0,
    usuarioId:0,
    tipo:"%",
    usuario:""  
  };  
  const informeSlice = createSlice({
    name: "informe",
    initialState,  
    reducers:{
      resetInforme:(state)=>{
        state.clientes = []    
        state.cajas    = []    
        state.membresias = []
        state.consolidado = []  
        state.registros=[]  
        state.ventas=[] 
        state.compras=[]
        state.comparativo=[]
        state.existencias=[]
        state.data= []    
        state.pagina= 0
        state.paginas= 0
        state.total= 0
        state.desde='2024-01-01'
        state.hasta='2024-12-01'
        state.detalle=0
        state.categoriaId=0
        state.productoId=0
        state.usuarioId=0
        state.tipo="%"
        state.usuario="" 
      },
   
      setinforme:(state,action)=>{      
        state.item = action.payload
      },
      
    },
    extraReducers(builder) { 
        builder
        .addCase(informesClientes.pending,(state) =>{
            state.loading = true            
        })
        .addCase(informesClientes.fulfilled,(state,action)=>{
            state.loading = false
            state.clientes  = action.payload.response.data.data    
            state.detalle   = action.payload.response.detalle            
        })
        .addCase(informesClientes.rejected,(state)=>{
          state.loading = false
         
        }) 
        .addCase(informesMembresias.pending,(state) =>{
            state.loading = true            
        })
        .addCase(informesMembresias.fulfilled,(state,action)=>{
            state.loading = false
            state.membresias  = action.payload.response.data.data    
            state.detalle   = action.payload.response.detalle            
        })
        .addCase(informesMembresias.rejected,(state)=>{
          state.loading = false
         
        }) 
        .addCase(informesCajas.pending,(state) =>{
            state.loading = true            
        })
        .addCase(informesCajas.fulfilled,(state,action)=>{
            state.loading = false
            state.cajas  = action.payload.response.data.data    
            state.detalle   = action.payload.response.detalle            
        })
        .addCase(informesCajas.rejected,(state)=>{
          state.loading = false
         
        }) 
        .addCase(informesConsolidado.pending,(state) =>{
            state.loading = true            
        })
        .addCase(informesConsolidado.fulfilled,(state,action)=>{
            state.loading = false
            state.consolidado  = action.payload.response.data    
            state.detalle   = action.payload.response.detalle            
        })
        .addCase(informesConsolidado.rejected,(state)=>{
          state.loading = false
         
        }) 
        .addCase(informesAsistencia.pending,(state) =>{
            state.loading = true            
        })
        .addCase(informesAsistencia.fulfilled,(state,action)=>{
            state.loading = false
            state.registros  = action.payload.response.data    
            state.detalle   = action.payload.response.detalle            
        })
        .addCase(informesAsistencia.rejected,(state)=>{
          state.loading = false
         
        }) 
        .addCase(informesVentas.pending,(state) =>{
            state.loading = true            
        })
        .addCase(informesVentas.fulfilled,(state,action)=>{
            state.loading = false
            state.ventas  = action.payload.response.data    
            state.detalle   = action.payload.response.detalle            
        })
        .addCase(informesVentas.rejected,(state)=>{
          state.loading = false
         
        }) 

        .addCase(informesExistencias.pending,(state) =>{
          state.loading = true            
      })
      .addCase(informesExistencias.fulfilled,(state,action)=>{
          state.loading = false
          state.existencias  = action.payload.response.data    
          state.detalle   = action.payload.response.suma
          state.total     = action.payload.response.total
      })
      .addCase(informesExistencias.rejected,(state)=>{
        state.loading = false
       
      }) 

      .addCase(informesCompras.pending,(state) =>{
        state.loading = true            
    })
    .addCase(informesCompras.fulfilled,(state,action)=>{
        state.loading = false
        state.compras  = action.payload.response.data    
        state.detalle   = action.payload.response.detalle
    })
    .addCase(informesCompras.rejected,(state)=>{
      state.loading = false
     
    }) 
    .addCase(informesComparativo.pending,(state) =>{
      state.loading = true            
  })
  .addCase(informesComparativo.fulfilled,(state,action)=>{
      state.loading = false
      state.comparativo  = action.payload.response.data    
      state.detalle      = action.payload.response.suma
      state.total        = action.payload.response.total
  })
  .addCase(informesComparativo.rejected,(state)=>{
    state.loading = false
   
  }) 
      
      } 
    });
export const { resetInforme } = informeSlice.actions
const { reducer } = informeSlice;
export default reducer; 
