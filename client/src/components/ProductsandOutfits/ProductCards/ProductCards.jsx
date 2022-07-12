import React from 'react';
import PropTypes from 'prop-types';

function ProductCards({ card, style, clickFunc }) {
  const productDefaultPrice = `$${card.default_price}`;
  const productSalePrice = style.sale_price ? `$${style.sale_price}` : null;
  const productTitle = `${card.name} (${style.name})`;
  const productImageURL = style.photos[0].url;
  const productCategory = card.category;
  const cardImgStyle = {
    width: '100%',
    height: '400px',
    maxWidth: '100%',
    objectFit: 'cover',
  };
  const cardStyle = {
    border: '1px solid grey',
    margin: '0.5rem',
    width: '300px',
  };
  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div className="Product-Card" style={cardStyle} onClick={clickFunc.bind(this)}>
      <div className="product-image">
        <img data-testid="image" src={productImageURL} alt="product" style={cardImgStyle} />
      </div>
      <div className="product-category">
        {productCategory}
      </div>
      <div className="product-name">
        {productTitle}
      </div>
      <div className="pricing">
        <div className="product-original-price" style={productSalePrice && { textDecoration: 'line-through' }}>
          {productDefaultPrice}
        </div>
        {productSalePrice && (
          <div className="product-sale-price" style={{ color: 'red' }}>
            {productSalePrice}
          </div>
        )}
      </div>
      <div className="product-rating" />
    </div>
  );
}

ProductCards.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    default_price: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.shape({
      feature: PropTypes.string,
      value: PropTypes.string,
    })).isRequired,
  }).isRequired,
  style: PropTypes.shape({
    style_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    original_price: PropTypes.string.isRequired,
    sale_price: PropTypes.string,
    'default?': PropTypes.bool.isRequired,
    photos: PropTypes.arrayOf(PropTypes.shape({
      thumbnail_url: PropTypes.string,
      url: PropTypes.string,
    })).isRequired,
  }).isRequired,
  clickFunc: PropTypes.func.isRequired,
};

export default ProductCards;
