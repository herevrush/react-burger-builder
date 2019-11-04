import React, { Component } from "react";
import Order from "../../components/Order/Order";
import Axios from "../../axios_orders";
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      loading: true
    };
  }

  componentDidMount() {
    Axios.get("/orders.json")
      .then(response => {
        const orders = [];
        for (const key in response.data) {
          if (response.data.hasOwnProperty(key)) {
            const element = response.data[key];
            orders.push({ ...element, id: key });
          }
        }

        this.setState({ orders: orders, loading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  }
  render() {
    return (
      <div>
        {this.state.orders.map(order => {
          return (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}
            />
          );
        })}
      </div>
    );
  }
}

export default ErrorHandler(Orders, Axios);
