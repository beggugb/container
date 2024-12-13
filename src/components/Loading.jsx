import { Bars } from 'react-loader-spinner'
const Loading = ({loading}) => {    

  return (
    <>
    { loading ?
        <>
        <div className="justify-center items-center flex-1 fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="h-500 justify-center items-center flex">
                <div className="h-20 w-40 border-2 rounded-lg shadow-lg flex items-center bg-white justify-center">
                    <Bars
                        height="50"
                        width="220"
                        color="#0ea5e9"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperclassName=""
                        visible={loading}
                        />                                                                                                   
                </div>    
            </div>        
        </div>  
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    : null  }
    </>        
    );
}

export default Loading;
