import React from 'react';
import GeneralInfo from './overview/product_info/GeneralInfo.jsx';
import ImageGallery from './overview/image_gallery/ImageGallery.jsx';
import Slogan from './overview/product_info/Slogan.jsx';
import StyleSelector from './overview/product_info/StyleSelector.jsx';
import Cart from './overview/cart/Cart.jsx';
import SocialsSharing from './overview/product_info/SocialsSharing.jsx';
import {
  // eslint-disable-next-line no-unused-vars
  product, styleAllInStock, styleNoneInStock, styles,
} from './overview/exampledata.js';

function Overview() {
  return (
    <>
      <ImageGallery
        style={styleAllInStock}
      />
      <GeneralInfo
        product={product}
        style={styleAllInStock}
      />
      <SocialsSharing />
      <StyleSelector
        styles={styles}
      />
      <Cart
        style={styleAllInStock}
      />
      <Slogan
        product={product}
      />
    </>
  );
}

export default Overview;
