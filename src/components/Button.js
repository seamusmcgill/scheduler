import React from "react";

import "components/Button.scss";

export default function Button(props) {
  const { confirm, danger, onClick, disabled } = props
  
  let buttonClass = classNames('button', {
    'button--confirm' : confirm, 
    'button--danger': danger
  });
    >
       {props.children}
    </button>
}
