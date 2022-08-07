import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import { client } from "./index";
import "./App.css";
import { Component } from "react";
import Context from "./Context";
import {
  LOAD_ALL_PRODUCTS,
  LOAD_CATEGOTY,
  LOAD_PRODUCT,
  LOAD_PRODUCTS_OF_CATEGOTY,
} from "./GraphQL/Queries";
import ProductCard from "./components/ProductCard/ProductCard";
import Navbar from "./components/Navbar/Navbar";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: {},
      products: [],
      selectedCurrency:'$'
    };
  }

  changeCurrency = currencySymbol => {
    this.setState({selectedCurrency: currencySymbol})
  }

  loadCategory = category => {
    client.query({
      query: LOAD_PRODUCTS_OF_CATEGOTY,
      variables: { title: category },
    }).then((res) => this.setState({products: [...res.data.category.products]}))

  }


  componentDidMount() {
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
        <>
          <Navbar></Navbar>
          <div className="product-list">
            {this.state.products.map((el)=>{
              return <ProductCard key={el.id} {...el}/>
            })}
          </div>
        </>
      </Context.Provider>
    );
  }
}
