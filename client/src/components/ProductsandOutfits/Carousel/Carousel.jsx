import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ProductCards from '../ProductCards/ProductCards.jsx';
import Star from '../../shared/star/Star.jsx';

const CarouselParent = styled('div')`
  overflow: hidden;
  margin-left: 3%;
  margin-right: 3%;
  `;
const Container = styled('div')`
    white-space: nowrap;
    transition: 0.6s;
  `;
const ButtonPreset = styled('div')`
    position: relative;
    top: -290px;
    color:aqua;
    cursor:pointer;
    font-weight:bold;
  `;

const NewStar = styled(Star)`
    position: relative;
    top: -290px;
    padding: 0px !important;
  `;

const addCard = {
  product: { name: 'Add to Outfit' },
  style: { style_id: 999999, name: 'add', photos: [{ url: 'https://cdn.vectorstock.com/i/preview-1x/24/78/gray-add-plus-icon-isolated-on-background-modern-vector-21462478.webp' }] },
};

function Carousel({
  products, styles, type, actionBtnFunc, addToOutfit, ratings,
}) {
  const [current, setCurrent] = useState(0);
  const { length } = products;
  const cardAmount = type === 'outfit' ? (Math.floor(window.innerWidth / 332)) - 1 : (Math.floor(window.innerWidth / 332));
  const translateAmt = `translateX(-${current + cardAmount <= cardAmount ? (current * 332) : current * 332}px)`;
  const next = () => {
    setCurrent(current + cardAmount < length ? current + 1 : current);
  };
  const prev = () => {
    setCurrent(current > 0 ? current - 1 : current);
  };
  const onClickButtonHandler = (e, cardIndex, cardData) => {
    e.preventDefault();
    e.stopPropagation();
    actionBtnFunc(cardIndex, cardData, e);
  };
  return (
    <CarouselParent data-testid="Carousel">
      <Container data-testid="Container" style={{ transform: `${translateAmt}` }}>
        {type === 'outfit' && <ProductCards card={addCard.product} style={addCard.style} buttonText="" actionButton={() => {}} clickFunc={() => addToOutfit()} />}
        {products.map((p, i) => {
          const filter = styles[i].results.filter((style) => style['default?'] === true);
          const style = filter.length ? filter[0] : styles[i].results[0];
          return (
            <ProductCards
              key={style.style_id}
              card={p}
              style={style}
              actionButton={(e) => onClickButtonHandler(e, i, p)}
              buttonText={type === 'outfit' ? 'X' : <NewStar filled={0} />}
              rating={ratings && ratings[i]}
            />
          );
        })}
      </Container>
      <ButtonPreset
        data-testid="leftButton"
        type="button"
        onClick={prev}
        style={({
          float: 'left', left: '3%', visibility: current === 0 ? 'hidden' : 'visible',
        })}
      >
        {'<'}
      </ButtonPreset>
      <ButtonPreset
        data-testid="rightButton"
        type="button"
        onClick={next}
        style={({
          left: '88vw', visibility: current + cardAmount >= length || window.screen.width >= length * 332 + (type === 'outfit' ? 332 : 0) ? 'hidden' : 'visible',
        })}
      >
        {'>'}
      </ButtonPreset>
    </CarouselParent>
  );
}

Carousel.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  })).isRequired,
  ratings: PropTypes.arrayOf(PropTypes.number).isRequired,
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
  addToOutfit: PropTypes.func,
};

Carousel.defaultProps = {
  addToOutfit: PropTypes.func,
};
export default Carousel;
