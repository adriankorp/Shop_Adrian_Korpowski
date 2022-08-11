import React, { Component } from "react";
import "./CartModal.css";

export default class CartItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price: 0,
      symbol: "",
      productSelectedAttributes:{}
    };
  }
  getPrice() {
    let currency = this.props.prices.filter(
      (el) => el.currency.symbol === this.props.selectedCurrency
    )[0];
    console.log(currency);
    this.setState({ price: currency.amount, symbol: currency.currency.symbol });
  }
  componentDidMount() {
    this.setState({productSelectedAttributes: {...this.props.productSelectedAttributes}})
    this.getPrice();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedCurrency !== this.props.selectedCurrency) {
      this.getPrice();
    }
  }

  selectAttribute = (attribute, name) => {
    this.setState({
      productSelectedAttributes: {
        ...this.state.productSelectedAttributes,
        [`${name}`]: attribute.value,
      },
    });
  };

  sizeSelect = (attribute) => {
    return (
      <>
        <p>{attribute.name}:</p>
        <div className="att-cart-box-conteiner">
          {attribute.items.map((el) => {
            return (
              <button
                onClick={() => this.selectAttribute(el, attribute.name)}
                className={`att-cart-box ${
                  this.state.productSelectedAttributes[attribute.name] ===
                    el.value && "att-active"
                }`}
                key={el.id}
              >
                {el.value}
              </button>
            );
          })}
        </div>
      </>
    );
  };

  colorSelect = (attribute) => {
    return (
      <>
        <p>{attribute.name}:</p>
        <div className="color-cart-box-conteiner">
          {attribute.items.map((el) => {
            return (
                <>              <div
                className={`color-cart-box ${
                  this.state.productSelectedAttributes[attribute.name] ===
                    el.value && "color-cart-box-active"
                }`}
              >
                <div
                  onClick={() => this.selectAttribute(el, attribute.name)}
                  style={{
                    background: el.value,
                    border: el.value !== "#FFFFFF" ? "none" : "1px solid black",
                    width: "16px",
                    height: "16px",
             
                  }}
                  key={el.id}
                ></div>
              </div></>

            );
          })}
        </div>
      </>
    );
  };

  render() {
    return (
      <>
        <div className="cart-detalis-conteiner">
          <div className="cart-product-name">
            <p>{this.props.brand}</p>
            <p>{this.props.name}</p>
          </div>
          <div className="cart-product-price">
            {this.state.symbol}
            {this.state.price}
          </div>
          <div className="cart-product-attributes">
            {this.props.attributes.map((el) => {
              return (
                <div key={el.id} className={`product-cart-att`}>
                  {el.id === "Color"
                    ? this.colorSelect(el)
                    : this.sizeSelect(el)}
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}
