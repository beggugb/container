import React from 'react'
import Calendar from '../Tareas/Calendar'
const Dashboard = () => {        
    return ( 
     <div className="h-2/4 flex-1 mx-auto p-1 mb-10 ">
      <div className="border-2 p-2 rounded">
           <Calendar/>
      </div>  
     </div>
     );
}
 
export default Dashboard;