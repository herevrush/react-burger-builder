import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios_orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.5,
  meat: 0.2,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  // constructor(props){
  //     super(props);
  // }

  state = {
    ingredients: null,
    totalPrice: 4,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data });
        console.log(response);
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }
  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + INGREDIENT_PRICES[type];
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - INGREDIENT_PRICES[type];
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseConfirmHandler = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push(
      encodeURIComponent("totalPrice") +
        "=" +
        encodeURIComponent(this.state.totalPrice)
    );
    const queryString = queryParams.join("&");
    // console.log(" querystring is: " + queryString);
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
  };
  render() {
    const disableInfo = {
      ...this.state.ingredients
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.state.error ? (
      <p style={{ textAlign: "center" }}>Ingredients Can't Be Loaded.</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients}></Burger>
          <BuildControls
            addHandler={this.addIngredientHandler}
            removeHandler={this.removeIngredientHandler}
            disabled={disableInfo}
            totalPrice={this.state.totalPrice}
            orderHandler={this.purchaseHandler}
          ></BuildControls>
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancelHandler={this.purchaseCancelHandler}
          totalPrice={this.state.totalPrice}
          purchaseConfirmHandler={this.purchaseConfirmHandler}
        ></OrderSummary>
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>

        {burger}
      </Aux>
    );
  }
}

export default ErrorHandler(BurgerBuilder, axios);
