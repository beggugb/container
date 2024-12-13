import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './layout/LoginLayout'
import Admin from './layout/Admin'
import NoMatch from './layout/NoMatch'
import AuthProvider from './auth/AuthProvider';
import Protected from './auth/Protected'
import ReduxToastr from 'react-redux-toastr'
import './assets/css/core/main.css';
import './assets/css/daygrid/main.css';
import './assets/css/timegrid/main.css'

function App() {
  return (     
    <AuthProvider>
      <ReduxToastr
      timeOut={1500}
      newestOnTop={false}
      preventDuplicates
      position="bottom-left"
      getState={(state) => state.toastr} 
      transitionIn="bounceIn"
      transitionOut="bounceOut"
      progressBar
      closeOnToastrClick
      />
    <Routes>        
      <Route index element={<Login />} />       
      <Route path="/" element={<Login/> } />                          
      <Route 
        path="admin/*" 
        element={
        <Protected>
          <Admin />
        </Protected>          
      }        
      />       
      <Route path="*" element={<NoMatch />} />                        
    </Routes>
  </AuthProvider>
  );
}

export default App;
