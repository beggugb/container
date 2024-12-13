export const _tipoCliente =[
    {"value":'Natural',"label":'Natural'},
    {"value":'Jurídica',"label":'Jurídica'}
  ]
export const tipoCliente = [
    {"value":"prospectos","label":"prospectos"},
    {"value":"interesados","label":"interesados"},
    {"value":"compradores","label":"compradores"},
    {"value":"clientes","label":"clientes"},
    {"value":"leales","label":"leales"}

]; 
export const grupoCliente = [    
    {"value":"empresarial","label":"empresarial"},
    {"value":"personal","label":"personal"}    
]; 

export const formaPagos = [    
    {"value":"contado","label":"contado"},
    {"value":"crédito","label":"crédito"}    
];

export const formaEntregas = [    
    {"value":"Inmediato","label":"Inmediato"},
    {"value":"Mismo día","label":"Mismo día"},
    {"value":"Día siguiente","label":"Día siguiente"},
    {"value":"1 semana","label":"1 semana"}
];

export const impuestos = [    
    {"value":'0',"label":"Sin/Iva"},
    {"value":'13',"label":"IVA(13%)"}    
];

export const tipoPromociones = [    
    {"value":'agotar stock',"label":'agotar stock'},
    {"value":'descuento',"label":'descuento'},
    {"value":'nuevo producto',"label":'nuevo producto'},
    {"value":'oferta',"label":'oferta'}
];

export const gestiones = [    
    {"value":'2021',"label":'2021'},
    {"value":'2022',"label":'2022'}    
];

export const tiposPersona = [    
    {"value":'Natural',"label":'Natural'},
    {"value":'Jurídica',"label":'Jurídica'}    
];

export const tipoGenero = [    
    {"value":'Femenino',"label":'Femenino'},
    {"value":'Masculino',"label":'Masculino'},
    {"value":'Otros',"label":'Otros'}    
];
export const tiposProveedor = [    
    {"value":'Proveedor Local',"label":'Proveedor Local'},
    {"value":'Proveedor Internacional',"label":'Proveedor Internacional'}
];

export const tiposLlamada = [        
    {"value":"#f0352eb0","label":"Email"}, 
    {"value":"#99ee38b4","label":"Llamada"},                   
    {"value":"#c338eebd","label":"Reunion"}
    
];

export const pages =[
    {"value":15,"label":"15"},
    {"value":30,"label":"30"},
    {"value":50,"label":"50"}             
];


export const tiposMovimiento = [           
        {"value":"Baja","label":"Baja"},
        {"value":"Traspaso","label":"Traspaso"}
]

export const tiposOrigen = [               
    {"value":"Nuevo Stock","label":"Nuevo Stock"},
    {"value":"Aumento Stock","label":"Aumento Stock"},
    {"value":"Previción Stock","label":"Previción Stock"}
]

export const tiposCompra = [           
    {"value":"Inmediata","label":"Inmediata"},
    {"value":"Programada","label":"Programada"}    
]

export const tiposFiscal = [           
    {"value":"Natural","label":"Natural"},
    {"value":"Juridica","label":"Juridica"}    
]


export const roles = [           
    {"value":"administrador","label":"administrador"},
    {"value":"ejecutivo","label":"ejecutivo"},
    {"value":"contador","label":"contador"},
    {"value":"usuario","label":"usuario"}
]
//Models
export const mCliente = [           
    {"value":"nombres","label":"nombres"},
    {"value":"apellidos","label":"apellidos"},
    {"value":"direccion","label":"direccion"},
    {"value":"nit","label":"nit"}
]
export const mProducto = [           
    {"value":"nombre","label":"nombre"},
    {"value":"codigo","label":"codigo"}    
]

export const mUsuario = [           
    {"value":"nombre","label":"nombre"},
    {"value":"rol","label":"rol"}    
]

export const mCompra = [           
    {"value":"observaciones","label":"detalle"},
    {"value":"proveedor","label":"proveedor"}    
]

export const mVenta = [           
    {"value":"observaciones","label":"detalle"},
    {"value":"cliente","label":"cliente"}    
]


export const mProveedor = [           
    {"value":"razonSocial","label":"nombre"},
    {"value":"nit","label":"nit"}    
]


export const _paises = [
    {"label":"Argentina","value":"AR","indice":0},    
    {"label":"Bolivia","value":"BO","indice":1},
    {"label":"Chile","value":"CL","indice":2},
    {"label":"Colombia","value":"CO","indice":3},
    {"label":"Costa Rica","value":"CR","indice":4},
    {"label":"El Salvador","value":"SV","indice":5},
    {"label":"Mexico","value":"MX","indice":6},
    {"label":"Nicaragua","value":"NI","indice":7},        
    {"label":"Paraguay","value":"PY","indice":8},    
    {"label":"Peru","value":"PE","indice":9},
    {"label":"Republica Dominicana","value":"DO","indice":10},    
    {"label":"Uruguay","value":"UY","indice":11},
    {"label":"Venezuela","value":"VE","indice":12},

]


export const _ciudades= [
  {"label":"Beni","value":"Beni","indice":1,"latitude":-17.78629,"longitude":-63.18117},
  {"label":"Cochabamba","value":"Cochabamba","indice":1,"latitude":-17.3895,"longitude":-66.1568},
  {"label":"La Paz","value":"La Paz","indice":1,"latitude":-16.5,"longitude":-68.15},
  {"label":"Oruro","value":"Oruro","indice":1,"latitude":-17.98333,"longitude":-67.15},
  {"label":"Pando","value":"Pando","indice":1,"latitude":-11.02671,"longitude":-68.76918},
  {"label":"Potosi","value":"Potosi","indice":1,"latitude":-19.58361,"longitude":-65.75306},        
  {"label":"Santa Cruz","value":"Santa Cruz","indice":1,"latitude":-17.78629,"longitude":-63.18117},
  {"label":"Sucre","value":"Sucre","indice":1,"latitude":-19.03332,"longitude":-65.26274},
  {"label":"Tarija","value":"Tarija","indice":1,"latitude":-21.53549,"longitude":-64.72956},

]

export const getCiudades = (paisId) =>{
    return _ciudades.filter(item => 
       item.indice === paisId
)}