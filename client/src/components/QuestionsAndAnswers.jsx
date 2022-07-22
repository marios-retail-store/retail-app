/* eslint-disable func-names */
/* eslint-disable react/no-array-index-key */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import QACard from './QuestionAnswerPart/QACard.jsx';
import QuestionModal from './QuestionAnswerPart/QuestionModal.jsx';
import { SuperBoldSubHeading } from './shared/styles.js';

const SearchContainer = styled('input')`
  height:65px;
  width:700px;
  border-radius:5px;
  background:#EAF6F6;
  position:absolute;
`;
const Button = styled('button')`
  background-color: #DAEAF1;
  border-radius: 10px;
  padding: 15px 32px;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  margin-right: 50px;
`;

const SearchDiv = styled('div')`
   position:relative;
`;
export default function QuestionsAndAnswers({ productId, productName }) {
  const [qalist, setQalist] = useState([]);
  const [morePageNum, setMorePageNum] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  const DEFAULT_PAGE_NUM = 1;
  const DEFAULT_LIMIT = 100;

  const options = {

    url: 'api/qa/questions',
    method: 'GET',
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div><SuperBoldSubHeading>QUESTIONS & ANSWERS</SuperBoldSubHeading></div>
      <br />
      <SearchDiv>
        <SearchContainer type="text" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS ......" onChange={(event) => handleSearch(event)} />
        <span className="material-symbols-outlined">
          search
        </span>
      </SearchDiv>
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
        <Button
          type="button"
          onClick={() => handleLoadMoreQuestions()}
        >
          MORE ANSWERED QUESTIONS
        </Button>
      )}
      {qalist.slice(0, 4 + morePageNum * 2).length > 4 && <Button type="button" onClick={() => handleCollapseBtn()}>COLLAPSE ALL</Button>}
      <QuestionModal productId={qalist.product_id} productName={productName} />
    </div>

  );
}

QuestionsAndAnswers.propTypes = {
  productId: PropTypes.number.isRequired,
  productName: PropTypes.string.isRequired,
};
