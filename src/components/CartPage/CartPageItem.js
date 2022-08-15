import React, { Component } from "react";

export default class CartPageItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price: 0,
      symbol: "",
      productSelectedAttributes: {},
      selectedImage: "",
    };
  }
  getPrice() {
    let currency = this.props.prices.filter(
      (el) => el.currency.symbol === this.props.selectedCurrency
    )[0];
    this.setState({ price: currency.amount, symbol: currency.currency.symbol });
  }
  componentDidMount() {
    this.setState({
      productSelectedAttributes: { ...this.props.productSelectedAttributes },
      selectedImage: this.props.gallery[0],
    });
    this.getPrice();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.selectedCurrency !== this.props.selectedCurrency) {
      this.getPrice();
    }
  }

  sizeSelect = (attribute) => {
    return (
      <>
        <p style={{ fontSize: 18 }}>{attribute.name}:</p>
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
        <p style={{ fontSize: 18 }}>{attribute.name}:</p>
        <div className="color-box-conteiner">
          {attribute.items.map((el) => {
            return (
              <div
                key={el.id}
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
                ></button>
              </div>
            );
          })}
        </div>
      </>
    );
  };
  selectAttribute = (attribute, name) => {
    this.setState({
      productSelectedAttributes: {
        ...this.state.productSelectedAttributes,
        [`${name}`]: attribute.value,
      },
    });

    this.props.updateCart({
      id: this.props.id,
      productSelectedAttributes: {
        ...this.state.productSelectedAttributes,
        [`${name}`]: attribute.value,
      },
    });
  };

  slideLeft() {
    let indexImage = this.props.gallery.indexOf(this.state.selectedImage);

    if (indexImage)
      this.setState({ selectedImage: this.props.gallery[indexImage - 1] });
  }

  slideRight() {
    let indexImage = this.props.gallery.indexOf(this.state.selectedImage);
    let lastIndexOfGallety = this.props.gallery.length - 1;
    if (lastIndexOfGallety !== indexImage) {
      this.setState({ selectedImage: this.props.gallery[indexImage + 1] });
    }
  }
  render() {
    return (
      <div className="cart-page-conteiner-item">
        <div className="cart-page-detalis">
          <div className="cart-page-product-name">
            <p>{this.props.brand}</p>
            <p>{this.props.name}</p>
          </div>
          <div className="cart-page-product-price">
            {this.state.symbol}
            {(this.state.price * this.props.amount).toFixed(2)}
          </div>
          <div className="cart-page-product-attributes">
            {this.props.attributes.map((el) => {
              return (
                <div key={el.id} className={`product-cart-page-att`}>
                  {el.id === "Color"
                    ? this.colorSelect(el)
                    : this.sizeSelect(el)}
                </div>
              );
            })}
          </div>
        </div>
        <div className="cart-page-amount-image-conteiner">
          <div className="cart-page-product-amount">
            <button
              onClick={() =>
                this.props.increaseAmountItem({
                  ...this.props,
                  productSelectedAttributes:
                    this.state.productSelectedAttributes,
                })
              }
            >
              +
            </button>
            <p>{this.props.amount}</p>
            <button
              onClick={() =>
                this.props.decreaseAmountItem({
                  ...this.props,
                  productSelectedAttributes:
                    this.state.productSelectedAttributes,
                })
              }
            >
              -
            </button>
          </div>
          <div className="cart-page-product-image">
            <img src={this.state.selectedImage} alt="product"></img>
            {this.props.gallery.length > 1 && (
              <>
                {this.props.gallery.indexOf(this.state.selectedImage) > 0 &&
                this.props.gallery.indexOf(this.state.selectedImage) <
                  this.props.gallery.length - 1 ? (
                  <>
                    <button
                      onClick={() => this.slideRight()}
                      className="slide-right slider"
                    >
                      &gt;
                    </button>
                    <button
                      onClick={() => this.slideLeft()}
                      className="slide-left slider"
                    >
                      &lt;
                    </button>
                  </>
                ) : (
                  <>
                    {this.props.gallery.indexOf(this.state.selectedImage) ===
                      0 && (
                      <button
                        onClick={() => this.slideRight()}
                        className="slide-right slider"
                      >
                        &gt;
                      </button>
                    )}
                    {this.props.gallery.indexOf(this.state.selectedImage) ===
                      this.props.gallery.length - 1 && (
                      <button
                        onClick={() => this.slideLeft()}
                        className="slide-left slider"
                      >
                        &lt;
                      </button>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}
