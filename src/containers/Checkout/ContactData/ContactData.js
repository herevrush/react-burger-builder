import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import "./ContactData.css";
import Axios from "../../../axios_orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Forms/Input/Input";
import { connect } from "react-redux";
class ContactData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      OrderForm: {
        name: {
          elementType: "input",
          label: "Name",
          valid: true,
          touched: false,
          errorMessages: [],
          validation: {
            required: true,
            minLength: 3
          },
          elementConfig: {
            type: "text",
            placeholder: " Enter your name",
            value: "vrushali satpute"
          }
        },
        email: {
          elementType: "input",
          label: "Email",
          valid: true,
          touched: false,
          errorMessages: [],
          validation: {
            required: true,
            email: true
          },
          elementConfig: {
            type: "text",
            placeholder: " Enter your email address",
            value: "vrushali.satpute@gmail.com"
          }
        },
        street: {
          elementType: "input",
          label: "Street",
          valid: true,
          touched: false,
          errorMessages: [],
          validation: {
            required: true
          },
          elementConfig: {
            type: "text",
            placeholder: "Enter your street",
            value: "1 attilio way"
          }
        },
        postcode: {
          elementType: "input",
          valid: true,
          touched: false,
          errorMessages: [],
          validation: {
            required: true,
            minLength: 4,
            maxLength: 4
          },
          label: "Post Code",
          elementConfig: {
            type: "text",
            placeholder: "Enter your postcode",
            value: "3028"
          }
        },
        city: {
          elementType: "input",
          valid: true,
          touched: false,
          errorMessages: [],
          validation: {
            required: true
          },
          label: "City",
          elementConfig: {
            type: "text",
            placeholder: "Enter your city",
            value: "seabrook"
          }
        },
        Country: {
          elementType: "input",
          valid: true,
          touched: false,
          errorMessages: [],
          validation: {
            required: true
          },
          label: "Country",
          elementConfig: {
            type: "text",
            placeholder: "your country",
            value: "Australia"
          }
        },
        deliveryMethod: {
          elementType: "select",
          label: "Delivery Method",
          valid: true,
          validation: {},
          elementConfig: {
            options: [
              { value: "fast", name: "Fast" },
              { value: "Cheap", name: "Cheapest" }
            ],
            value: "fast"
          }
        }
      },
      isFormValid: true,
      loading: false
    };
  }

  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
      // console.log(value + "    " + value.length + "   " + isValid);
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
      // console.log(value + "    " + value.length + "   " + isValid);
    }

    if (rules.email) {
      isValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) && isValid;
    }

    if (rules.password) {
      isValid =
        value.match(/(?=.{7,13}$)(?=\w{7,13})(?=.*[A-Z])(?=.*\d)/) && isValid;
    }
    return isValid;
  };
  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let key in this.state.OrderForm) {
      formData[key] = this.state.OrderForm[key].elementConfig.value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
      //   customer: {
      //     name: "vrushali satpute",
      //     address: {
      //       street: "1 attilio way",
      //       city: "seabrook"
      //     },
      //     email: "vrushali.satpute@gmail.com"
      //   },
      //   delivery: {
      //     method: "fast"
      //   }
    };
    console.log(" In contactdata ");
    console.log(order);
    Axios.post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false, purchasing: false });
        console.log(response);
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false });
      });
    console.log("order confirm");
  };

  inputChangeHandler = (event, id) => {
    event.preventDefault();
    // console.log(event.target.value);
    const updatedOrderForm = {
      ...this.state.OrderForm
    };
    const updatedElem = {
      ...updatedOrderForm[id]
    };
    updatedElem.elementConfig.value = event.target.value;
    updatedElem.touched = true;
    updatedElem.valid = this.checkValidity(
      event.target.value,
      updatedElem.validation
    );

    updatedOrderForm[id] = updatedElem;

    let isFormValid = true;
    for (let inputElem in updatedOrderForm) {
      console.log(updatedOrderForm[inputElem]);
      isFormValid = isFormValid && updatedOrderForm[inputElem].valid;
    }
    this.setState({ OrderForm: updatedOrderForm, isFormValid: isFormValid });
    // console.log(updatedElem);
    console.log(isFormValid);
  };
  render() {
    const formElementsArr = [];
    for (let key in this.state.OrderForm) {
      formElementsArr.push({
        id: key,
        config: this.state.OrderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArr.map(element => {
          return (
            <Input
              type={element.config.elementType}
              touched={element.config.touched}
              invalid={!element.config.valid}
              key={element.id}
              label={element.config.label}
              name={element.id}
              shouldValidate={element.config.validation}
              elementConfig={element.config.elementConfig}
              value={element.config.elementConfig.value}
              changed={event => this.inputChangeHandler(event, element.id)}
            />
          );
        })}

        <Button
          btnType="Success"
          clicked={this.orderHandler}
          disabled={!this.state.isFormValid}
        >
          Order Now
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className="ContactData">
        <h4> Contact Details</h4>
        {form}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
};

export default connect(mapStateToProps)(ContactData);
