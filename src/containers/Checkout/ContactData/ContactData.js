import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import "./ContactData.css";
import Axios from "../../../axios_orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Forms/Input/Input";
class ContactData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      OrderForm: {
        name: {
          elementType: "input",
          label: "Name",
          valid: false,
          validation: {
            required: true
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
          valid: false,
          validation: {
            required: true
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
          valid: false,
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
          valid: false,
          validation: {
            required: true
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
          valid: false,
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
          valid: false,
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
          elementConfig: {
            options: [
              { value: "fast", name: "Fast" },
              { value: "Cheap", name: "Cheapest" }
            ],
            value: "fast"
          }
        }
      },
      loading: false
    };
  }

  checkValidity = (value, rules) => {
    let isValid = false;

    if (rules.required) {
      isValid = value.trim() !== "";
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
    updatedElem.value = event.target.value;
    updatedElem.valid = this.checkValidity(
      event.target.value,
      updatedElem.validation
    );
    console.log(updatedElem);
    updatedOrderForm[id] = updatedElem;
    this.setState({ OrderForm: updatedOrderForm });
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
              key={element.id}
              label={element.config.label}
              name={element.id}
              elementConfig={element.config.elementConfig}
              value={element.config.elementConfig.value}
              onChange={event => this.inputChangeHandler(event, element.id)}
            />
          );
        })}

        <Button btnType="Success" clicked={this.orderHandler}>
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

export default ContactData;
