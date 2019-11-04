import React from "react";
import "./Button.css";

const Button = props => {
  return (
    <button onClick={props.clicked} className={`button ${props.btnType}`}>
      {props.children}
    </button>
  );
};

export default Button;
