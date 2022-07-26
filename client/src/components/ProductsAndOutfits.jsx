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

function ProductsAndOutfits({ currentProduct, style, rating }) {
  const { productId } = useParams();
  const [myOutfit, setCurrentOutfit] = useState(undefined);
  const [relatedProducts, setRelatedProducts] = useState(undefined);
  const [comparisonProduct, setComparisonProduct] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(true);
  let RelatedProductStorage = JSON.parse(window.localStorage.getItem('RelatedProducts'));
  let OutfitStorage = JSON.parse(window.localStorage.getItem('Outfit'));
  const avgRating = Number(
    // eslint-disable-next-line react/prop-types
    (rating.results.reduce(
      (acc, review) => (acc + review.rating),
      0,
    // eslint-disable-next-line react/prop-types
    ) / rating.results.length).toFixed(2),
  );

  const setStorage = (cache, inputObj) => {
    const currentCache = JSON.parse(window.localStorage.getItem(cache));
    window.localStorage.setItem(cache, JSON.stringify({ ...currentCache, ...inputObj }));
  };
  const getStorage = () => {
    RelatedProductStorage = JSON.parse(window.localStorage.getItem('RelatedProducts'));
    OutfitStorage = JSON.parse(window.localStorage.getItem('Outfit'));
    if (OutfitStorage) {
      setCurrentOutfit(OutfitStorage);
    } else {
      setStorage('Outfit', { products: [], styles: [], ratings: [] });
      setCurrentOutfit(JSON.parse(window.localStorage.getItem('Outfit')));
    }
    if (RelatedProductStorage) {
      if (RelatedProductStorage[productId] && RelatedProductStorage[productId].items) {
        setRelatedProducts(RelatedProductStorage[productId].items);
      } else {
        setStorage('RelatedProducts', { [productId]: { finished: false } });
      }
    } else {
      setStorage('RelatedProducts', { [productId]: { finished: false } });
    }
    RelatedProductStorage = JSON.parse(window.localStorage.getItem('RelatedProducts'));
    OutfitStorage = JSON.parse(window.localStorage.getItem('Outfit'));
    return [OutfitStorage, RelatedProductStorage];
  };

  useEffect(() => {
    getStorage();
    setLoading(true);
    if (RelatedProductStorage === null || !RelatedProductStorage[productId].finished) {
      axios.get(`/api/products/${productId}/related`)
        .then(({ data }) => data)
        .catch((err) => {
          console.error('failed getting product', err);
        })
        .then((productIds) => Promise.all([
          axios.all(productIds.map((id) => axios.get(`/api/products/${id}/`)
            .then(({ data }) => data))),
          axios.all(productIds.map((id) => axios.get(`/api/products/${id}/styles`)
            .then(({ data }) => data))),
          axios.all(productIds.map((id) => axios.get(`/api/reviews?product_id=${id}&count=999999`)
            .then(({ data }) => data)
            .then(({ results }) => results))),
        ]))
        .then(axios.spread((products, styles, reviews) => {
          // eslint-disable-next-line consistent-return
          const filtered = products.filter((product, i) => {
            const Unique = products.findIndex((prod) => prod.name === product.name) === i;

            const isNotCurrentProduct = product.id !== Number(productId);

            if (Unique && isNotCurrentProduct) {
              // eslint-disable-next-line consistent-return
              return product;
            }
            styles.splice(i, 1);
            reviews.splice(i, 1);
          });
          const ratings = reviews.map((product) => Number(
            (product.reduce(
              (acc, review) => (acc + review.rating),
              0,
            ) / product.length).toFixed(2),
          ));
          setLoading(false);
          return { [productId]: { items: { products: filtered, styles, ratings }, finished: !!1 } };
        }))
        .then((result) => {
          setStorage('RelatedProducts', result);
          setRelatedProducts(result[productId].items);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const deleteOutfitCard = (cardIndex) => {
    const clone = myOutfit;
    clone.products.splice(cardIndex, 1);
    clone.styles.splice(cardIndex, 1);
    clone.ratings.splice(cardIndex, 1);
    setCurrentOutfit({ ...clone });
    setStorage('Outfit', myOutfit);
  };

  const addOutfitCard = () => {
    if (myOutfit.products.some((product) => product.id === currentProduct.id)) {
      return;
    }
    myOutfit.products.push(currentProduct);
    myOutfit.styles.push(style);
    myOutfit.ratings.push(avgRating);
    setStorage('Outfit', myOutfit);
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

  if (!isLoading && relatedProducts.ratings && myOutfit.ratings) {
    return (
      <>
        <CarouselTitle>Related Products</CarouselTitle>
        <Carousel
          products={relatedProducts.products}
          styles={relatedProducts.styles}
          ratings={relatedProducts.ratings}
          type="related"
          actionBtnFunc={showModal}
        />
        <CarouselTitle>My Outfit</CarouselTitle>
        <Carousel
          products={myOutfit.products}
          styles={myOutfit.styles}
          ratings={myOutfit.ratings}
          type="outfit"
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
            ratings={myOutfit.ratings}
            type="outfit"
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
  // eslint-disable-next-line react/require-default-props
  currentProduct: PropTypes.shape({
    id: PropTypes.number,
    category: PropTypes.string,
    name: PropTypes.string,
    default_price: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.shape({
      feature: PropTypes.string,
      value: PropTypes.string,
    })),
  }),

  rating: PropTypes.shape({}).isRequired,

  // eslint-disable-next-line react/require-default-props
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
  }),
};

export default ProductsAndOutfits;
