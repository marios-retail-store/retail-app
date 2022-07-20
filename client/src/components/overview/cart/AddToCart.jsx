import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled('button')`
  margin-top: 5px;
  grid-column: 1 / span 2;
  user-select: none;
  height: 30px;
  width: auto;
  padding-left: 10px;
  background-color: white;
  border: 1px solid black;
  text-align: left;
  &:hover {
    background-color: rgb(230, 230, 230);
  }
  &:active {
    background-color: rgb(215, 215, 215);
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
      Add to Cart
    </StyledButton>
  );
}

AddToCart.propTypes = {
  submitAddToCart: PropTypes.func.isRequired,
};

export default AddToCart;
