import { configureStore} from '@reduxjs/toolkit'
import { reducer as toastrReducer} from 'react-redux-toastr'

import clienteSlice from './slices/clienteSlice'
import authSlice from './slices/authSlice'
import tareaSlice from './slices/tareaSlice'
import membresiaSlice from './slices/membresiaSlice' 
import imagenSlice from './slices/imagenSlice'
import cajaSlice from './slices/cajaSlice'
import cajaItemsSlice from './slices/cajaItemsSlice'
import paqueteSlice from './slices/paqueteSlice'
import notaSlice from './slices/notaSlice'
import ventaSlice from './slices/ventaSlice'
import productoSlice from './slices/productoSlice'
import categoriaSlice from './slices/categoriaSlice'
import informeSlice from './slices/informeSlice'
import usuarioSlice from './slices/usuarioSlice'
import marcaSlice from './slices/marcaSlice'
import modeloSlice from './slices/modeloSlice'
import unidadSlice from './slices/unidadSlice'
import origenSlice from './slices/origenSlice'
import industriaSlice from './slices/industriaSlice'
import volumenSlice from './slices/volumenSlice'
import tipoSlice from './slices/tipoSlice'
import registroSlice from './slices/registroSlice'
import compraSlice from './slices/compraSlice'
import proveedorSlice from './slices/proveedorSlice'

const reducer ={      
    toastr      : toastrReducer,
    auth        : authSlice,
    imagen      : imagenSlice,
    cliente     : clienteSlice,
    tarea       : tareaSlice,
    membresia   : membresiaSlice,
    caja        : cajaSlice,
    cajaitems   : cajaItemsSlice,
    paquete     : paqueteSlice,
    nota        : notaSlice,
    venta       : ventaSlice,
    producto    : productoSlice,
    categoria   : categoriaSlice,
    usuario     : usuarioSlice,
    informe     : informeSlice,
    marca       :marcaSlice,
    modelo      : modeloSlice,
    origen     : origenSlice,
    unidad     : unidadSlice,
    industria  : industriaSlice,
    volumen    : volumenSlice,
    tipo       : tipoSlice,
    registro   : registroSlice,
    compra     : compraSlice,
    proveedor  : proveedorSlice
}

export const store = configureStore({
    reducer: reducer,
    devTools: true,
})