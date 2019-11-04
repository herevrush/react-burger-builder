import React from "react";
import "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = props => {
  return (
    <ul className="NavigationItems">
      <NavigationItem link="/">Burger Builder</NavigationItem>
      <NavigationItem link="/checkout">Checkout</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
