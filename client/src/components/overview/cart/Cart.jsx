/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import _ from 'underscore';
import AddToCart from './AddToCart.jsx';
import getStockArrayFromStyle from './getStockArrayFromStyle.js';
import CustomDropdown from './CustomDropdown.jsx';
import { Paragraph } from '../../shared/styles.js';

const ErrorMsgSpacer = styled('div')`
  margin: 10px 0;
  height: 20px;
  display: flex;
  align-items: center;
`;

const ErrorMsg = styled(Paragraph)`
  color: red;
  text-transform: uppercase;
`;

const CartContainer = styled('div')`
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 15px;
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
    if (showSizeError) {
      setShowSizeError(false);
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
    for (let i = 0; i < selectedQuantity; i += 1) {
      axios({
        url: '/api/cart',
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
      <ErrorMsgSpacer>
        {showSizeError && <ErrorMsg>please select a size</ErrorMsg>}
      </ErrorMsgSpacer>
      <CartContainer>
        <CustomDropdown
          className="size-dropdown"
          options={stock.map((item) => item.size)}
          width="100%"
          heightInPx={50}
          disabled={stock.length === 0}
          customOpen={sizeDropdownIsOpen}
          customSetOpen={setSizeDropdownIsOpen}
          customSelected={sizeDropdownDisplayedText}
          customSetSelected={setSelectedSKUWrapper}
        />
        <CustomDropdown
          className="quantity-dropdown"
          options={quantityDropdownOptions}
          width="100%"
          heightInPx={50}
          disabled={selectedSKU === null}
          customSelected={selectedQuantity}
          customSetSelected={setSelectedQuantity}
        />
        {stock.length !== 0 && (
          <AddToCart
            submitAddToCart={submitAddToCart}
          />
        )}
      </CartContainer>
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
