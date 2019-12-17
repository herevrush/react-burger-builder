import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   ingredients: null,
    //   price: 0
    // };
  }

  componentWillMount() {
    // const query = new URLSearchParams(this.props.location.search);
    // const ingredients = {};
    // let price = 0;
    // for (let param of query.entries()) {
    //   if (param[0] === "totalPrice") {
    //     price = param[1];
    //   } else {
    //     ingredients[param[0]] = +param[1];
    //   }
    // }
    // this.setState({ ingredients: ingredients, price: price });
  }
  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  };

  continueCheckoutHandler = () => {
    console.log(" Ingredients in checkout");
    console.log(this.props.ingredients);
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          cancelCheckout={this.cancelCheckoutHandler}
          continueCheckout={this.continueCheckoutHandler}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients
  };
};

export default connect(mapStateToProps)(Checkout);
