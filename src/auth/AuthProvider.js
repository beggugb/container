import React,{ useEffect } from "react";
import { AuthContext } from "./auth-context";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from '../reducers/slices/authSlice'

const AuthProvider = ({ children }) =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    /*const { user, item } = useSelector(state =>state.usuario)*/
    const { auth } = useSelector(state =>state.auth)
    const user  = JSON.parse(localStorage.getItem('@usuarioFitt'))
    const token = JSON.parse(localStorage.getItem('@tokenFitt'))

    
    const handleLogin = event =>{              
        event.preventDefault() 
        const io ={
            username : event.target[0].value,
            password : event.target[1].value,
            tip      : "login"
        }
        dispatch(login(io));
    }

    const handleLogout= () =>{
        dispatch(logout());
        navigate('/'); 
    }
    const value = {
        user,
        onLogin: handleLogin,
        onLogout: handleLogout
    };
    const reload = () =>{        
        /*if(token){
            navigate('/admin/inicio/');            
        }else{
            navigate('/');
        } */
        if(user){            
            switch(user.rolId){                
                case 1:
                    navigate('/admin/configuracion');
                    break;
                case 2: 
                    navigate('/admin/inicio');
                break;   
                case 3:
                    navigate('/admin/registros');
                    break;    
        
            }
            /*dispatch({type:'setBandera',response:0})*/
        }       
    }
    
    useEffect(() => {
        reload()
    }, [auth]);

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}
export default AuthProvider;
