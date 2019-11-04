import React, { Component } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Orders from "./containers/Orders/Orders";

class App extends Component {
  state = {
    show: true
  };

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({show: false});
  //   }, 5000);
  // }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Layout>
            <Switch>
              <Route path="/checkout" component={Checkout} />
              <Route path="/" exact component={BurgerBuilder} />
              <Route path="/orders" component={Orders} />
            </Switch>
            {/* {this.state.show ? <BurgerBuilder /> : null}*/}
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
