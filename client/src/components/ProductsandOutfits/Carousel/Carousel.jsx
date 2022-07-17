import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProductCards from '../ProductCards/ProductCards.jsx';

const addCard = {
  product: { name: 'Add to Outfit' },
  style: { style_id: 999999, name: 'add', photos: [{ url: 'https://cdn.vectorstock.com/i/preview-1x/24/78/gray-add-plus-icon-isolated-on-background-modern-vector-21462478.webp' }] },
};
function Carousel({
  products, styles, type,
}) {
  const carouselCardStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-end',
  };
  const buttonStyle = {
    alignSelf: 'center',
    position: 'relative',
  };

  const [current, setCurrent] = useState(0);
  const { length } = products;
  const cardAmount = type === 'related' ? 3 : 2;
  const next = () => {
    setCurrent(current < length ? current + 1 : current);
  };
  const prev = () => {
    setCurrent(current > 0 ? current - 1 : current);
  };
  return (
    <div className="carousel" data-testid="Carousel" style={carouselCardStyle}>
      <button className="button-left" type="button" onClick={prev} style={({ ...buttonStyle, left: '2%', visibility: current === 0 ? 'hidden' : 'visible' })}>{'<'}</button>
      {type === 'outfit' && <ProductCards card={addCard.product} style={addCard.style} clickFunc={() => console.log('hi')} />}
      {products.map((p, i) => {
        const filter = styles[i].results.filter((style) => style['default?'] === true);
        const style = filter.length ? filter[0] : styles[i].results[0];
        const isVisible = (i >= current && i < current + cardAmount);
        return (
          <div className="Card" style={{ contentVisibility: isVisible ? 'visible' : 'hidden' }} key={style.style_id}>
            <ProductCards key={style.style_id} card={p} style={style} clickFunc={(card) => console.log('cardClicked\n', 'ProductData:', card, '\nStyleData:', style)} />
          </div>
        );
      })}
      <button className="button-right" type="button" onClick={next} style={({ ...buttonStyle, right: '2%', visibility: current + cardAmount >= length ? 'hidden' : 'visible' })}>{'>'}</button>
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
  type: PropTypes.string.isRequired,
};
export default Carousel;
