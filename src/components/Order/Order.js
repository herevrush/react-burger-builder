import React from "react";
import "./Order.css";
function Order(props) {
  const ingredients = [];
  for (const ingredient in props.ingredients) {
    if (props.ingredients.hasOwnProperty(ingredient)) {
      ingredients.push({
        name: ingredient,
        quantity: props.ingredients[ingredient]
      });
    }
  }

  const ingredientElements = ingredients.map(ing => {
    return (
      <span
        key={ing.name}
        style={{
          textTransform: "capitalize",
          border: "1px solid #eee",
          display: "inline-block",
          margin: "0 8px",
          padding: "5px",
          textAlign: "center",
          alignContent: "center"
        }}
      >
        {ing.name} : {ing.quantity}
      </span>
    );
  });
  return (
    <div className="Order">
      <p>
        <strong>Ingredients :</strong>
        {ingredientElements}
      </p>
      <p>
        Price: <strong>AUS {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
}

export default Order;
