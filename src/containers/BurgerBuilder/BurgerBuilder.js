import React, { Component } from 'react'
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios_orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.5,
    meat: 0.2,
    bacon: 0.7
};

class BurgerBuilder extends Component{

    // constructor(props){
    //     super(props);
    // }

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasing: false,
        loading: false
    };

    componentDidMount() {
        axios.get('/ingredients.json')
        .then( response => {
            this.setState({ingredients: response.data});
            console.log(response);
        })
    }
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients,
        };
        updatedIngredients[type]= updatedCount;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + INGREDIENT_PRICES[type];
        this.setState ({ ingredients: updatedIngredients, totalPrice: newPrice});

    }

    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients,
        };
        updatedIngredients[type]= updatedCount;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - INGREDIENT_PRICES[type];
        this.setState ({ ingredients: updatedIngredients, totalPrice: newPrice});
    }

    purchaseHandler = () => {
        this.setState({purchasing : true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }

    purchaseConfirmHandler = ()=>{
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'vrushali satpute',
                address: {
                    street: '1 attilio way',
                    city: 'seabrook'
                },
                email: 'vrushali.satpute@gmail.com'
            },
            delivery: {
                method: 'fast'
            }
        };
        axios.post('/orders.json', order)
            .then( response => {
                this.setState({loading: false, purchasing: false});
                console.log ( response);
            })
            .catch ( error =>{
                this.setState({loading: false, purchasing: false});
            });
       console.log("order confirm");
    }
    render(){
        const disableInfo = {
            ...this.state.ingredients
        };
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key]<=0;
        }
        let orderSummary = null;

        let burger = <Spinner/>;
            
        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients= {this.state.ingredients}></Burger>
                    <BuildControls 
                        addHandler = {this.addIngredientHandler} 
                        removeHandler={this.removeIngredientHandler}
                        disabled={disableInfo}
                        totalPrice={this.state.totalPrice}
                        orderHandler = {this.purchaseHandler}
                    ></BuildControls>
                </Aux>
                );
            orderSummary =  <OrderSummary 
                ingredients = {this.state.ingredients}
                purchaseCancelHandler={this.purchaseCancelHandler}
                totalPrice={this.state.totalPrice}
                purchaseConfirmHandler={this.purchaseConfirmHandler}></OrderSummary>;
            
        }
        if(this.state.loading){
            orderSummary = <Spinner/>
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> 
                   {orderSummary}
                   {burger}
                </Modal>

                
            </Aux>
        );
    }
}

export default ErrorHandler(BurgerBuilder,axios);