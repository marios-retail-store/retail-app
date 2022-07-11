import React from 'react';
import PropTypes from 'prop-types';

function Slogan({ product }) {
  return (
    <>
      {product.slogan && <h3>{product.slogan}</h3>}
      {product.description && <p>{product.description}</p>}
    </>
  );
}

Slogan.propTypes = {
  product: PropTypes.shape({
    slogan: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default Slogan;
