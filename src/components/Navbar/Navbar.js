import React, { Component } from "react";
import "./Navbar.css";
import Select from "react-select";
import withContext from "../../withContext";
import { client } from "../../index";
import { LOAD_CURRENCIES } from "../../GraphQL/Queries";
class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clickedCategory: "all",
      categories: ["all", "tech", "clothes"],
      currency: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    console.log("Curenncy Selected!!");

    this.props.context.changeCurrency(e.target.value);
  }

  componentDidMount() {
    client
      .query({
        query: LOAD_CURRENCIES,
      })
      .then((res) => this.setState({ currency: [...res.data.currencies] }));
      this.props.context.loadCategory(this.state.clickedCategory)
  }
  render() {
    return (
      <div className="navbar-conteiner">
        <div className="categories-conteiner">
          {this.state.categories.map((cat) => {
            return (
              <button
                key={cat}
                className={this.state.clickedCategory === cat ? "active" : ""}
                onClick={() => {
                  this.props.context.loadCategory(cat)
                  this.setState({ clickedCategory: cat });
                }}
              >
                {cat}
              </button>
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
            <button>
              {Object.keys(this.props.context.cart).length > 0 ? (
                <label>{Object.keys(this.props.context.cart).length}</label>
              ) : (
                <></>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withContext(Navbar);
