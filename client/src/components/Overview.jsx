import React from 'react';
import GeneralInfo from './overview/product_info/GeneralInfo.jsx';
import Slogan from './overview/product_info/Slogan.jsx';
import { product, style } from './overview/exampledata.js';

function Overview() {
  return (
    <>
      <GeneralInfo
        product={product}
        style={style}
      />
      <Slogan
        product={product}
      />
    </>
  );
}

export default Overview;
