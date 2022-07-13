import React from 'react';
// eslint-disable-next-line no-unused-vars
import ProductCards from './ProductsandOutfits/ProductCards/ProductCards.jsx';
// eslint-disable-next-line no-unused-vars
import { products, pStyles } from './ProductsandOutfits/exampleData.js';
import Carousel from './ProductsandOutfits/Carousel/Carousel.jsx';

function ProductsAndOutfits() {
  // dupe jogger style (goldenRod), so that i can test card height with a sale active
  const SaleTestStyle = [{ product_id: '40346', results: [pStyles[pStyles.findIndex((style) => style.product_id === '40346')].results.find((result) => result.style_id === 240512)] }];
  return (
    <>
      <p>ProductsAndOutfits</p>
      <Carousel
        moveLeft={(event) => console.log('Move Left Clicked\n', 'EventTarget:', event.target)}
        moveRight={(event) => console.log('Move Right Clicked\n', 'EventTarget:', event.target)}
        products={[products[pStyles.findIndex((style) => style.product_id === '40346')]].concat(products)}
        styles={SaleTestStyle.concat(pStyles)}
      />
    </>
  );
}

export default ProductsAndOutfits;
