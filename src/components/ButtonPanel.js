import React from 'react'

function ButtonPanel({onButtonClick, onClear }) {
    const inputs =[
        "CE","C","+/-","%","/",
        7, 8, 9, "x",
        4, 5, 6, "-",
        1, 2, 3,  "+",
        0, ".", "="
        ];

        const getStyleName = (btn) =>{
            const className={
                '=':'equals',
                '/' :'opt',
                'x' :'opt',
                '-' :'opt',
                '+' :'opt',
                'CE': 'row'
            }
            return className[btn]
        }
  return (
    <div className="ButtonPanel">
          
    {inputs.map((input, index) => (
      <button className={`${getStyleName(input)} button`} key={index} onClick={() => onButtonClick(input)}>{input}</button>
    ))}
  
  </div>
  )
}

export default ButtonPanel
