import React, {Component} from 'react';
import './Modal.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

class modal extends Component {

  shouldComponentUpdate(nextProps, nextState, nextContext) {
     return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }
  render () {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed}></Backdrop>
        <div 
          className="Modal"
          style={{
            transform: this.props.show? 'translateY(0)': 'translateY(-100vh)',
            opacity: this.props.show? '1': '0'
          }}>
          {this.props.children}
        </div>
      </Aux>
      
    )
  }
}

export default modal;
