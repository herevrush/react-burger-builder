import React from 'react';
import './BuildControl.css';

const buildControl = (props) => {
 return (<div className="BuildControl">
    <div className="Label"> {props.label}
    </div>
    <button 
        className="Less"  
        onClick={props.removeHandler} 
        disabled={props.disabled}>-</button>
    <button 
        className="More"  
        onClick={props.addHandler}>+</button>
  </div>)
}

export default buildControl;