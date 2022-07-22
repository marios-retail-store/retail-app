import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BoldSubHeading, Paragraph } from '../../shared/styles.js';

const Container = styled('div')`
  min-width: calc(100% - 600px);
  max-width: 600px;
  text-align: center;
`;

const BoldSubHeadingSpacing = styled(BoldSubHeading)`
  margin: 20px 0;
`;

function Slogan({ product }) {
  return (
    <Container>
      {product.slogan && <BoldSubHeadingSpacing>{product.slogan}</BoldSubHeadingSpacing>}
      {product.description && <Paragraph>{product.description}</Paragraph>}
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
