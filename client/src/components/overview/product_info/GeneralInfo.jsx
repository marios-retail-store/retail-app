import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SaleText = styled('small')`
  color: red;
  margin-right: 1em;
`;

const StrikeThroughText = styled('small')`
  text-decoration: line-through;
`;

function GeneralInfo({ product, style }) {
  let price;
  if (style.sale_price === null) {
    price = <small>{`$${style.original_price}`}</small>;
  } else {
    price = (
      <>
        <SaleText>{`$${style.sale_price}`}</SaleText>
        <StrikeThroughText>{`$${style.original_price}`}</StrikeThroughText>
      </>
    );
  }

  return (
    <>
      <h4>{product.category}</h4>
      <h2>{product.name}</h2>
      <small>{price}</small>
    </>
  );
}

GeneralInfo.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  style: PropTypes.shape({
    original_price: PropTypes.string.isRequired,
    sale_price: PropTypes.string,
  }).isRequired,
};

export default GeneralInfo;
