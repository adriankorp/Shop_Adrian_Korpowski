import React, { Component } from "react";
import withContext from "../../withContext";
import { client } from "../../index";
import { split } from "@apollo/client";
import "./ProductPage.css";


import { LOAD_PRODUCT } from "../../GraphQL/Queries";
class ProductPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: "",
      currency: "",
      amount: 0,
      mainImage: "",
      productSelectedAttributes: {},
    };
  }

  componentDidMount() {
    let productId = window.location.pathname.split("/")[2];
    client
      .query({
        query: LOAD_PRODUCT,
        variables: { id: productId },
      })
      .then((res) => {
        let { currency, amount } = res.data.product.prices.filter(
          (el) => el.currency.symbol === this.props.context.selectedCurrency
        )[0];
   
        this.setState({
          product: res.data.product,
          mainImage: res.data.product.gallery[0],
          amount: amount,
          currency: currency.symbol,
        });
      });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.context.selectedCurrency !== this.props.context.selectedCurrency
    ) {

      let currency = this.getPrice();
      this.setState({
        amount: currency.amount,
        currency: currency.currency.symbol,
      });
    }
  }

  getPrice() {
    return this.state.product.prices.filter(
      (el) => el.currency.symbol === this.props.context.selectedCurrency
    )[0];
  }

  selectAttribute = (attribute, name) => {
    this.setState({
      productSelectedAttributes: {
        ...this.state.productSelectedAttributes,
        [`${name}`]: attribute.value,
      },
    });
  };



  changeMainImage = (imageURL) => {
    this.setState({ mainImage: imageURL });
  };

  sizeSelect = (attribute) => {
    return (
      <>
        <p>{attribute.name}:</p>
        <div className="att-box-conteiner">
          {attribute.items.map((el) => {
            return (
              <button
                onClick={() => this.selectAttribute(el, attribute.name)}
                className={`att-box  ${
                  this.state.productSelectedAttributes[attribute.name] ===
                    el.value && "att-active "
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
        <div className="color-box-conteiner">
          {attribute.items.map((el) => {
            return (
              <div
                className={`color-box ${
                  this.state.productSelectedAttributes[attribute.name] ===
                    el.value && "color-box-active"
                }`}
              >
                <button
                  onClick={() => this.selectAttribute(el, attribute.name)}
                  style={{
                    background: el.value,
                    border: el.value !== "#FFFFFF" ? "none" : "1px solid black",
                    width: "32px",
                    height: "32px",
                  }}
                  key={el.id}
                ></button>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  render() {
    return (
      <>
        {this.state.product ? (
          <div className="product-page-conteiner">
            <div className="product-mini-images">
              {this.state.product.gallery.map((el, index) => {
                return (
                  <img
                    key={index}
                    src={`${el}`}
                    onClick={() => this.changeMainImage(el)}
                    alt={this.state.product.name}
                  />
                );
              })}
            </div>
            <div className="procuct-main-image">
              {this.state.product.inStock ? (
                <img src={this.state.mainImage} alt="main-product" />
              ) : (
                <div className="product-out-of-stock out-of-stock">
                  <img src={this.state.mainImage} alt="main-product " />
                  <p>out of stock</p>
                </div>
              )}
            </div>
            <div className="product-detalis-conteiner">
              <div className="product-name">
                <p>{this.state.product.brand}</p>
                <p>{this.state.product.name}</p>
              </div>
              <div className="product-attributes">
                {this.state.product.attributes.map((el) => {
                  
                  return (
                    <div key={el.id} className={`product-att`}>
                      {el.id === "Color"
                        ? this.colorSelect(el)
                        : this.sizeSelect(el)}
                    </div>
                  );
                })}
              </div>
              <div className="product-price"></div>
              <p>Price:</p>
              <p>
                {this.state.currency}
                {this.state.amount}
              </p>
              <div className="btn-add-to-cart">
                <button onClick={()=>{
                  this.state.product.attributes.length === Object.keys(this.state.productSelectedAttributes).length && this.props.context.addToCart({...this.state.product, productSelectedAttributes:this.state.productSelectedAttributes})
                }}>ADD TO CART</button>
              </div>

              <div
                className="product-description"
                dangerouslySetInnerHTML={{
                  __html: this.state.product.description,
                }}
              ></div>
            </div>
          </div>
        ) : (
          <>Loading...</>
        )}
      </>
    );
  }
}

export default withContext(ProductPage);
