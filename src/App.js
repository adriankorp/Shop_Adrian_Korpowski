import { Routes, Route, Link, BrowserRouter as Router } from "react-router-dom";
import { client } from "./index";
import "./App.css";
import React, { Component } from "react";
import Context from "./Context";
import {
  LOAD_ALL_PRODUCTS,
  LOAD_CATEGOTY,
  LOAD_PRODUCT,
  LOAD_PRODUCTS_OF_CATEGOTY,
} from "./GraphQL/Queries";
import ProductCard from "./components/ProductCard/ProductCard";
import Navbar from "./components/Navbar/Navbar";
import ProductPage from "./components/ProductPage/ProductPage";
import ProductList from "./components/ProductList/ProductList";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: {},
      products: [],
      selectedCurrency: "$",
    };
  }

  changeCurrency = (currencySymbol) => {
    this.setState({ selectedCurrency: currencySymbol });
  };

  loadCategory = (category) => {
    client
      .query({
        query: LOAD_PRODUCTS_OF_CATEGOTY,
        variables: { title: category },
      })
      .then((res) =>
        this.setState({ products: [...res.data.category.products] })
      );
  };

  addToCart = (cartItem) => {
    let cart = this.state.cart;
    if (cart[cartItem.id]) {
      cart[cartItem.id].amount += 1;

    } else {
      cart[cartItem.id] = cartItem;
      cart[cartItem.id].amount = 1
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  removeFromCart = (cartItemId) => {
    let cart = this.state.cart;
    delete cart[cartItemId];
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  clearCart = () => {
    let cart = {};
    localStorage.removeItem("cart");
    this.setState({ cart });
  };

  componentDidMount() {
    let cart = localStorage.getItem("cart");
    cart = cart ? JSON.parse(cart) : {};
    this.setState({ cart: cart });
  }

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          changeCurrency: this.changeCurrency,
          loadCategory: this.loadCategory,
          removeFromCart: this.removeFromCart,
          addToCart: this.addToCart,
          login: this.login,
          addProduct: this.addProduct,
          clearCart: this.clearCart,
          checkout: this.checkout,
        }}
      >
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<ProductList />} />

            <Route exact path="/product/:id" element={<ProductPage />} />
          </Routes>
        </Router>
      </Context.Provider>
    );
  }
}
