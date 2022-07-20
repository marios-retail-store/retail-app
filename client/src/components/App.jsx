import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Overview from './Overview.jsx';
import ProductsAndOutfits from './ProductsAndOutfits.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers.jsx';

function App() {
  const { productId } = useParams();

  const [product, setProduct] = useState(undefined);
  const [styles, setStyles] = useState(undefined);
  const [selectedStyleId, setSelectedStyleId] = useState(0);
  const [reviews, setReviews] = useState(undefined);

  useEffect(() => {
    axios({
      url: `/api/products/${productId}`,
      method: 'get',
    })
      .then((response) => {
        setProduct(response.data);
      })
      .catch((err) => {
        console.error('failed getting product', err);
      });

    axios({
      url: `/api/products/${productId}/styles`,
      method: 'get',
    })
      .then((response) => {
        setStyles(response.data);
      })
      .catch((err) => {
        console.error('failed getting styles', err);
      });

    axios({
      url: '/api/reviews',
      method: 'get',
      params: {
        page: 1,
        count: 2147483647,
        sort: 'newest',
        product_id: productId,
      },
    })
      .then((response) => {
        setReviews(response.data);
      })
      .catch((err) => {
        console.error('failed getting styles', err);
      });
  }, [productId]);

  return (
    <div>
      <Overview />
      <ProductsAndOutfits />
      <QuestionsAndAnswers productId={40344} productName="hoodies" />
    </div>
  );
}

export default App;
