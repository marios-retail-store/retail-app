import React from 'react';
import PropTypes from 'prop-types';
import ProductCards from '../ProductCards/ProductCards.jsx';

function Carousel({
  products, styles, moveLeft, moveRight,
}) {
  const carouselCardStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-end',
  };
  const buttonStyle = {
    alignSelf: 'center',
  };
  return (
    <div className="carousel" data-testid="Carousel" style={carouselCardStyle}>
      <button className="button-left" type="button" onClick={moveLeft} style={buttonStyle}>left</button>
      {products.map((p, i) => {
        const filter = styles[i].results.filter((style) => style['default?'] === true);
        const style = filter.length ? filter[0] : styles[i].results[0];
        return <ProductCards key={p.id} card={p} style={style} clickFunc={(card) => console.log('cardClicked\n', 'ProductData:', card, '\nStyleData:', style)} />;
      })}
      <button className="button-right" type="button" onClick={moveRight} style={buttonStyle}>right</button>
    </div>
  );
}
Carousel.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  })).isRequired,

  styles: PropTypes.arrayOf(PropTypes.shape({
    product_id: PropTypes.string.isRequired,
    results: PropTypes.arrayOf(PropTypes.shape({
      style_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      original_price: PropTypes.string.isRequired,
      sale_price: PropTypes.string,
      'default?': PropTypes.bool.isRequired,
      photos: PropTypes.arrayOf(PropTypes.shape({
        thumbnail_url: PropTypes.string,
        url: PropTypes.string,
      })).isRequired,
    })).isRequired,
  })).isRequired,
  moveLeft: PropTypes.func.isRequired,
  moveRight: PropTypes.func.isRequired,
};
export default Carousel;
