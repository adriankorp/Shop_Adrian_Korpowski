import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { client } from "./index";
import "./App.css";
import React, { Component } from "react";
import Context from "./Context";
import {
  LOAD_PRODUCTS_OF_CATEGOTY,
} from "./GraphQL/Queries";

import Navbar from "./components/Navbar/Navbar";
import ProductPage from "./components/ProductPage/ProductPage";
import ProductList from "./components/ProductList/ProductList";
import CartPage from "./components/CartPage/CartPage";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: {},
      products: [],
      selectedCurrency: "$",
      loadedCategory: "",
    };
  }

  changeCurrency = (currencySymbol) => {
    this.setState({ selectedCurrency: currencySymbol });
  };

  loadCategory = (category) => {
    this.setState({ loadedCategory: category });
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
      if (cart[cartItem.id].attributes) {
        let cartKeys = cart[cartItem.id].productSelectedAttributes;
        let cartAddedItemKeys = cartItem.productSelectedAttributes;
        if (JSON.stringify(cartKeys) === JSON.stringify(cartAddedItemKeys)) {
          cart[cartItem.id].amount += 1;
        } else {
          cart[cartItem.id] = cartItem;
          cart[cartItem.id].amount = 1;
        }
      } else {
        cart[cartItem.id].amount = 1;
      }
    } else {
      cart[cartItem.id] = cartItem;
      cart[cartItem.id].amount = 1;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  updateCart = (cartItem) => {

    let cart = this.state.cart;
    if (cart[cartItem.id]) {
      cart[cartItem.id].productSelectedAttributes = cartItem.productSelectedAttributes;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  increaseAmountItem = (cartItem) => {
    let cart = this.state.cart;

    if (cart[cartItem.id]) {
      cart[cartItem.id].amount += 1;
      if (cart[cartItem.id].attributes) {
        cart[cartItem.id].productSelectedAttributes =
          cartItem.productSelectedAttributes;
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  decreaseAmountItem = (cartItem) => {
    let cart = this.state.cart;

    if (cart[cartItem.id]) {
      if (cart[cartItem.id].amount === 1) {
        delete cart[cartItem.id];
      } else {
        cart[cartItem.id].amount -= 1;
        if (cart[cartItem.id].attributes) {
          cart[cartItem.id].productSelectedAttributes =
            cartItem.productSelectedAttributes;
        }
      }
    }

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
          decreaseAmountItem: this.decreaseAmountItem,
          addToCart: this.addToCart,
          clearCart: this.clearCart,
          increaseAmountItem: this.increaseAmountItem,
          updateCart: this.updateCart,
        }}
      >
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/category/:name" element={<ProductList />} />
            <Route exact path="/cart" element={<CartPage />} />

            <Route exact path="/product/:id" element={<ProductPage />} />
          </Routes>
        </Router>
      </Context.Provider>
    );
  }
}
