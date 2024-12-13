import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {toastr} from 'react-redux-toastr'
import AuthService  from "../services/authService"


export const image = createAsyncThunk(   
    "imagen/varios",
    async(dato,thunkAPI)=>{    
        try{                   
                     
          const data = await AuthService._upImagen(dato.item,dato.pky,dato.payload);            
          switch (dato.payload) {
            case "producto":
              /*thunkAPI.dispatch(setProducto(data));      */
            break;
            case "cliente":
              /*thunkAPI.dispatch(setCliente(data));      */
            break;
            case "empresa":
              /*thunkAPI.dispatch(setEmpresa(data));*/
            break;
            case "proveedor":
             /* thunkAPI.dispatch(setProveedor(data));*/
            break;        
            default:
              break;
          }
          toastr.success('Imagen', 'Actualizada')            
          return { response: "ok" }        
        }catch(error){                  
            return thunkAPI.rejectWithValue();           
        }   
    }
  )
  
  
  export const images = createAsyncThunk(   
    "imagen/varioss",
    async(dato,thunkAPI)=>{    
        try{                   
                     
          const data = await AuthService._upsImagen(dato.item,dato.pky,dato.pkys,dato.payload);          
          
          toastr.success('Imagen', 'Actualizada')            
          return { response: "ok" }        
        }catch(error){                  
            return thunkAPI.rejectWithValue();           
        }   
    }
  )
  
  
  const initialState = { 
    loading:false
  };  
  
  
  const imagenSlice = createSlice({
    name: "imagen",
    initialState,    
    extraReducers(builder) { 
      builder
        .addCase(image.pending,(state) =>{
            state.loading = true            
        })
        .addCase(image.fulfilled,(state)=>{
            state.loading = false                  
        })
        .addCase(image.rejected,(state)=>{
          state.loading = false        
        })
       
  
        
    }    
  });
  
  const { reducer } = imagenSlice;
  export default reducer;  

