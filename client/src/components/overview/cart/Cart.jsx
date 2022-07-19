/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import _ from 'underscore';
import AddToCart from './AddToCart.jsx';
import getStockArrayFromStyle from './getStockArrayFromStyle.js';
import CustomDropdown from './CustomDropdown.jsx';

const ErrorMsg = styled('small')`
  color: red;
`;

function Cart({ style }) {
  const stock = getStockArrayFromStyle(style);

  const [selectedSKU, setSelectedSKU] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState('-');
  const [sizeDropdownIsOpen, setSizeDropdownIsOpen] = useState(false);
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
      setSizeDropdownIsOpen(true);
      setShowSizeError(true);
      return;
    }
    if (showSizeError) {
      setShowSizeError(false);
    }
    for (let i = 0; i < selectedQuantity; i += 1) {
      axios({
        url: '/cart',
        method: 'post',
        data: { sku_id: selectedSKU.sku_id },
      })
        .catch((err) => {
          console.error('failed adding item to cart:', err);
        });
    }
  };

  let quantityDropdownOptions = [];
  if (selectedSKU !== null) {
    quantityDropdownOptions = _.range(1, Math.min(15, selectedSKU.quantity) + 1);
    quantityDropdownOptions = quantityDropdownOptions.map((e) => e.toString());
  }

  let sizeDropdownDisplayedText;
  if (selectedSKU === null) {
    sizeDropdownDisplayedText = stock.length !== 0 ? 'SELECT SIZE' : 'OUT OF STOCK';
  } else {
    sizeDropdownDisplayedText = selectedSKU.size;
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
        customOpen={sizeDropdownIsOpen}
        customSetOpen={setSizeDropdownIsOpen}
        customSelected={sizeDropdownDisplayedText}
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

Cart.propTypes = {
  style: PropTypes.shape({
    skus: PropTypes.objectOf(
      PropTypes.objectOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ])),
    ).isRequired,
  }).isRequired,
};

export default Cart;
