import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import GeneralInfo from './overview/product_info/GeneralInfo.jsx';
import ImageGallery from './overview/image_gallery/ImageGallery.jsx';
import Slogan from './overview/product_info/Slogan.jsx';
import StyleSelector from './overview/product_info/StyleSelector.jsx';
import Cart from './overview/cart/Cart.jsx';
import SocialsSharing from './overview/product_info/SocialsSharing.jsx';
import StarRating from './shared/star/StarRating.jsx';
import getAvgReviews from './shared/reviews/getAvgReviews.js';

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

function Overview({
  reviews, product, styles, selectedStyleId, setSelectedStyleId,
}) {
  // if (!(product && styles && reviews)) {
  //   return <code>loading...</code>;
  // }

  return (
    <Container>
      <ImageGalleryGridContainer>
        {styles && (
          <ImageGallery
            style={styles.results[selectedStyleId]}
          />
        )}
      </ImageGalleryGridContainer>
      <ProductInfoGridContainer>
        <ProductInfoContent>
          {reviews && (
            <StarRating
              averageRating={getAvgReviews(reviews)}
            />
          )}
          {product && styles && (
            <GeneralInfo
              product={product}
              style={styles.results[selectedStyleId]}
            />
          )}
          {styles && (
            <StyleSelector
              styles={styles}
              selectedStyleId={selectedStyleId}
              setSelectedStyleId={setSelectedStyleId}
            />
          )}
          {styles && (
            <Cart
              style={styles.results[selectedStyleId]}
            />
          )}
        </ProductInfoContent>
        <ProductInfoFooter>
          <SocialsSharing />
        </ProductInfoFooter>
      </ProductInfoGridContainer>
      <SloganGridContainer>
        {product && (
          <Slogan
            product={product}
          />
        )}
      </SloganGridContainer>
    </Container>
  );
}

Overview.propTypes = {
  reviews: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.shape({
      rating: PropTypes.number.isRequired,
    })).isRequired,
  }),
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    slogan: PropTypes.string,
    description: PropTypes.string,
  }),
  styles: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      photos: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string,
        thumbnail_url: PropTypes.string,
      })).isRequired,
    })).isRequired,
  }),
  selectedStyleId: PropTypes.number.isRequired,
  setSelectedStyleId: PropTypes.func.isRequired,
};

Overview.defaultProps = {
  reviews: undefined,
  product: undefined,
  styles: undefined,
};

export default Overview;
