import React from 'react'
import { useQuery, gql } from '@apollo/client';
import { LOAD_ALL_PRODUCTS } from '../GraphQL/Queries';


function ProductCard() {
    const { loading, error, data } = useQuery(LOAD_ALL_PRODUCTS);

  return (
    
    <div>{console.log(data)}</div>
  )
}

export default ProductCard