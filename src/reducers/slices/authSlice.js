import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import AuthService from "../services/authService"
import {toastr} from 'react-redux-toastr'
import { setTasks } from './tareaSlice' 
export const verificar = createAsyncThunk(
  "auth/verify",
  async({username, password},thunkAPI)=>{
      try{      
          const data = await AuthService._verificar();                       
      }catch(error){            
          toastr.error(error.code, "Errro de conexión")              
        return thunkAPI.rejectWithValue();           
      }   
  }
)

export const login = createAsyncThunk(
    "auth/login",
    async(dato,thunkAPI)=>{
        try{                  
            const data = await AuthService.login(dato);              
            if(!data.auth){
              toastr.warning('Auth', data.message)                         
            }                     
            
        }catch(error){    
          if(error.code === "ERR_NETWORK"){
            toastr.error(error.code, "Errro de RED") 
          }          
          return thunkAPI.rejectWithValue();           
        }   
    }
)





export const logout = createAsyncThunk(
  "auth/logout", 
  async () => {
    AuthService.logout();    
  });


const initialState = {
  user: null,
  loading:false, 
  auth:false,
  message:null , 
  estado:"",
  lmodulo:"",
  data:[],
  total:0,
  pagina:0,
  paginas:0,
};  


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers:{
    setUsername:(state,action)=>{
      state.username = action.payload
    },
    setPassword:(state,action)=>{
      state.password = action.payload
    },
    setLmodulo:(state,action)=>{               
      state.lmodulo = action.payload
    },   
  },
  extraReducers(builder) { 
    builder
      .addCase(login.pending,(state) =>{
          state.loading = true  
          state.auth = false                  
      })
      .addCase(login.fulfilled,(state,action)=>{
          state.loading  = false          
          state.auth     = true           
      })
      .addCase(login.rejected,(state)=>{
        state.loading = false     
      })

     


      .addCase(verificar.pending,(state) =>{
        state.loading = true  
        state.estado = ""                  
      })
      .addCase(verificar.fulfilled,(state)=>{
          state.loading  = true          
          state.estado   = "conectado"
      })
      .addCase(verificar.rejected,(state)=>{
        state.loading = false
        state.estado  = "sin conexión" 
    })
      
  }    
});

export const { setUsername, setPassword, setLmodulo } = authSlice.actions
const { reducer } = authSlice;
export default reducer;  
