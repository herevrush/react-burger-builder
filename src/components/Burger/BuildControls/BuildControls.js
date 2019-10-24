import React from 'react';
import "./BuildControls.css";
import BuildControl from './BuildControl/BuildControl';

const controls = [
 {label : 'Salad', type:'salad'},
 {label : 'Bacon', type:'bacon'},
 {label : 'Cheese', type:'cheese'},
 {label : 'Meat', type:'meat'}
];
const buildControls = (props) => 
   (<div className="BuildControls">
        <p> Total Price: <strong>${props.totalPrice.toFixed(2)}</strong></p>
        {controls.map( ctrl=>(
            <BuildControl key={ctrl.label} 
                type={ctrl.type} 
                label={ctrl.label} 
                removeHandler = {() => props.removeHandler(ctrl.type)}
                addHandler={() => props.addHandler(ctrl.type)} 
                disabled = {props.disabled[ctrl.type]}/>
            )
         )
        }
        <button 
            className="OrderButton"
            disabled={props.purchasable}
            onClick={props.orderHandler}> Order Now!!</button>
  </div>)


export default buildControls;