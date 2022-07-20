import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled('div')`
  width: calc(100% - 400px);
`;

function Slogan({ product }) {
  return (
    <Container>
      {product.slogan && <h3>{product.slogan}</h3>}
      {product.description && <p>{product.description}</p>}
    </Container>
  );
}

Slogan.propTypes = {
  product: PropTypes.shape({
    slogan: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default Slogan;
