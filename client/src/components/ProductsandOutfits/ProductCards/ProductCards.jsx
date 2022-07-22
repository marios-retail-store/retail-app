import React from 'react';
import PropTypes from 'prop-types';
// import axios from 'axios';
import styled from 'styled-components';
import StarRating from '../../shared/star/StarRating.jsx';

function ProductCards({
  card, style, clickFunc, actionButton, buttonText,
}) {
  const productDefaultPrice = card.default_price ? `$${card.default_price}` : null;
  const productSalePrice = style.sale_price ? `$${style.sale_price}` : null;
  const productTitle = `${card.name} (${style.name})`;
  const productImageURL = style.photos[0].url || 'https://www.beelights.gr/assets/images/empty-image.png';
  const productCategory = card.category;
  const productRating = 4;
  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <Product onClick={() => clickFunc(card)}>
      {style.name !== 'add' && <ActionButton type="button" onClick={actionButton}>{buttonText}</ActionButton>}
      <ImageDiv>
        <CardImage data-testid="image" src={productImageURL} alt="product" />
      </ImageDiv>
      <ProductInfo>
        <ProductCategory className="Product-Category">
          {productCategory && productCategory.toUpperCase()}
        </ProductCategory>
        <ProductName>
          <b>{productTitle}</b>
        </ProductName>
        <ProductPricing>
          <ProductOriginalPrice>
            { productSalePrice
              ? <DiscountText>{productDefaultPrice}</DiscountText>
              : <MoneyText>{productDefaultPrice}</MoneyText> }
          </ProductOriginalPrice>
          {productSalePrice && (
          <ProductSalePrice>
            <SaleText>{productSalePrice}</SaleText>
          </ProductSalePrice>
          )}
        </ProductPricing>
        <div className="product-rating">

          {/* {productRating >= 0 ? <small>good</small> : ''} */}
          <StarRating averageRating={productRating} />
        </div>
      </ProductInfo>

    </Product>
  );
}

const ImageDiv = styled('div')``;
const CardImage = styled('img')`
  width: 100%;
  height: 400px;
  max-width: 100%;
  object-fit: cover;
  `;

const Product = styled('div')`
    border: 1px solid grey;
    margin: 1rem;
    max-width: 300px;
    width: 100%;
    display: inline-flex;
    flex-direction: column;
    position: relative;
`;

const ActionButton = styled('button')`
    align-self: flex-end;
    position: absolute;
    right: 15px;
    top: 15px;
    display : flex;
    flex-wrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    border: none;
    background: none;
    cursor: pointer;
`;

const ProductInfo = styled('div')`
  height: 100px;
  display: flex;
  font-size: 13.9px;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 0px 10px;
  white-space: normal;
`;

const ProductName = styled('div')``;
const ProductPricing = styled('div')``;
const ProductCategory = styled('div')``;
const ProductOriginalPrice = styled('div')``;
const ProductSalePrice = styled('div')``;
const SaleText = styled('small')`
        color: red;
`;
const DiscountText = styled('small')`
  text-decoration: line-through;
`;
const MoneyText = styled('small')``;

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
  actionButton: PropTypes.func,
  buttonText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
ProductCards.defaultProps = {
  actionButton: PropTypes.func,
  buttonText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default ProductCards;
