import './BurgerIngredient.css';
import React, { Component} from 'react';
import PropTypes from 'prop-types';

class BurgerIngredient extends Component {

    render() {
        let ingredient = null;
        switch(this.props.type) {
            case ('bread-bottom'): 
                ingredient = <div className="BreadBottom"></div>;
                break;
            case ('bread-top'):
                ingredient = (
                    <div className="BreadTop">
                        <div className="Seeds1"></div>
                        <div className="Seeds2"></div>
                    </div>
                )
                break;
            case('meat'):
                ingredient = <div className="Meat"></div>
                break;
            case('cheese'):
                ingredient = <div className="Cheese"></div>
                break;
            case('salad'):
                ingredient = <div className="Salad"></div>
                break;
            case('bacon'):
                ingredient = <div className="Bacon"></div>
                break;
            default:
                ingredient = null;
                
        }
        return ingredient;
    }
} 

BurgerIngredient.prototypes = {
    type: PropTypes.string.isRequired
}
export default BurgerIngredient;