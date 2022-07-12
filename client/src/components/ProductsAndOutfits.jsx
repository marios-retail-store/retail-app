import React from 'react';
// eslint-disable-next-line no-unused-vars
import ProductCards from './ProductsandOutfits/ProductCards/ProductCards.jsx';
// eslint-disable-next-line no-unused-vars
import { products, pStyles } from './ProductsandOutfits/exampleData.js';
import Carousel from './Carousel.jsx';

function ProductsAndOutfits() {
  // eslint-disable-next-line max-len
  return (
    <>
      <p>ProductsAndOutfits</p>
      <Carousel
        moveLeft={(event) => console.log('Move Left Clicked\n', 'EventTarget:', event.target)}
        moveRight={(event) => console.log('Move Right Clicked\n', 'EventTarget:', event.target)}
        cards={products.map((p, i) => {
          const filter = pStyles[i].results.filter((style) => style['default?'] === true);
          const style = filter.length ? filter[0] : pStyles[i].results[0];
          return <ProductCards key={p.id} card={p} style={style} clickFunc={(card) => console.log('cardClicked\n', 'data:', card)} />;
        })}
      />
    </>
  );
}

export default ProductsAndOutfits;
