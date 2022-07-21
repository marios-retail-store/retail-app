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
  margin: 20px auto;
  display: grid;
  grid-template-columns: 3fr 1fr;
  column-gap: 20px;
  row-gap: 20px;
`;

const ImageGalleryGridContainer = styled('div')`
  grid-column: 1;
  grid-row: 1;
`;

const ProductInfoGridContainer = styled('div')`
  grid-column: 2;
  grid-row: 1;
  display: flex;
  flex-direction: column;
`;

const ProductInfoContent = styled('div')`
  flex: 0 1 auto;
`;

const ProductInfoFooter = styled('div')`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: end;
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
        <ProductInfoContent>
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
        </ProductInfoContent>
        <ProductInfoFooter>
          <SocialsSharing />
        </ProductInfoFooter>
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
