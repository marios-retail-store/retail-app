import React from 'react';
// eslint-disable-next-line no-unused-vars
import ProductCards from './ProductsandOutfits/ProductCards/ProductCards.jsx';
// eslint-disable-next-line no-unused-vars
import { products, pStyles } from './ProductsandOutfits/exampleData.js';

function ProductsAndOutfits() {
  // var productIndex = pStyles.findIndex(style => style.product_id === '40346');
  // eslint-disable-next-line max-len
  // var productStyleIndex = pStyles[productIndex].results.findIndex(result => result.style_id === 240512);
  return (
    <>
      <p>ProductsAndOutfits</p>
      {/* eslint-disable-next-line max-len */}
      {/* <ProductCards card={products[productIndex]} style={pStyles[productIndex].results[productStyleIndex]}/> */}
      {/* {products.map((p, i) => {
            console.log(p)
            const filter = pStyles[i].results.filter((style) => style['default?'] === true);
            const style = filter.length ? filter[0] : pStyles[i].results[0];
            return <ProductCards key={p.id} card={p} style={style} />;
          })} */}
    </>
  );
}

export default ProductsAndOutfits;
