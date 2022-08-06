import { gql } from "@apollo/client";

export const LOAD_ALL_PRODUCTS = gql`
  query {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes{
            id
            name
        }
        
        brand
      }
    }
  }
`;

export const LOAD_PRODUCTS_OF_CATEGOTY = gql`
  query ($title : String!){
    category(input: { title: $title }) {
      products {
        id
        name
      }
    }
  }
`;


export const LOAD_PRODUCT = gql`
query ($id:String!) {
    product(id:$id) {
          name
    }
  }
  
`;
