
export function addM() {    
  let fecha = new Date()
  fecha.setDate(fecha.getDate()+14)
  var dd = String(fecha.getDate()).padStart(2, '0');
  var mm = String(fecha.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = fecha.getFullYear();
  var tt = yyyy + '-' + mm + '-' + dd;    
  return tt;
}




export function getInicio() 
{
  let fecha = new Date()
   var dd = String(fecha.getDate()).padStart(2, '0');
   var mm = String(fecha.getMonth() + 1).padStart(2, '0'); //January is 0!
   var yyyy = fecha.getFullYear();
   var tt = yyyy + '-' + mm + '-' + dd;    
   return tt
}



export function add_months(dt, n) 
{  
  let dato = new Date(dt.setDate(dt.getDate() - 1))
  return new Date(dato.setMonth(dato.getMonth() + n));
}


export function getFecha(today) 
{
   var dd = String(today.getDate()).padStart(2, '0');
   var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
   var yyyy = today.getFullYear();
   var tt = yyyy + '-' + mm + '-' + dd;    
   return tt
}  

export function addMM(day) {    
  let fecha = new Date() 
  fecha.setMonth(fecha.getMonth()+day)
  fecha.setDate(fecha.getDate()-1)
  var dd = String(fecha.getDate()).padStart(2, '0');
  var mm = String(fecha.getMonth()).padStart(2, '0'); //January is 0!
  var yyyy = fecha.getFullYear();
  var tt = yyyy + '-' + mm + '-' + dd;    
  return tt;
}

export const defaultValsi = (options, valor) =>{
  let iok = ""
  // eslint-disable-next-line array-callback-return
  options.map(item =>{
      if(item.value === valor){
        iok = item.label
      } 
    })  
  return iok    
}

export const defaultVal = (options, valor) =>{
    return options.filter(item =>
        item.value === valor
      )  
}
export const defaultVals = (options, value, valor) =>{         
  return options.filter(item =>
      value === valor      
    )  
}
function getDay (day){       
  let nday = '01';
  switch(day)
  {
    case 1:      
      nday = '01'
    break;
    case 2:      
      nday = '02'
    break;
    case 3:      
      nday = '03'
    break;
    case 4:      
      nday = '04'
    break;
    case 5:      
      nday = '05'
    break;
    case 6:      
      nday = '06'
    break;
    case 7:      
      nday = '07'
    break;
    case 8:      
      nday = '08'
    break; 
    case 9:      
      nday = '09'
      break;
    case 10:      
      nday = '10'
      break;
    case 11:      
      nday = '11'
      break;
    case 12:      
      nday = '12'      
      break;            
    default:
    break;

  }    
  return nday

}

export function getMes(){
let mesHoy = new Date()  
let m = getDay(mesHoy.getMonth()+1)
let y = mesHoy.getFullYear()

let fecha ={}
fecha.desde = `${y}-${m}-01`
fecha.hasta = '0'  

switch(m)
{
  case '01':      
    fecha.hasta = `${y}-${m}-31`
  break;  
  case '02':
    fecha.hasta = `${y}-${m}-28`          
  break;  
  case '03':      
    fecha.hasta = `${y}-${m}-31`
    break;
  case '04':      
    fecha.hasta = `${y}-${m}-30`      
    break;
  case '05':      
    fecha.hasta = `${y}-${m}-31`
    break;
  case '06':      
    fecha.hasta = `${y}-${m}-30`
    break;
  case '07':      
    fecha.hasta = `${y}-${m}-31`
    break;
  case '08':      
    fecha.hasta = `${y}-${m}-31`
    break;
  case '09':      
    fecha.hasta = `${y}-${m}-30`
    break;
  case '10':      
    fecha.hasta = `${y}-${m}-31`
    break;
  case '11':      
    fecha.hasta = `${y}-${m}-30`
    break;        
  case '12':      
    fecha.hasta = `${y}-${m}-31`
    break;  
  default:
  break;

}
return fecha

}

export function getMeses(month,year){    
  let m = getDay(month+1)
  let y = year  
  let fecha ={}
  fecha.desde = `${y}-${m}-01`
  fecha.hasta = '0'  
  
  switch(m)
  {
    case '01':      
      fecha.hasta = `${y}-${m}-31`
    break;  
    case '02':
      fecha.hasta = `${y}-${m}-28`          
    break;  
    case '03':      
      fecha.hasta = `${y}-${m}-31`
      break;
    case '04':      
      fecha.hasta = `${y}-${m}-30`      
      break;
    case '05':      
      fecha.hasta = `${y}-${m}-31`
      break;
    case '06':      
      fecha.hasta = `${y}-${m}-30`
      break;
    case '07':      
      fecha.hasta = `${y}-${m}-31`
      break;
    case '08':      
      fecha.hasta = `${y}-${m}-31`
      break;
    case '09':      
      fecha.hasta = `${y}-${m}-30`
      break;
    case '10':      
      fecha.hasta = `${y}-${m}-31`
      break;
    case '11':      
      fecha.hasta = `${y}-${m}-30`
      break;        
    case '12':      
      fecha.hasta = `${y}-${m}-31`
      break;  
    default:
    break;
  
  }
  return fecha
  
  }

export function roundToTwo(num){
  return +(Math.round(num + "e+2") + "e-2");
}

export function getFormateada(){   
  let fecha = ''
  let dd = new Date()
  let month = dd.getMonth()+1  
  let year  = dd.getFullYear()
  let fday = getDay(dd.getDay())  
  switch(month)
  {
    case 1:      
      fecha = `${year}-01-${fday}`
    break;  
    case 2:
      fecha = `${year}-02-${fday}`          
    break;  
    case 3:      
      fecha = `${year}-03-${fday}`
      break;
    case 4:      
      fecha = `${year}-04-${fday}`      
      break;
    case 5:      
      fecha = `${year}-05-${fday}`
      break;
    case 6:      
      fecha = `${year}-06-${fday}`
      break;
    case 7:      
      fecha = `${year}-07-${fday}`
      break;
    case 8:      
      fecha = `${year}-08-${fday}`
      break;
    case 9:      
      fecha = `${year}-09-${fday}`
      break;
    case 10:      
      fecha = `${year}-10-${fday}`
      break;
    case 11:      
      fecha = `${year}-11-${fday}`
      break;        
    case 12:      
      fecha = `${year}-12-${fday}`
      break;  
    default:
    break;
  
  }
  return fecha
  
  }