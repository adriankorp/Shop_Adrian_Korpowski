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
        attributes {
          id
          name
        }

        brand
      }
    }
  }
`;

export const LOAD_PRODUCTS_OF_CATEGOTY = gql`
  query ($title: String!) {
    category(input: { title: $title }) {
      products {
        id
        name
        gallery
        inStock
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

export const LOAD_PRODUCT = gql`
  query ($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`;

export const LOAD_CURRENCIES = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;
