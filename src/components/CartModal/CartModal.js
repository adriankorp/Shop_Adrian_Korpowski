import React, { Component } from "react";
import { Link } from "react-router-dom";
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

  getTotalPrice() {
    let cartKeys = Object.keys(this.props.context.cart || {});
    let selectedCurrency = this.props.context.selectedCurrency;
    let cart = this.props.context.cart;
    let total = 0;
    if (cartKeys) {
      cartKeys.map((key) => {
        let price = cart[key].prices.filter(
          (el) => el.currency.symbol === selectedCurrency
        )[0].amount;

        total += price * cart[key].amount;
      });
    }
    return total.toFixed(2);
  }

  getNumberCartItems() {
    let cartKeys = Object.keys(this.props.context.cart || {});
    let cart = this.props.context.cart;
    let total = 0;
    if (cartKeys) {
      cartKeys.map((key) => {
        total += cart[key].amount;
      });
      return total;
    }
    return 0;
  }

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
              <p>, {this.getNumberCartItems()} items</p>
            </div>
            <div className="cart-conteiner">
              {Object.keys(this.props.context.cart || {}).map((key) => {
                let cartItem = this.props.context.cart[key];
                return (
                  <CartItem
                    {...cartItem}
                    selectedCurrency={this.props.context.selectedCurrency}
                    increaseAmountItem={this.props.context.increaseAmountItem}
                    decreaseAmountItem={this.props.context.decreaseAmountItem}
                    updateCart={this.props.context.updateCart}
                  />
                );
              })}
            </div>
            <div className="cart-total-value">
              <p>Total: </p>
              <p>
                {this.props.context.selectedCurrency}
                {this.getTotalPrice()}
              </p>
            </div>
            <div className="checkout-viewbag-box">
              <Link to="/cart" className="viewbag-button">
                <p>VIEW BAG</p>
              </Link>

              <button className="checkout-button">CHECKOUT</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withContext(CartModal);
