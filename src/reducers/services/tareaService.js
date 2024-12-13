import axios from 'axios'
import { api } from '../../helpers/api'
import authHeader  from '../../helpers/authHeader.js'


const _data = async (dato, endpoint) => {    
    const response = await axios
      .post(api + `${endpoint}/lista/items`, dato, {
        headers: { ...authHeader(), "Content-Type": "application/json" },
      });   
    return response.data.result
};

const _create = async (dato, endpoint) => {    
  const response = await axios
    .post(api + `${endpoint}/unit`, dato, {
      headers: { ...authHeader(), "Content-Type": "application/json" },
    });    

  return response.data.result
};

const _update = async (dato, endpoint) => {            
  const response = await axios
    .put(api + `${endpoint}/${dato.id}/${dato.tip}`, dato, {
      headers: { ...authHeader(), "Content-Type": "application/json" },
    });         
  return response.data.result    
};

const _item = async (pky, endpoint) => {    
  const response = await axios
    .get(api + `${endpoint}/item/${pky.id}/${pky.tip}`, {
      headers: { ...authHeader(), "Content-Type": "application/json" },
    });    
  return response.data.result
};

const _itemsList = async (dato,endpoint) => {        
  
  const response = await axios
  .post(api + `${endpoint}/listas/items`, dato, {        
    headers: { ...authHeader(), "Content-Type": "application/json" },
  });    
return response.data.result
};

const _informes = async (dato, endpoint) => {    
  const response = await axios
    .post(api + `informes/${endpoint}`, dato, {
      headers: { ...authHeader(), "Content-Type": "application/json" },
    });    

  return response.data.result
};

const _delete = async (dato, endpoint) => {    
  const response = await axios
    .post(api + `${endpoint}/delete/item/list`, dato, {
      headers: { ...authHeader(), "Content-Type": "application/json" },
    });
  return response.data.result
};

const tareaService = {                
    _data,
    _create,
    _update,
    _delete,
    _item,
    _itemsList,
    _informes    
};
    
export default tareaService;