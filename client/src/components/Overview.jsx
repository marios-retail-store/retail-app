import React from 'react';
import GeneralInfo from './overview/product_info/GeneralInfo.jsx';
import Slogan from './overview/product_info/Slogan.jsx';
import Cart from './overview/cart/Cart.jsx';
// eslint-disable-next-line no-unused-vars
import { product, styleAllInStock, styleNoneInStock } from './overview/exampledata.js';

function Overview() {
  return (
    <>
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
