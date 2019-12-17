import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios_orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";
import * as actionTypes from "../../store/actions";
import { connect } from "react-redux";

class BurgerBuilder extends Component {
  // constructor(props){
  //     super(props);
  // }

  state = {
    // ingredients: null,
    // totalPrice: 4,
    purchasable: false,
    order: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    // axios
    //   .get("/ingredients.json")
    //   .then(response => {
    //     this.setState({ ingredients: response.data });
    //     console.log(response);
    //   })
    //   .catch(error => {
    //     this.setState({ error: true });
    //   });
  }
  // addIngredientHandler = type => {
  //   // const oldCount = this.state.ingredients[type];
  //   // const updatedCount = oldCount + 1;
  //   // const updatedIngredients = {
  //   //   ...this.state.ingredients
  //   // };
  //   // updatedIngredients[type] = updatedCount;
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + INGREDIENT_PRICES[type];
  //   // this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
  // };

  // removeIngredientHandler = type => {
  //   const oldCount = this.props.ings[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - INGREDIENT_PRICES[type];
  //   // this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
  // };

  purchaseHandler = () => {
    this.setState({ order: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ order: false });
  };

  purchaseConfirmHandler = () => {
    this.props.history.push("/checkout");
    // const queryParams = [];
    // for (let i in this.props.ings) {
    //   queryParams.push(
    //     encodeURIComponent(i) + "=" + encodeURIComponent(this.props.ings[i])
    //   );
    // }
    // queryParams.push(
    //   encodeURIComponent("totalPrice") +
    //     "=" +
    //     encodeURIComponent(this.props.totalPrice)
    // );
    // const queryString = queryParams.join("&");
    // console.log(" querystring is: " + queryString);
    // this.props.history.push({
    //   pathname: "/checkout",
    //   search: "?" + queryString
    // });
  };

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };
  render() {
    const disableInfo = {
      ...this.props.ings
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

    if (this.props.ings) {
      console.log(this.updatePurchaseState(this.props.ings));
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings}></Burger>
          <BuildControls
            addHandler={this.props.onAddIngredients}
            removeHandler={this.props.onRemoveIngredients}
            disabled={disableInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            totalPrice={this.props.totalPrice}
            orderHandler={this.purchaseHandler}
          ></BuildControls>
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelHandler={this.purchaseCancelHandler}
          totalPrice={this.props.totalPrice}
          purchaseConfirmHandler={this.purchaseConfirmHandler}
        ></OrderSummary>
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal show={this.state.order} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>

        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    totalPrice: state.totalPrice
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAddIngredients: ingName =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onRemoveIngredients: ingName =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(BurgerBuilder, axios));
