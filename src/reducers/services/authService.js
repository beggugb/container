import axios from 'axios'
import { api } from '../../helpers/api'

  const login = async (dato) => {
    const response = await axios
      .post(api + "usuarios/login/usuario", dato);        
        let resUser = response.data.user.usuario;
        let resToken = response.data.user.token;    
        let authOp = {
        message : response.data.user.message,
        auth    : response.data.user.auth,
        tasks   : response.data.tasks
        };
        if (resUser) {
        localStorage.setItem("@usuarioFitt", JSON.stringify(resUser));
        localStorage.setItem("@tokenFitt", JSON.stringify(resToken));      
        }
        return authOp;
    };

const logout = () =>{
    localStorage.removeItem("@usuarioFitt")
    localStorage.removeItem("@tokenFitt")    
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("@usuarioFitt"));
  };
  const _upImagen = async (dato,pky, endpoint) => {     
 
    if(endpoint === 'empresa'){
      const response = await axios
      .put(api + `files/${endpoint}/item/${pky}`, dato);    
      localStorage.setItem("@empresaUnity22", JSON.stringify(response.data.result));      
      return response.data.result    
    }else{
      const response = await axios
      .put(api + `files/${endpoint}/item/${pky}`, dato);    
      return response.data.result   
    }    
  };
  const _upsImagen = async (dato,pky,pkys,endpoint) => {      
      const response = await axios
      .put(api + `files/${endpoint}/item/${pky}/${pkys}`, dato);    
      return response.data.result   
  };


  const _verificar = async (pky) => {    
    const response = await axios
      .get(api + `usuarios/`, {
        headers: { "Content-Type": "application/json" },
      });    
    return response.data.result
  };

const AuthService = {        
    login,
    logout,
    _verificar,
    getCurrentUser,    
    _upImagen,
    _upsImagen
  };
  
export default AuthService;