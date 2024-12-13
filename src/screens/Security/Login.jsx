import { useState ,useContext } from 'react';
import { AuthContext } from '../../auth/auth-context';
import { useSelector } from "react-redux";
import { PhoneIcon, CubeIcon, EyeIcon, EyeSlashIcon} from "@heroicons/react/24/solid";

const  Login = () => {  
  const { estado } = useSelector((state) => state.auth)    
  const { onLogin } = useContext(AuthContext)     
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [tip, settip] = useState("password");      
  const handelCh = () =>{    
    if(tip === "password")
    {
      settip("text")
    }else{
      settip("password")
    }
  }

return ( 
    <div className='h-600 w-full pt-2 pb-2 pl-10 pr-10 flex items-center justify-center'>    
       <div className='h-550  border border-gray-300 w-full flex shadow-lg'>
          <div className='h-full  w-1/2 flex flex-col  rounded-l items-center justify-center bg-[#e8e8e8]'>
            <div className='h-440 flex p-2 flex-col w-full items-center justify-center bg-[#212b34]'>
                <img
                    alt="..."
                    className="h-300"
                    src={require("../../assets/img/logo.png")}
                /> 
            </div>            
            <div className='h-24 mt-1 flex w-full items-center justify-start p-1'>
              <div className='h-20 flex flex-col w-full'>
                   <div className='h-7 border-b border-gray-300 text-[13px] font-bold flex items-center text-gray-600'>
                    <span className='w-1/2 text-sky-700 text-right pr-2'>Beggu 'BO Software </span>
                    <span className='w-1/2 text-left pl-2'>Desarrollo de Software </span>
                   </div> 

                   <div className='h-7 text-[13px] flex items-center'>
                    <span className='w-1/2 flex justify-end pr-2'>
                      <CubeIcon className="h-5 w-5 text-sky-600" />                       
                    </span>
                    <span className='w-1/2 text-left pl-2 text-gray-600'>
                      www.beggu-bo.com
                    </span>
                   </div> 

                   <div className='h-7 text-[13px] flex items-center'>
                    <span className='w-1/2 flex justify-end pr-2'>
                      <PhoneIcon className="h-5 w-5 text-sky-600" />
                    </span>
                    <span className='w-1/2 text-left pl-2 text-gray-600'>
                      78554476
                    </span>
                   </div> 
              </div>
            </div>              
          </div>

          <div className='h-full w-1/2 flex flex-col  rounded-d items-center justify-center bg-stone-50'>
            <div className='h-1/5 '>
                <p className='mt-4 w-56 h-12 text-[27px] text-sky-500 font-bold pl-10 pr-10 flex items-center justify-center'>SGFITT</p>
                <p className='w-56 h-4 italic text-gray-600 text-[12px] pl-10 pr-10 flex items-center justify-center'>Sistema de Gestión</p>
                <p className='w-56 h-4 italic text-gray-600 text-[12px] pl-10 pr-10 flex items-center justify-center'>v. 3.5</p>
            </div>
            <div className='h-4/5 pt-12 w-full flex-col flex items-center'>
            <form onSubmit={onLogin} className="h-90 w-4/6 p-4 border rounded shadow-md bg-stone-200 justify-center  flex-col flex">
              <div className="h-14 mt-9 flex-col text-[12px] text-gray-500 flex">
                  <label htmlFor='username' className='h-7 pt-1 pl-1'>
                    Usuario
                  </label>
                  <div className='h-9 border border-gray-300'>
                    <input
                      className="h-8 w-full border-none text-[12px] hover:bg-yellow-200 rounded focus:ring-0"
                      id="username"
                      type="text"
                      name="username"
                      value={username}                    
                      onChange={(e)=>{setusername(e.target.value)}}
                      autoComplete="off"
                      required
                    />
                  </div>
              </div>
              <div className="h-14 mt-7 flex-col text-[12px] text-gray-500 flex">
                  <label htmlFor='password' className='h-7 pt-1 pl-1'>
                    Password
                  </label>
                  <div className='h-9 border border-gray-300 flex items-center bg-white'>
                  <input
                        className="h-8 w-11/12 border-none text-[12px] hover:bg-yellow-200 rounded-l focus:ring-0"
                        id="password"
                        type={tip}
                        name="password"
                        value={password}                    
                        onChange={(e)=>{setpassword(e.target.value)}}
                        required
                      />
                      <button
                        type='button' 
                        onClick ={()=> handelCh()}
                        className='h-7 w-10 flex border-none bg-white pl-2 pt-1 rounded-r'>
                        { tip === "password" ? <EyeIcon className="h-5 w-5 text-gray-400" />   
                        : <EyeSlashIcon className="h-5 w-5 text-red-400" />   }
                        
                      </button>
                  </div>
              </div>
              <div className="h-14 mt-7 flex text-[12px] text-gray-500 items-center">
                <button 
                  className={estado === 0 ?"h-10 w-full bg-[#318bf9] text-gray-100 cursor-not-allowed rounded items-center justify-center flex hover:bg-sky-400": "h-10 w-full bg-sky-500 hover:bg-sky-300 rounded items-center justify-center flex text-white"}>
                  ingresar
                </button> 
              </div>
              </form> 
              </div>            
          </div>
      </div>
    </div>             
  );
}
 

export default Login ;