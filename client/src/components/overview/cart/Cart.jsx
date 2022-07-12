/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';
import AddToCart from './AddToCart.jsx';
import { style } from '../exampledata.js';
import getStockArrayFromStyle from './getStockArrayFromStyle.js';

const ErrorMsg = styled('small')`
  color: red;
`;

function Cart() {
  // transforms style's skus into array of [size, quantity] tuples, where quant > 0
  const stock = getStockArrayFromStyle(style);

  const [selectedSize, setSelectedSize] = useState(null);
  // when changing size from null, set quantity to 1 at the same time to not have 2 renders
  const [selectedQuantity, setSelectedQuantity] = useState(null);
  const [showSizeError, setShowSizeError] = useState(false);

  const submitAddToCart = () => {
    console.log('trying submitting...');
    // if no size is selected
    if (selectedSize === null) {
      // open dropdown
      // show 'please select size' text above dropdown
      setShowSizeError(true);
    } else {
      console.log('submitting to cart!');
    }
  };

  return (
    <div>
      {showSizeError && <ErrorMsg>please select size</ErrorMsg>}
      {/* <SizeDropdown />   remember to block this button if no sizes avail  */}
      {/* <QuantityDropdown   remember to block this button if no size chosen /> */}
      {stock.length !== 0 && (
        <AddToCart
          submitAddToCart={submitAddToCart}
        />
      )}
    </div>
  );
}

export default Cart;
