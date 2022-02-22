import React from "react";
import classNames from "classnames";

import "components/Button.scss";

export default function Button(props) {

  const { confirm, danger, onClick, disabled } = props
  
  let buttonClass = classNames('button', {
    'button--confirm' : confirm, 
    'button--danger': danger
  });

   return (
    <button 
     className={buttonClass} 
     onClick={onClick} 
     disabled={disabled} 
    >
       {props.children}
    </button>
   );
}
