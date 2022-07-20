import React from 'react';
import styled from 'styled-components';
import GeneralInfo from './overview/product_info/GeneralInfo.jsx';
import ImageGallery from './overview/image_gallery/ImageGallery.jsx';
import Slogan from './overview/product_info/Slogan.jsx';
import StyleSelector from './overview/product_info/StyleSelector.jsx';
import Cart from './overview/cart/Cart.jsx';
import SocialsSharing from './overview/product_info/SocialsSharing.jsx';
import StarRating from './shared/star/StarRating.jsx';

import {
  // eslint-disable-next-line no-unused-vars
  product, styleAllInStock, styleNoneInStock, styles,
} from './overview/exampledata.js';

const Container = styled('div')`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

const ImageGalleryGridContainer = styled('div')`
  grid-column: 1;
  grid-row: 1;
`;

const ProductInfoGridContainer = styled('div')`
  grid-column: 2;
  grid-row: 1;
  padding-left: 20px;
`;

const SloganGridContainer = styled('div')`
  grid-column: 1 / span 2;
  grid-row: 2;
  display: flex;
  justify-content: center;
`;

function Overview() {
  return (
    <Container>
      <ImageGalleryGridContainer>
        <ImageGallery
          style={styleAllInStock}
        />
      </ImageGalleryGridContainer>
      <ProductInfoGridContainer>
        <StarRating
          averageRating={4.2}
        />
        <GeneralInfo
          product={product}
          style={styleAllInStock}
        />
        <StyleSelector
          styles={styles}
        />
        <Cart
          style={styleAllInStock}
        />
        <SocialsSharing />
      </ProductInfoGridContainer>
      <SloganGridContainer>
        <Slogan
          product={product}
        />
      </SloganGridContainer>
    </Container>
  );
}

export default Overview;
