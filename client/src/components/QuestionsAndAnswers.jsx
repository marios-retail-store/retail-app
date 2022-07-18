/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import SearchBar from './QuestionAnswerPart/SearchBar.jsx';
import QACard from './QuestionAnswerPart/QACard.jsx';
import MoreAandQ from './QuestionAnswerPart/MoreAandQ.jsx';
import QuestionModal from './QuestionAnswerPart/QuestionModal.jsx';

const configobj = require('../../../config.js');

export default function QuestionsAndAnswers({ productId, productName }) {
  const [qalist, setQalist] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/';

  const DEFAULT_LIMIT = 100;

  const options = {
    url: `${url}qa/questions`,
    method: 'GET',
    headers: {
      Authorization: configobj.TOKEN,
    },
    params: {
      product_id: productId,
      page: pageNum,
      count: DEFAULT_LIMIT,
    },
  };

  useEffect(() => {
    axios(options)
      .then((response) => {
        setQalist(response.data.results);
        setPageNum(pageNum + 1);
      })
      .catch((err) => console.log('Error during get request on Q/A part for questions and answers list'));
  }, []);
  return (

    <div>
      <div><h3 style={{ textAlign: 'left' }}>QUESTIONS & ANSWERS</h3></div>
      <SearchBar />
      {qalist.length > 0 ? (qalist.map((ele, index) => (
        <QACard
          ele={ele}
          key={index}
          productName={productName}
        />
      )))
        : <QuestionModal productId={qalist.product_id} productName={productName} />}
      <br />
      <MoreAandQ />
      <br />
      <QuestionModal productId={qalist.product_id} productName={productName} />
    </div>

  );
}

QuestionsAndAnswers.propTypes = {
  productId: PropTypes.number.isRequired,
  productName: PropTypes.string.isRequired,
};
