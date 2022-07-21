import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Heading, SubHeading } from '../../shared/styles.js';

const SaleText = styled(SubHeading)`
  display: inline;
  color: red;
  margin-right: .8em;
`;

const StrikeThroughText = styled(SubHeading)`
  display: inline;
  text-decoration: line-through;
  opacity: .3;
`;

const PriceContainer = styled('div')`
  margin: 25px 0;
`;

const Container = styled('div')`
  margin-top: 15px;
`;

function GeneralInfo({ product, style }) {
  let price;
  if (style.sale_price === null) {
    price = <SubHeading>{`$${style.original_price}`}</SubHeading>;
  } else {
    price = (
      <>
        <SaleText>{`$${style.sale_price}`}</SaleText>
        <StrikeThroughText>{`$${style.original_price}`}</StrikeThroughText>
      </>
    );
  }

  return (
    <Container>
      <SubHeading>{product.category}</SubHeading>
      <Heading>{product.name}</Heading>
      <PriceContainer>
        {price}
      </PriceContainer>
    </Container>
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
