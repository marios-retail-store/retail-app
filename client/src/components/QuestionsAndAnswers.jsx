/* eslint-disable func-names */
/* eslint-disable react/no-array-index-key */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import QACard from './QuestionAnswerPart/QACard.jsx';
import QuestionModal from './QuestionAnswerPart/QuestionModal.jsx';
import { CarouselTitle, BoldSubHeading, SharedButton } from './shared/styles.js';

const Container = styled('div')`
  margin: 0 3.5%;
`;

const SearchContainer = styled('input')`
  margin-right: -35px;
  width:700px;
  user-select: none;
  height: 50px;
  padding: 0 15px;
  background-color: #EAF6F6;
  border: 1px solid black;
  text-align: left;
  font-family: 'Kanit', sans-serif;
  font-size: 14px;
  font-weight: 400;
  ::placeholder {
    font-family: 'Kanit', sans-serif;
    color: rgb(175, 175, 175);
    font-size: 14px;
    font-weight: 400;
  }
`;

const Button = styled(SharedButton)`
  display: inline-block;
  margin-right: 50px;
`;

const SearchDiv = styled('div')`
   position:relative;
   margin-bottom:20px;
   display: flex;
   align-items: center;
   color: rgb(175, 175, 175);
`;

const InnerContainer = styled('span')`
   left: 320px
   position: absolute;
`;

export default function QuestionsAndAnswers({ productId, productName }) {
  const [qalist, setQalist] = useState([]);
  const [morePageNum, setMorePageNum] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  const DEFAULT_PAGE_NUM = 1;
  const DEFAULT_LIMIT = 100;

  const options = {

    url: '/api/qa/questions',
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
      .catch(() => console.log('Error during get request on Q/A part for questions and answers list'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

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

    <Container>
      <div><CarouselTitle>QUESTIONS & ANSWERS</CarouselTitle></div>
      <br />
      <SearchDiv>
        <SearchContainer type="text" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS ......" onChange={(event) => handleSearch(event)} />
        <InnerContainer className="material-symbols-outlined">
          search
        </InnerContainer>
      </SearchDiv>
      <div style={{ maxHeight: '800px', overflowY: 'scroll' }}>
        {qalist.length > 0
          ? (qalist
            .filter((obj) => obj.question_body.includes(searchText))
            .slice(0, 4 + morePageNum * 2)
            .map((ele) => (
              <QACard
                ele={ele}
                key={ele.question_id}
                productName={productName}
              />
            )))
          : <QuestionModal productId={productId} productName={productName} />}
      </div>
      <br />
      {isLastPage ? null : (
        <Button
          type="button"
          onClick={() => handleLoadMoreQuestions()}
        >
          <BoldSubHeading>MORE ANSWERED QUESTIONS</BoldSubHeading>
        </Button>
      )}
      {qalist.slice(0, 4 + morePageNum * 2).length > 4 && (
        <Button type="button" onClick={() => handleCollapseBtn()}>
          <BoldSubHeading>COLLAPSE ALL</BoldSubHeading>
        </Button>
      )}
      <QuestionModal productId={productId} productName={productName} />
    </Container>

  );
}

QuestionsAndAnswers.propTypes = {
  productId: PropTypes.number.isRequired,
  productName: PropTypes.string.isRequired,
};
