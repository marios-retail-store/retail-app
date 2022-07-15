import React from 'react';
import PropTypes from 'prop-types';

function AddToCart({ submitAddToCart }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        submitAddToCart();
        // so that dropdown can open upon clicking add with no size selected
        e.stopPropagation();
      }}
    >
      Add to Cart
    </button>
  );
}

AddToCart.propTypes = {
  submitAddToCart: PropTypes.func.isRequired,
};

export default AddToCart;
