import React from 'react';
import PropTypes from 'prop-types';
import GeneralInfo from './overview/product_info/GeneralInfo.jsx';
import ImageGallery from './overview/image_gallery/ImageGallery.jsx';
import Slogan from './overview/product_info/Slogan.jsx';
import StyleSelector from './overview/product_info/StyleSelector.jsx';
import Cart from './overview/cart/Cart.jsx';

function Overview({ product, styles, style }) {
  return (
    <>
      <ImageGallery
        style={style}
      />
      <GeneralInfo
        product={product}
        style={style}
      />
      <StyleSelector
        styles={styles}
      />
      <Cart
        style={style}
      />
      <Slogan
        product={product}
      />
    </>
  );
}

Overview.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    slogan: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  styles: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      photos: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string,
        thumbnail_url: PropTypes.string,
      })).isRequired,
    })).isRequired,
  }).isRequired,
  style: PropTypes.shape({
    skus: PropTypes.objectOf(
      PropTypes.objectOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ])),
    ).isRequired,
    original_price: PropTypes.string.isRequired,
    sale_price: PropTypes.string,
    photos: PropTypes.arrayOf(PropTypes.shape({
      thumbnail_url: PropTypes.string,
      url: PropTypes.string,
    })).isRequired,
  }).isRequired,
};

export default Overview;
