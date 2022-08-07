import React, { Component } from "react";
import "./ProductCard.css";
import withContext from "../../withContext";
class ProductCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price: 0,
      symbol: "",
    };
  }

  componentDidMount() {
    let currency = this.getPrice()[0];

    this.setState({
      price: currency.amount,
      symbol: currency.currency.symbol,
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.context.selectedCurrency !== this.props.context.selectedCurrency
    ) {
      console.log(this.props.context.selectedCurrency);
      let currency = this.getPrice()[0];
      this.setState({
        price: currency.amount,
        symbol: currency.currency.symbol,
      });
    }
  }

  getPrice() {
    return this.props.prices.filter(
      (el) => el.currency.symbol === this.props.context.selectedCurrency
    );
  }

  render() {
    return (
      <>
        {this.props.inStock ? (
          <div className="product-card-conteiner">
            <div className="product-image">
              <img src={this.props.gallery[0]} alt={this.props.name} />
              {this.props.attributes.length === 0 ? (
                <button>
                  <img src="cart-shopping-solid.svg" alt="cart" />
                </button>
              ) : (
                <></>
              )}
            </div>

            <div className="product-name-price">
              <p>{this.props.name}</p>
              <p>
                {this.state.symbol}
                {this.state.price}
              </p>
            </div>
          </div>
        ) : (
          <div className="product-card-conteiner out-of-stock">
            <div className="product-image">
              <p>out of stock</p>
              <img src={this.props.gallery[0]} alt={this.props.name} />
            </div>
            <div className="product-name-price">
              <p>{this.props.name}</p>
              <p>
                {this.state.symbol}
                {this.state.price}
              </p>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default withContext(ProductCard);
