import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BoldSubHeading } from '../../shared/styles.js';

const StyledButton = styled('button')`
  margin: 15px 0;
  grid-column: 1 / span 2;
  user-select: none;
  height: 50px;
  width: auto;
  padding-left: 15px;
  background-color: #EAF6F6;
  border: 1px solid black;
  text-align: left;
  &:hover {
    background-color: #cff0f0;
  }
  &:active {
    background-color: #b6e7e7;
  }
`;

function AddToCart({ submitAddToCart }) {
  return (
    <StyledButton
      type="button"
      onClick={(e) => {
        submitAddToCart();
        // so that dropdown can open upon clicking add with no size selected
        e.stopPropagation();
      }}
    >
      <BoldSubHeading>Add to Cart</BoldSubHeading>
    </StyledButton>
  );
}

AddToCart.propTypes = {
  submitAddToCart: PropTypes.func.isRequired,
};

export default AddToCart;
