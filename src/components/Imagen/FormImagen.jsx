import React,{useState} from "react";
import { api } from '../../helpers/api'
import { useSelector, useDispatch } from 'react-redux'
import { InfinitySpin  } from 'react-loader-spinner'
const FormImagen = ({item,payload,payloads}) =>{
    const dispatch = useDispatch()    
    const [file,setFile] = useState('');
    const [imagePreviewUrl,setImagePreviewUrl] = useState('');    
    const {loading }= useSelector(state => state.usuario)

    const handleSubmit = (e) =>{
        e.preventDefault()
        const formData = new FormData()
        formData.append("file",file)
        /*dispatch(inventarioActions.putFile(
            payload,
            formData,
            item.id
        ))*/
    }

    const handleChange = (e) =>{
        e.preventDefault()
        let reader = new FileReader()
        let file = e.target.files[0]
        /*reader.onloadend = () =>{
            setFile(file)
            setImagePreviewUrl(reader.result)
        }
        reader.readAsDataURL(file)*/
    }
    
    return(
        <>
  <div className="p-2 bg-white text-center">
    <div>
      <div className="mt-1 flex justify-center px-2 pt-2 pb-2 border border-gray-300 border-dashed rounded-md">
       
      {imagePreviewUrl ? 
      <div className={loading ? "space-y-1 text-center border border-gray-600 p-1 rounded-lg opacity-10" : 
      "space-y-1 text-center border border-gray-600 p-1 rounded-lg"
      } >
       <img alt="preview" className="h-60" src={imagePreviewUrl} />
      </div>
      :
      <div className="space-y-1 text-center border border-gray-300 p-1 rounded-lg">
       <img
          alt="img"
          className="h-64"
          /*src={api + `${api}/static/images/${payloads}/lg/` + item.filename}*/
          src={`${api}/static/images/${payloads}/lg/` + item.filename}
        />       
      </div>
      }   
      </div>
    </div>
    {loading &&
    <div className="z-50 -mt-40 flex justify-center">            
      <InfinitySpin 
        width='200'            
        color="#38bdf8"            
      />
    </div>}

    <div className="flex flex-row justify-center">
      <div className={loading ? "flex justify-center mt-16" : "flex justify-center mt-2"}>        
      
        <input 
          id="file" 
          name="formData" 
          type="file" 
          className="w-40 h-7 shadow-sm text-sm rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onChange={(e) => handleChange(e)}
        />        
      </div>
      {item.id > 0 ?
      <div className="flex justify-center mt-2">        
        <button 
          type="submit" 
          className="w-20 h-7 border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={(e) => handleSubmit(e)}
          >
          
        </button>        
      </div>
      :null
    }

    </div>
  </div>
</>
    )
}

export default FormImagen