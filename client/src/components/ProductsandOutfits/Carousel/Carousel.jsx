import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProductCards from '../ProductCards/ProductCards.jsx';

const addCard = {
  product: { name: 'Add to Outfit' },
  style: { style_id: 999999, name: 'add', photos: [{ url: 'https://cdn.vectorstock.com/i/preview-1x/24/78/gray-add-plus-icon-isolated-on-background-modern-vector-21462478.webp' }] },
};
function Carousel({
  products, styles, type, actionBtnFunc,
}) {
  const carouselCardStyle = {
    overflow: 'hidden',
  };

  const buttonStyle = {
    position: 'relative',
    top: '-290px',
  };

  const [current, setCurrent] = useState(0);
  const { length } = products;
  const cardAmount = type === 'outfit' ? length - 3 : length - 2;
  // debugger;
  const translateAmt = `translateX(-${current * 35}%)`;
  const containerStyle = {
    whiteSpace: 'nowrap',
    transition: '0.6s',
    transform: translateAmt,
  };
  const next = () => {
    setCurrent(current + cardAmount <= length ? current + 1 : current);
  };
  const prev = () => {
    setCurrent(current > 0 ? current - 1 : current);
  };
  const onClickButtonHandler = (e, cardIndex, cardData) => {
    e.stopPropagation();
    actionBtnFunc(cardIndex, cardData);
  };
  return (
    <div className="carousel" data-testid="Carousel" style={carouselCardStyle}>
      <div className="container" data-testid="Container" style={containerStyle}>

        {type === 'outfit' && <ProductCards card={addCard.product} style={addCard.style} actionButton={() => console.log('outfit action button clicked')} clickFunc={() => console.log('hi')} />}
        {products.map((p, i) => {
          const filter = styles[i].results.filter((style) => style['default?'] === true);
          const style = filter.length ? filter[0] : styles[i].results[0];
          return (
            <ProductCards key={style.style_id} card={p} style={style} actionButton={(e) => onClickButtonHandler(e, i, p)} clickFunc={(card) => console.log('cardClicked\n', 'ProductData:', card, '\nStyleData:', style)} />
          );
        })}
      </div>
      <button
        data-testid="leftButton"
        className="button-left"
        type="button"
        onClick={prev}
        style={({
          ...buttonStyle, float: 'left', left: '15px', visibility: current === 0 ? 'hidden' : 'visible',
        })}
      >
        {'<'}
      </button>
      <button
        data-testid="rightButton"
        className="button-right"
        type="button"
        onClick={next}
        style={({
          ...buttonStyle, float: 'right', right: '15px', visibility: current + cardAmount > length || window.screen.width > length * 300 ? 'hidden' : 'visible',
        })}
      >
        {'>'}
      </button>
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
  actionBtnFunc: PropTypes.func.isRequired,
};
export default Carousel;
