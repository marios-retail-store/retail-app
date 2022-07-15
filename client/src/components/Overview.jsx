import React, { useState } from 'react';
import GeneralInfo from './overview/product_info/GeneralInfo.jsx';
import CustomDropdown from './overview/custom_dropdown/CustomDropdown.jsx';
import ImageGallery from './overview/image_gallery/ImageGallery.jsx';
import Slogan from './overview/product_info/Slogan.jsx';
import Cart from './overview/cart/Cart.jsx';
// eslint-disable-next-line no-unused-vars
import { product, styleAllInStock, styleNoneInStock } from './overview/exampledata.js';

function Overview() {
  return (
    <>
      <ImageGallery
        style={currentStyle}
      />
      <GeneralInfo
        product={product}
        style={styleAllInStock}
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
