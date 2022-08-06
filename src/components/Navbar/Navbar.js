import React, { Component } from "react";
import "./Navbar.css";

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clickedCategory: "",
    };
  }

  render() {
    return (
      <div className="navbar-conteiner">
        <div className="categories-conteiner">
          <button
            id="all"
            className={this.state.clickedCategory === "all" ? "active" : ""}
            onClick={() => {
              this.setState({ clickedCategory: "all" });
            }}
          >
            All
          </button>
          <button
            id="tech"
            className={this.state.clickedCategory === "tech" ? "active" : ""}
            onClick={() => {
              this.setState({ clickedCategory: "tech" });
            }}
          >
            Tech
          </button>
          <button
            id="clothes"
            className={this.state.clickedCategory === "clothes" ? "active" : ""}
            onClick={() => {
              this.setState({ clickedCategory: "clothes" });
            }}
          >
            Clothes
          </button>
        </div>
        <div className="cart-curenncy-conteiner"></div>
      </div>
    );
  }
}
