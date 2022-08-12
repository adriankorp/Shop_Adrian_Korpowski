import React, { Component } from "react";
import "./Navbar.css";
import withContext from "../../withContext";
import { client } from "../../index";
import { LOAD_CURRENCIES } from "../../GraphQL/Queries";
import { Link } from "react-router-dom";
import CartModal from "../CartModal/CartModal";
class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clickedCategory: "",
      categories: ["all", "tech", "clothes"],
      currency: [],
      show: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    console.log("Curenncy Selected!!");

    this.props.context.changeCurrency(e.target.value);
  }

  showModal = (e) => {
    this.setState({
      show: !this.state.show,
    });
  };

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

  componentDidMount() {
    let categoryName = window.location.pathname.split("/")[2];
    this.props.context.loadCategory(categoryName)
    client
      .query({
        query: LOAD_CURRENCIES,
      })
      .then((res) => this.setState({ currency: [...res.data.currencies] }));
  }
  render() {
    return (
      <div className="navbar-conteiner">
        <div className="categories-conteiner">
          {this.state.categories.map((cat) => {
            return (
              <div
                key={cat}
                className={
                  this.state.clickedCategory === cat
                    ? "btn-navbar active"
                    : "btn-navbar"
                }
              >
                <Link
                  to={`/category/${cat}`}
                  onClick={() => {
                    this.props.context.loadCategory(cat);
                    this.setState({ clickedCategory: cat });
                  }}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  {cat}
                </Link>
              </div>
            );
          })}
        </div>
        <div className="cart-curenncy-conteiner">
          <select
            name="currencies"
            id="currencies"
            onChange={this.handleChange}
          >
            {this.state.currency.map((el) => {
              return (
                <option key={el.label} value={el.symbol}>
                  {el.symbol} {el.label}
                </option>
              );
            })}
          </select>
          <div className="cart">
            <button
              className="cart-button"
              onClick={(e) => {
                this.showModal(e);
              }}
            >
              {this.getNumberCartItems() > 0 ? (
                <label>{this.getNumberCartItems()}</label>
              ) : (
                <></>
              )}
            </button>
            {<CartModal onClose={this.showModal} show={this.state.show} />}
          </div>
        </div>
      </div>
    );
  }
}

export default withContext(Navbar);
