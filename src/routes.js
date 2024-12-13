 export const modulos = [
     {
         key:1,
         path:"/inicio",
         name: "Inicio",        
         layout: "/admin", 
         rolId:2         
 
     },     
    
    {
        key:3,
        path:"/clientes",
        name: "Clientes",        
        layout: "/admin",         
        rolId:2         

    }, 
    {
        key:4,
        path:"/cajas",
        name: "Cajas",        
        layout: "/admin",         
        rolId:2         

    },
    {
        key:5,
        path:"/tpdv",
        name: "Punto de Venta",        
        layout: "/admin",         
        rolId: 2         

    },
    {
        key:6,
        path:"/informes",
        name: "Informes",        
        layout: "/admin",         
        rolId:2         

    },
 
    {
        key:7,
        path:"/configuracion",
        name: "Configuracion",        
        layout: "/admin",         
        rolId:1         

    },   
    {
        key:8,
        path:"/reportes",
        name: "Reportes",        
        layout: "/admin",         
        rolId:1         

    },
    {
        key:9,
        path:"/inventario",
        name: "Inventario",        
        layout: "/admin",         
        rolId:1         

    },
    {
        key:10,
        path:"/adquisiciones",
        name: "Adquisiciones",        
        layout: "/admin",         
        rolId:1         

    },
    {
        key:11,
        path:"/membresias",
        name: "Membresias",        
        layout: "/admin",         
        rolId:1         

    },
    
    
 ]


 export const getModulos = (rolId) =>{
        return modulos.filter(item => 
             item.rolId === rolId
         )   
     

 }