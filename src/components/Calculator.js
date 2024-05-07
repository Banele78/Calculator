import ButtonPanel from './ButtonPanel';
import { useState, useEffect } from 'react';

import React from 'react'

function Calculator() {
    const [equals, setEquals] = useState("");
    const [operator, setOperator] = useState(false);
    const [num3, setNum3] = useState([]);
  
    const appendNumber = (input) => {
        if(input ==="+/-"){
            handleSignChange();
        }else if(input==="CE"){
            removeLast();
        }else if(input === "C"){
            clear();
        }else if(input ==="="){
     calculateTotal();
      }else if (typeof input === "string") {
         handleOperator(input);
      } else if (typeof input === "number") {
       handleNumber(input);
      };
    };

    const handleNumber = (number)=>{
        if (!operator) {
            if (num3.length > 0) {
              // If the last element of num3 is a number, append the digit to it
              const lastNumber = num3[num3.length - 1];
              const updatedNumber = parseFloat(lastNumber.toString() + number);
              setNum3([...num3.slice(0, -1), updatedNumber]);
            } else {
              // Otherwise, start a new number
              setNum3([...num3,parseFloat(number)]);
            };
          } else {
            setOperator(false);
            setNum3([...num3, parseFloat(number)]);
          };
    };

    const handleOperator =(operator)=>{
        if (operator === ".") {
            if (num3.length === 0 || typeof num3[num3.length - 1] === "string") {
              // If no number exists or if the last item is an operator
              setNum3([...num3, parseFloat(0) + operator]);
              setOperator(false);
            } else {
              // Append dot to the last number
              const lastNumber = num3[num3.length - 1];
              const updatedNumber = lastNumber.toString() + operator;
              setNum3([...num3.slice(0, -1), updatedNumber]);
            }
          } else {
            setNum3([...num3, operator]);
            setOperator(true);
          };
    };

    const handleSignChange = () => {
        // Toggle the sign of the last number in the array
        const lastItem = num3[num3.length - 1];
        if (typeof lastItem === 'number') {
          // Toggle the sign by multiplying with -1
          const updatedNumber = lastItem * -1;
          setNum3([...num3.slice(0, -1), updatedNumber]);
        }
      };

    const calculateTotal = () => {
        let total = parseFloat(0);
        let operator = "+"; // Default operator
        num3.forEach((value, index) => {
          if (typeof value === "number") {
            if (operator === "+") {
              total += value;
            } else if (operator === "-") {
              total -= value;
            } else if (operator === "x") {
              total *= value;
            } else if (operator === "/") {
              total /= value;
            } 
          }else if(value ==="%"){
            
            total /= 100;
          } else {
            operator = value;
          };
        });
        setEquals(total);
      };
    
  
    const clear = ()=>{
      setNum3([]);
      setEquals("");
      setOperator(false);
    }

    const removeLast = () => {
        // Get the last number or operator from the array
        const lastItem = num3[num3.length - 1];
        
        // Check if the last item is a number
        if (typeof lastItem === "number") {
            // Convert the number to a string
            const strNumber = lastItem.toString();
            
            // Remove the last character from the string
            const newStrNumber = strNumber.slice(0, -1);
            
            // If the new string is empty, remove the last item from the array
            if (newStrNumber === "") {
                setNum3(num3.slice(0, -1));
                setOperator(true);
                
            } else {
                // Otherwise, update the last item with the new number
                setNum3([...num3.slice(0, -1), parseFloat(newStrNumber)]);
            }
        } else {
            // If the last item is an operator, remove it directly
            setNum3(num3.slice(0, -1));
           
        }
    };
    
  return (
    <div className='Calculator'>
        <div className='results'>
        <p>{num3}</p>
      <p>{equals}</p>
        </div>
      
     <ButtonPanel onButtonClick={appendNumber} onClear={clear} />
    
      
    </div>
  )
}

export default Calculator
