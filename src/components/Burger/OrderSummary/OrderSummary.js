import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';
import '../../UI/Button/Button.css';

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map(key => {
        return <li key={key}> 
                <span style={{textTransform:"capitalize"}}>
                {key}</span> : {props.ingredients[key]}
                </li>
    });

    
  return (
    <Aux>
        <h3> Your Order</h3>
        <p> A burger with below ingredients:</p>
        <ul>
        {ingredientSummary}
        </ul>
        <p>
            <strong>
            Total Price : {props.totalPrice} $
            </strong>
        </p>
        <p> Checkout</p>
        <Button btnType="Danger" clicked={props.purchaseCancelHandler}>CANCEL</Button>
        <Button btnType="Success" clicked={props.purchaseConfirmHandler}>CONTINUE</Button>
    </Aux>
  )
}

export default OrderSummary;
