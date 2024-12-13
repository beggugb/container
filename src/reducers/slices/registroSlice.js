import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {toastr} from 'react-redux-toastr'
import cajaService  from "../services/cajaService"

export const registrosCreate = createAsyncThunk(
  "registros/create",
  async(dato,thunkAPI)=>{
      try{      
          const data = await cajaService._create(dato,'registros');                   
          return { response: data }
      }catch(error){
        const {response} = error        
        toastr.error('registro', response.data.message)                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)


const initialState = { 
    loading:false,    
    item:{},
    cliente:{},
    membresia:{},
    message:"",
    bandera:0
  };  
  const registroSlice = createSlice({
    name: "registro",
    initialState,  
    reducers:{
      resetItem:(state)=>{
        state.item = {}
        state.cliente ={}
        state.membresia ={}
        state.message =""
        state.bandera =0
      }
    },
    extraReducers(builder) { 
        builder        
        .addCase(registrosCreate.pending,(state) =>{
          state.loading = true                      
        })
        .addCase(registrosCreate.fulfilled,(state,action)=>{
            state.loading = false
            state.message    = action.payload.response.message
            state.cliente    = action.payload.response.cliente
            state.membresia  = action.payload.response.membresia ? action.payload.response.membresia : {}
            state.bandera    = action.payload.response.bandera
        })
        .addCase(registrosCreate.rejected,(state)=>{
          state.loading = false            
        })
        
   
      } 
    });
export const { resetItem } = registroSlice.actions
const { reducer } = registroSlice;
export default reducer; 
