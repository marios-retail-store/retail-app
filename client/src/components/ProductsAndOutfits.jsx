/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Carousel from './ProductsandOutfits/Carousel/Carousel.jsx';
import ComparisonModal from './ProductsandOutfits/Modal/ComparisonModal.jsx';

function ProductsAndOutfits({ currentProduct, style }) {
  const { productId } = useParams();
  const [myOutfit, setCurrentOutfit] = useState(undefined);
  const [relatedProducts, setRelatedProducts] = useState(undefined);
  const [comparisonProduct, setComparisonProduct] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const OutfitStorage = window.localStorage.getItem('Outfit');
  const cache = window.localStorage.getItem('CacheStatus');
  let parsedCache = JSON.parse(cache);
  if (!OutfitStorage) {
    window.localStorage.setItem('Outfit', JSON.stringify({ products: [], styles: [] }));
  }
  if (!cache) {
    window.localStorage.setItem('CacheStatus', JSON.stringify({ [productId]: { finished: false } }));
    parsedCache = JSON.parse(window.localStorage.getItem('CacheStatus'));
  }
  if (cache) {
    if (!parsedCache[productId]) {
      parsedCache[productId] = { items: {}, finished: false };
      window.localStorage.setItem('CacheStatus', JSON.stringify(parsedCache));
    }
  }
  const setStorage = () => {
    window.localStorage.setItem('Outfit', JSON.stringify(myOutfit));
  };
  const getStorage = () => {
    parsedCache = JSON.parse(window.localStorage.getItem('CacheStatus'));
    if (OutfitStorage) {
      setCurrentOutfit(JSON.parse(OutfitStorage));
    }
    if (parsedCache !== null) {
      if (Object.prototype.hasOwnProperty.call(parsedCache[productId], 'items')) {
        setRelatedProducts(parsedCache[productId].items);
      }
    }

    return [OutfitStorage, relatedProducts];
  };
  if (!myOutfit) {
    getStorage();
  }
  useEffect(() => {
    if (parsedCache === null || !parsedCache[productId].finished) {
      axios.get(`/api/products/${productId}/related`)
        .then(({ data }) => data)
        .catch((err) => {
          console.error('failed getting product', err);
        })
        .then((productIds) => {
          Promise.all([
            axios.all(productIds.map((id) => axios.get(`/api/products/${id}/`)
              .then(({ data }) => data))),
            axios.all(productIds.map((id) => axios.get(`/api/products/${id}/styles`)
              .then(({ data }) => data))),
          ])
            .then(axios.spread((products, styles) => {
              // eslint-disable-next-line consistent-return
              const filtered = products.filter((product, i) => {
                const Unique = products.findIndex((prod) => prod.name === product.name) === i;

                const isNotCurrentProduct = product.id !== Number(productId);

                if (Unique && isNotCurrentProduct) {
                  // eslint-disable-next-line consistent-return
                  return product;
                }
                styles.splice(i, 1);
              });
              setRelatedProducts({ products: filtered, styles });
              parsedCache[productId] = { items: { products: filtered, styles }, finished: true };
              window.localStorage.setItem('CacheStatus', JSON.stringify(parsedCache));
              setLoading(false);
            }));
        });
    } else {
      setLoading(false);
    }
  }, [cache, parsedCache, productId, relatedProducts]);

  const deleteOutfitCard = (cardIndex) => {
    const clone = myOutfit;
    clone.products.splice(cardIndex, 1);
    clone.styles.splice(cardIndex, 1);
    setCurrentOutfit({ ...clone });
    setStorage();
  };

  const clickProductCard = (cardInfo) => {
    window.location.pathname = `/${cardInfo.id}`;
  };

  const addOutfitCard = () => {
    if (myOutfit.products.some((product) => product.id === currentProduct.id)) {
      return;
    }
    myOutfit.products.push(currentProduct);
    myOutfit.styles.push(style);
    setStorage();
    getStorage();
    setCurrentOutfit(myOutfit);
  };

  const showModal = (cardIndex, data, event) => {
    event.preventDefault();
    setComparisonProduct(data);
    setModalVisible(true);
  };

  const handleExit = (event) => {
    event.preventDefault();
    setModalVisible(false);
  };

  if (!isLoading) {
    return (
      <>
        <CarouselTitle>Related Products</CarouselTitle>
        <Carousel
          products={relatedProducts.products}
          styles={relatedProducts.styles}
          type="related"
          clickFunc={clickProductCard}
          actionBtnFunc={showModal}
        />
        <CarouselTitle>My Outfit</CarouselTitle>
        <Carousel
          products={myOutfit.products}
          styles={myOutfit.styles}
          type="outfit"
          clickFunc={clickProductCard}
          addToOutfit={addOutfitCard}
          actionBtnFunc={deleteOutfitCard}
        />
        {currentProduct && modalVisible === true && (
        <ComparisonModal
          currentProduct={currentProduct}
          clickedProduct={comparisonProduct}
          isViewing={modalVisible}
          handleExit={handleExit}
        />
        )}
      </>
    );
  } if (isLoading) {
    if (myOutfit) {
      return (
        <>
          <CarouselTitle>Related Products</CarouselTitle>
          <Loading>Loading...</Loading>
          <CarouselTitle>My Outfit</CarouselTitle>
          <Carousel
            products={myOutfit.products}
            styles={myOutfit.styles}
            type="outfit"
            clickFunc={clickProductCard}
            addToOutfit={addOutfitCard}
            actionBtnFunc={deleteOutfitCard}
          />
        </>
      );
    }
  }
}
const CarouselTitle = styled('p')`
  font-family: 'Kanit', sans-serif;
  color: rgb(50,50,50);
  font-size: 20.75px;
  margin-left: 3.5%;
`;

const Loading = styled('p')`
font-family: 'Kanit', sans-serif;
color: rgb(50,50,50);
font-size: 15.75px;
`;
ProductsAndOutfits.propTypes = {
  currentProduct: PropTypes.shape({
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
};

export default ProductsAndOutfits;
