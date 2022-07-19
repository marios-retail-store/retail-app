import React from 'react';
import PropTypes from 'prop-types';

function ProductCards({
  card, style, clickFunc, actionButton,
}) {
  const productDefaultPrice = card.default_price ? `$${card.default_price}` : null;
  const productSalePrice = style.sale_price ? `$${style.sale_price}` : null;
  const productTitle = `${card.name} (${style.name})`;
  const productImageURL = style.photos[0].url || 'https://www.beelights.gr/assets/images/empty-image.png';
  const productCategory = card.category;
  const cardImgStyle = {
    width: '100%',
    height: '400px',
    maxWidth: '100%',
    objectFit: 'cover',
  };
  const cardStyle = {
    border: '1px solid grey',
    margin: '1rem',
    maxWidth: '300px',
    width: '100%',
    display: 'inline-flex',
    flexDirection: 'column',
    position: 'relative',
  };

  const actionButtonStyle = {
    alignSelf: 'flex-end',
    position: 'absolute',
    right: '15px',
    top: '15px',

  };
  const InfoStyle = {
    height: '100px',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    padding: '0px 10px',
    whiteSpace: 'normal',
  };
  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div className="product-card" style={cardStyle} onClick={clickFunc.bind(this, card)}>
      {style.name !== 'add' && <button className="action-Button" type="button" style={actionButtonStyle} onClick={actionButton}>x</button>}
      <div className="product-image">
        <img data-testid="image" src={productImageURL} alt="product" style={cardImgStyle} />
      </div>
      <div className="product-info" style={InfoStyle}>
        <div className="product-category">
          {productCategory && productCategory.toUpperCase()}
        </div>
        <div className="product-name">
          <b>{productTitle}</b>
        </div>
        <div className="pricing">
          <div className="product-original-price">
            {productDefaultPrice && <small style={productSalePrice && { textDecoration: 'line-through' }}>{productDefaultPrice}</small>}
          </div>
          {productSalePrice && (
          <div className="product-sale-price">
            <small style={{ color: 'red' }}>{productSalePrice}</small>
          </div>
          )}
        </div>
        <div className="product-rating" />
      </div>

    </div>
  );
}

ProductCards.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number,
    category: PropTypes.string,
    name: PropTypes.string,
    default_price: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.shape({
      feature: PropTypes.string,
      value: PropTypes.string,
    })),
  }).isRequired,
  style: PropTypes.shape({
    style_id: PropTypes.number,
    name: PropTypes.string,
    original_price: PropTypes.string,
    sale_price: PropTypes.string,
    'default?': PropTypes.bool,
    photos: PropTypes.arrayOf(PropTypes.shape({
      thumbnail_url: PropTypes.string,
      url: PropTypes.string,
    })),
  }).isRequired,
  clickFunc: PropTypes.func.isRequired,
  actionButton: PropTypes.func.isRequired,
};

export default ProductCards;
