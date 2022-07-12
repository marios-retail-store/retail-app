import React from 'react';
import PropTypes from 'prop-types';

function AddToCart({ submitAddToCart }) {
  return (
    <button
      type="button"
      onClick={submitAddToCart}
    >
      Add to Cart
    </button>
  );
}

AddToCart.propTypes = {
  submitAddToCart: PropTypes.func.isRequired,
};

export default AddToCart;
