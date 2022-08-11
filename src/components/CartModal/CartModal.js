import React, { Component } from "react";
import withContext from "../../withContext";
import CartItem from "./CartItem";
import "./CartModal.css";

class CartModal extends Component {

  componentDidMount() {
    this.setState({ cartKeys: Object.keys(this.props.context.cart || {}) });
  }


  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };

  

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <>
        <div className="darkBG" onClick={this.onClose} />
        <div className="modal-postion">
          <div className="modal">
            <div className="cart-headers">
              <p>My Bag</p>
              <p>, {Object.keys(this.props.context.cart).length} items</p>
            </div>
            <div className="cart-conteiner">
              {Object.keys(this.props.context.cart || {}).map((key) => {
                
                  let cartItem = this.props.context.cart[key];
                  return <CartItem {...cartItem} selectedCurrency = {this.props.context.selectedCurrency}/>


    

              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withContext(CartModal);
