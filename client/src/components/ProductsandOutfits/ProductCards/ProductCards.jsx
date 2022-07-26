import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import StarRating from '../../shared/star/StarRating.jsx';

function ProductCards({
  card, style, clickFunc, actionButton, buttonText, rating,
}) {
  const productDefaultPrice = card.default_price ? `$${card.default_price}` : null;
  const productSalePrice = style.sale_price ? `$${style.sale_price}` : null;
  const productTitle = `${card.name} (${style.name})`;
  let newUrl;
  if (style.photos[0].url) {
    newUrl = style.photos[0].url.split('&w=');
    newUrl[1] = '298&q=65';
    newUrl = newUrl.join('&w=');
  }
  const productImageURL = newUrl || '../../../../empty-image.png';
  const productCategory = card.category;

  const children = (
    <>
      {style.name !== 'add' && <ActionButton type="button" onClick={actionButton}>{buttonText}</ActionButton>}
      <ImageDiv>
        <CardImage data-testid="image" src={productImageURL} alt="product" />
      </ImageDiv>
      <ProductInfo>
        <ProductCategory className="Product-Category">
          {productCategory && productCategory.toUpperCase()}
        </ProductCategory>
        <ProductName>
          <Title>{productTitle}</Title>
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
          {rating && <StarRating averageRating={rating} />}
        </div>
      </ProductInfo>
    </>
  );

  // eslint-disable-next-line react/jsx-one-expression-per-line
  const result = style.name === 'add' ? <AddToOutfit onClick={() => clickFunc()}>{children}</AddToOutfit> : <ProductClickable style={{ textDecoration: 'none' }} to={`/products/${card.id}`}> {children} </ProductClickable>;
  return (result);
}

const ImageDiv = styled('div')``;
const Title = styled('b')`
  font-weight: 540;
`;
const CardImage = styled('img')`
  width: 100%;
  height: 400px;
  max-width: 100%;
  object-fit: cover;
  draggable: false;
`;

const ProductClickable = styled(Link)`
    border: 1px solid grey;
    margin: 1rem;
    max-width: 300px;
    width: 100%;
    display: inline-flex;
    flex-direction: column;
    position: relative;
    font-family: 'Kanit',sans-serif;
    color: rgb(50,50,50);
    cursor: pointer;
    background-color: #EAF6F6;
`;

const AddToOutfit = styled('div')`
    border: 1px solid grey;
    margin: 1rem;
    max-width: 300px;
    width: 100%;
    display: inline-flex;
    flex-direction: column;
    position: relative;
    font-family: 'Kanit',sans-serif;
    color: rgb(50,50,50);
    cursor: pointer;
    background-color: #EAF6F6;
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
    color: aqua;
`;

const ProductInfo = styled('div')`
  height: 100px;
  display: flex;
  font-size: 12.75px;
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
  rating: PropTypes.number,
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
  clickFunc: PropTypes.func,
  actionButton: PropTypes.func,
  buttonText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
ProductCards.defaultProps = {
  rating: undefined,
  actionButton: PropTypes.func,
  buttonText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default ProductCards;
