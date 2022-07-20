import React from 'react';
import PropTypes from 'prop-types';
import GeneralInfo from './overview/product_info/GeneralInfo.jsx';
import ImageGallery from './overview/image_gallery/ImageGallery.jsx';
import Slogan from './overview/product_info/Slogan.jsx';
import StyleSelector from './overview/product_info/StyleSelector.jsx';
import Cart from './overview/cart/Cart.jsx';
import SocialsSharing from './overview/product_info/SocialsSharing.jsx';
import StarRating from './shared/star/StarRating.jsx';
import getAvgReviews from './shared/reviews/getAvgReviews.js';

function Overview({
  reviews, product, styles, selectedStyleId, setSelectedStyleId,
}) {
  if (!(product && styles && reviews)) {
    return <code>loading...</code>;
  }
  return (
    <>
      <ImageGallery
        style={styles.results[selectedStyleId]}
      />
      <StarRating
        averageRating={getAvgReviews(reviews)}
      />
      <GeneralInfo
        product={product}
        style={styles.results[selectedStyleId]}
      />
      <SocialsSharing />
      <StyleSelector
        styles={styles}
        selectedStyleId={selectedStyleId}
        setSelectedStyleId={setSelectedStyleId}
      />
      <Cart
        style={styles.results[selectedStyleId]}
      />
      <Slogan
        product={product}
      />
    </>
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
