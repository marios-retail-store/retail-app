/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';
import _ from 'underscore';
import AddToCart from './AddToCart.jsx';
import { style, noStockStyle } from '../exampledata.js';
import getStockArrayFromStyle from './getStockArrayFromStyle.js';
import CustomDropdown from './CustomDropdown.jsx';

const ErrorMsg = styled('small')`
  color: red;
`;

function Cart() {
  // transforms style's skus into sorted array of {size, quantity, sku_id} objects, where quant > 0
  // const stock = getStockArrayFromStyle(noStockStyle);
  const stock = getStockArrayFromStyle(style);

  const [selectedSKU, setSelectedSKU] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState('-');
  const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false);
  const [showSizeError, setShowSizeError] = useState(false);

  const setSelectedSKUWrapper = (size) => {
    // when selected the first size,
    // quantity is to be set to 1 at the same time
    if (selectedSKU === null) {
      setSelectedQuantity('1');
    }
    const sku = stock[stock.map((item) => item.size).indexOf(size)];
    setSelectedSKU(sku);
  };

  const submitAddToCart = () => {
    if (selectedSKU === null) {
      setSizeDropdownOpen(true);
      setShowSizeError(true);
      return;
    }
    if (showSizeError) {
      setShowSizeError(false);
    }
    console.log(`API call to add ${selectedQuantity} of ${selectedSKU.size} to cart!`);
  };

  let quantityDropdownOptions = [];
  if (selectedSKU !== null) {
    quantityDropdownOptions = _.range(1, Math.min(15, selectedSKU.quantity) + 1);
    quantityDropdownOptions = quantityDropdownOptions.map((e) => e.toString());
  }

  let sizeDropdownDisplay;
  if (selectedSKU === null) {
    sizeDropdownDisplay = stock.length !== 0 ? 'SELECT SIZE' : 'OUT OF STOCK';
  } else {
    sizeDropdownDisplay = selectedSKU.size;
  }

  return (
    <div>
      {showSizeError && <ErrorMsg>please select size</ErrorMsg>}
      <CustomDropdown
        className="size-dropdown"
        options={stock.map((item) => item.size)}
        width={150}
        height={30}
        disabled={stock.length === 0}
        customOpen={sizeDropdownOpen}
        customSetOpen={setSizeDropdownOpen}
        customSelected={sizeDropdownDisplay}
        customSetSelected={setSelectedSKUWrapper}
      />
      {/* <QuantityDropdown   remember to block this button if no size chosen /> */}
      <CustomDropdown
        className="quantity-dropdown"
        options={quantityDropdownOptions}
        width={150}
        height={30}
        disabled={selectedSKU === null}
        customSelected={selectedQuantity}
        customSetSelected={setSelectedQuantity}
      />
      {stock.length !== 0 && (
        <AddToCart
          submitAddToCart={submitAddToCart}
        />
      )}
    </div>
  );
}

export default Cart;
