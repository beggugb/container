export const _itemCliente =[
    {label:"nombres",type:"string"},    
    {label:"apellidos",type:"string"},
    {label:"direccion",type:"string"},
    {label:"telefono",type:"number"},
    {label:"nit",type:"short"},
    {label:"email",type:"email"}
]

export const _validateConfig = (type,dato) =>{        
    let res = false
    switch(type){
        case 'email':
        res = temail(dato)
        break;
        case 'string':
        res = tstring(dato)
        break;
        case 'short':
        res = tshort(dato)
        break;
        case 'number':
        res = tnumber(dato)
        break;
        case 'codigo':
        res = tcodigo(dato)
        break;
        default:
        break;
    }
    return res    
}

const temail = (dato) =>{    
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (dato.match(validRegex)) {          
      return "";  
    } else {          
      return "* formato invalido email";  
    }
}
const tstring = (dato) =>{        
    if (dato.length < 2){
        return "El campo debe ser mayor a 2  carácteres";    
    }else if(dato.length > 40){
        return "El campo debe ser menor de 40 carácteres";    
    }else{
        return "";    
    }
}    
const tshort = (dato) =>{        

    if (dato.length < 2){
        return "El campo debe ser mayor a 2  carácteres";    
    }else if(dato.length > 15){
        return "El campo debe ser menor de 15 carácteres";    
    }else{
        return "";    
    }
}  
const tnumber = (dato) =>{        
    var validRegex = /^\s*[+-]?(\d+|\d*\.\d+|\d+\.\d*)([Ee][+-]?\d+)?\s*$/;
    if (dato.match(validRegex)) {                  
        if(dato.length < 10){
            return ""; 
        }else{
            return "Máximo 10 dígitos";    
        }
      } else {          
        return "* formato númerico invalido";  
    }
}  

const tcodigo = (dato) =>{        
    var validRegex = /^\s*[+-]?(\d+|\d*\.\d+|\d+\.\d*)([Ee][+-]?\d+)?\s*$/;
    if (dato.match(validRegex)) {                          
        return "";         
      } else {          
        return "* formato númerico invalido";  
    }
} 