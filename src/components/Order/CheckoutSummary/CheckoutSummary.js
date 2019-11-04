import React from "react";
import "./CheckoutSummary.css";
import Button from "../../UI/Button/Button";
import Burger from "../../Burger/Burger";

function CheckoutSummary(props) {
  return (
    <div className="CheckoutSummary">
      <h1> Hope you love it !!!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.cancelCheckout}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.continueCheckout}>
        CONTINUE
      </Button>
    </div>
  );
}

export default CheckoutSummary;
