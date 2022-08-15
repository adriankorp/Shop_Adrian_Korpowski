import React, { Component } from "react";
import withContext from "../../withContext";
import "./CartPage.css";
import CartPageItem from "./CartPageItem";

class CartPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: {},
      price: 0,
      symbol: "",
    };
  }

  getCart() {
    let cart = localStorage.getItem("cart");
    cart = cart ? JSON.parse(cart) : {};
    this.setState({ cart: cart });
  }

  componentDidMount() {
    this.getCart();
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.context.cart) !== JSON.stringify(this.state.cart)
    ) {
      this.getCart();
    }
  }

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
    return (
      <div className="cart-page">
        <p>CART</p>
        <div className="cart-page-conteiner">
          {Object.keys(this.state.cart).map((key) => {
            let cartItem = this.state.cart[key];

            return (
              <CartPageItem
                 key = {cartItem.id}
                {...cartItem}
                selectedCurrency={this.props.context.selectedCurrency}
                increaseAmountItem={this.props.context.increaseAmountItem}
                decreaseAmountItem={this.props.context.decreaseAmountItem}
                updateCart={this.props.context.updateCart}
              />
            );
          })}
        </div>
        <div className="cart-page-order-box">
          <div className="order-box-tax">
            <p>Tax 21%: </p>
            <p style={{ fontWeight: 500 }}>
              {" "}
              &nbsp;{this.props.context.selectedCurrency}
              {(this.getTotalPrice() * 0.21).toFixed(2)}
            </p>
          </div>
          <div className="order-box-quantity">
            <p>Quantity: </p>
            <p style={{ fontWeight: 500 }}>&nbsp;{this.getNumberCartItems()}</p>
          </div>
          <div className="order-box-total">
            <p>Total: </p>
            <p style={{ fontWeight: 500 }}>
              &nbsp;
              {this.props.context.selectedCurrency}
              {this.getTotalPrice()}
            </p>
          </div>

          <button>ORDER</button>
        </div>
      </div>
    );
  }
}

export default withContext(CartPage);
