import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  selectCount,
  incrementByAmount,   
  incrementAsync, 
} from '../redux/reducers/counters/counterSlice';


const Counter = () => {
    const count = useSelector(selectCount);
    const dispatch = useDispatch();  
    const [incrementAmount, setIncrementAmount] = useState('2');
  
    const incrementValue = Number(incrementAmount) || 0;
    
  
    return (
      <div class="container mx-auto border-8">
        <div >
          <button
            
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            -
          </button>
          <span >{count}</span>
          <button
            
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            +
          </button>
        </div>
        <div >
          <input            
            aria-label="Set increment amount"
            value={incrementAmount}
            onChange={(e) => setIncrementAmount(e.target.value)}
          />
           <button            
            onClick={() => dispatch(incrementByAmount(incrementValue))}
          >
            Add Amount
          </button>
          <button            
            onClick={() => dispatch(incrementAsync(incrementValue))}>
            Add Async
          </button>
         
        </div>
     
      </div>
    );
  }
  
  export default Counter