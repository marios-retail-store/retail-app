/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import QACard from './QuestionAnswerPart/QACard.jsx';
import QuestionModal from './QuestionAnswerPart/QuestionModal.jsx';

const configobj = require('../../../config.js');

const SearchContainer = styled('input')`
  height:45px;
  width:600px;
  border-radius:5px;
  background:#EAF6F6;
`;

export default function QuestionsAndAnswers({ productId, productName }) {
  const [qalist, setQalist] = useState([]);
  const [morePageNum, setMorePageNum] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/';

  const DEFAULT_PAGE_NUM = 1;
  const DEFAULT_LIMIT = 100;

  const options = {
    url: `${url}qa/questions`,
    method: 'GET',
    headers: {
      Authorization: configobj.TOKEN,
    },
    params: {
      product_id: productId,
      page: DEFAULT_PAGE_NUM,
      count: DEFAULT_LIMIT,
    },
  };

  useEffect(() => {
    axios(options)
      .then((response) => {
        setQalist(response.data.results
          .sort((a, b) => b.question_helpfulness - a.question_helpfulness));
      })
      .catch((err) => console.log('Error during get request on Q/A part for questions and answers list'));
  }, []);

  const [searchText, setSearchText] = useState('');
  const handleSearch = function (event) {
    if (event.target.value.length >= 3) {
      setSearchText(event.target.value);
      setMorePageNum(0);
    } else {
      setSearchText('');
    }
  };

  const handleLoadMoreQuestions = function () {
    setMorePageNum(morePageNum + 1);
    if (4 + morePageNum * 2 >= qalist.length) {
      setIsLastPage(true);
    }
  };

  const handleCollapseBtn = function () {
    setMorePageNum(0);
  };

  return (

    <div>
      <div><h3 style={{ textAlign: 'left' }}>QUESTIONS & ANSWERS</h3></div>
      <SearchContainer type="text" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS ......" onChange={(event) => handleSearch(event)} />
      <div style={{ maxHeight: '800px', overflow: 'scroll' }}>
        {qalist.length > 0
          ? (qalist
            .filter((obj) => obj.question_body.includes(searchText))
            .slice(0, 4 + morePageNum * 2)
            .map((ele, index) => (
              <QACard
                ele={ele}
                key={index}
                productName={productName}
              />
            )))
          : <QuestionModal productId={qalist.product_id} productName={productName} />}
      </div>
      <br />
      {isLastPage ? null : (
        <button
          type="button"
          onClick={() => handleLoadMoreQuestions()}
        >
          MORE ANSWERED QUESTIONS
        </button>
      )}
      {qalist.slice(0, 4 + morePageNum * 2).length > 4 && <button type="button" onClick={() => handleCollapseBtn()}>COLLAPSE ALL</button>}
      <QuestionModal productId={qalist.product_id} productName={productName} />
    </div>

  );
}

QuestionsAndAnswers.propTypes = {
  productId: PropTypes.number.isRequired,
  productName: PropTypes.string.isRequired,
};
