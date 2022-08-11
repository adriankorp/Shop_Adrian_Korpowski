import React, { Component } from "react";
import withContext from "../../withContext";
import ProductCard from "../ProductCard/ProductCard";

class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div className="product-list">
        {this.props.context.products.map((el) => {
          return <ProductCard key={el.id} {...el} />;
        })}
      </div>
    );
  }
}

export default withContext(ProductList);
