import React from "react";
import {  ChevronLeftIcon, ChevronRightIcon, ChevronDoubleLeftIcon,ChevronDoubleRightIcon } from "@heroicons/react/24/outline";

function Pagination({makeHttpRequestWithPage,total,paginas,pagina, num}) {
  let renderPageNumbers;

  const pageNumber = [];
  if (total !== null) {
    for (let i = 1; i <= paginas; i++) {
      pageNumber.push(i);
    }
    renderPageNumbers = pageNumber.map((number) => {
      let classes = pagina === number ? "border border-sky-500 h-7 w-7 border-white text-center bg-sky-500 text-white hover:bg-sky-400 text-sm font-bold mr-1" 
      : "border h-7 w-7 text-gray-500 border-sky-100 text-center bg-sky-100 hover:text-white hover:bg-sky-400 focus:outline-none disabled:opacity-25 disabled text-sm mr-1";

      if (
        number === 1 ||
        number === total ||
        (number >= pagina - 2 && number <= pagina + 2)
      ) {
        return (
          <button
            key={number}
            className={classes}
            onClick={() => makeHttpRequestWithPage(number, num)}
          >
            {number}
          </button>
        );
      } else {
        return null;
      }
    });
}
return (
  <div className="h-11 border flex bg-gray-50">
      <div className="w-2/6 flex items-center">
        <div className='text-[13px] text-gray-500 pl-2'>Mostrar {num} de {total} items </div>
      </div>
      <div className="w-4/6 flex items-center">
        <ul className="flex p-1 text-[12px] w-full justify-end items-center"> 
          <li 
            className={pagina === 1 ? "border rounded border-gray-200 flex items-center justify-center h-7 w-7 text-gray-400 mr-1 cursor-not-allowed p-1": "border rounded border-gray-300 flex items-center h-7 w-7 text-gray-400 mr-1 hover:bg-gray-200 justify-center p-1" } 
            onClick={() => makeHttpRequestWithPage(pagina === 1 ? 0 : 1,num)}>        
            <ChevronDoubleLeftIcon className="h-5 w-5 text-gray-400"/>
          </li>          
          <li
          className={pagina === 1 ? "border rounded border-gray-200 flex items-center h-7 w-7 justify-center text-gray-400 mr-1 cursor-not-allowed p-1": "border rounded border-gray-300 flex items-center h-7 w-7 text-gray-400 mr-1 hover:bg-gray-200 justify-center p-1" } 
          onClick={() =>makeHttpRequestWithPage(pagina === 1 ? 0: pagina - 1,num)}>        
          <ChevronLeftIcon className="h-5 w-5 text-gray-400" />
          </li>
          <li
          className="h-6 flex items-center">        
          {renderPageNumbers}
          </li> 

          <li        
          className={pagina === paginas ? "border rounded border-gray-200 flex items-center justify-center h-7 w-7 text-gray-400 mr-1 cursor-not-allowed p-1": "border rounded border-gray-300 flex items-center h-7 w-7 text-gray-400 mr-1 hover:bg-gray-200 justify-center p-1" } 
          onClick={() => makeHttpRequestWithPage(pagina === paginas ? 0 : pagina + 1,num)}>          
          <ChevronRightIcon className="h-5 w-5 text-gray-400" />
          </li>
          <li
          className={paginas === pagina ? "border rounded border-gray-200   flex items-center justify-center h-7 w-7 text-gray-400 mr-1 cursor-not-allowed p-1": "border rounded border-gray-300 h-7 w-7 text-gray-400 mr-1 hover:bg-gray-200 flex items-center justify-center p-1" } 
          onClick={() => makeHttpRequestWithPage(pagina === paginas ? 0: paginas,num)}>
          <ChevronDoubleRightIcon className="h-4 w-4 text-gray-500" />  
          </li>  
        </ul>

      </div>
  </div>  
  )}

export default Pagination
