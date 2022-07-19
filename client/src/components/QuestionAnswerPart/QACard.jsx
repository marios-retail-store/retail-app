/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import QuestionModal from './QuestionModal.jsx';
import HelpfulNess from './HelpfulNess.jsx';
import AnswerModal from './AnswerModal.jsx';

const configobj = require('../../../../config.js');

const Container = styled('div')`
  display:flex;
  direction:row;
  flex-wrap:wrap
`;

const Button = styled('button')`
  border:none;
  background:none;
  text-decoration:underline;
  cursor:pointer;
`;
const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/';
export default function QandA({ ele, key, productName }) {
  const answerslist = Object.values(ele.answers).sort((a, b) => {
    if (a.answerer_name.toLowerCase() === 'seller') {
      return -1;
    } if (b.answerer_name.toLowerCase() === 'seller') {
      return 1;
    }
    return (b.helpfulness - a.helpfulness);
  });
  const [showModal, setShowModal] = useState(false);
  const [questionId, setQuestionId] = useState(0);
  const [questionText, setQuestionText] = useState('');
  const [report, setReport] = useState(false);
  const [displayedAns, setDisplayedAns] = useState(answerslist.slice(0, 2));
  const [showCollapseBtn, setShowCollapeBtn] = useState(false);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(true);

  const handleLoadMoreBtn = function () {
    setShowCollapeBtn(true);
    setDisplayedAns(answerslist.slice());
  };

  const handleCollapseBtn = function () {
    setShowCollapeBtn(false);
    setDisplayedAns(answerslist.slice(0, 2));
  };

  const handleClickAddAnsButton = function (event, id) {
    setShowModal(true);
    setQuestionText(event.target.value);
    setQuestionId(event.target.id);
  };
  const handleReport = function (event, reportingId) {
    const options = {
      url: `${url}qa/questions/${reportingId}/report`,
      method: 'PUT',
      headers: {
        Authorization: configobj.TOKEN,
      },
      data: {
        reported: true,
      },
    };
    if (!report) {
      axios(options).then(() => {
        setReport(true);
      }).catch((err) => { console.log('Error during reporing request'); });
    } else {
      alert('Have received your report. Thanks');
    }
  };

  return (
    <div>
      <div>
        <br />
        {showModal && (
          <AnswerModal
            setShowModal={setShowModal}
            questionText={questionText}
            productName={productName}
            questionId={questionId}
          />
        )}
        <Container>
          <h4>
            Q:
            {ele.question_body}
          </h4>
          <HelpfulNess
            style={{ textAlign: 'center', padding: '25px' }}
            id={ele.question_id}
            count={ele.question_helpfulness}
          />
          <div style={{ padding: '25px', display: 'flex', flexWrap: 'wrap' }}>
            | &nbsp; &nbsp;
            <span>
              <Button type="button" value={ele.question_body} id={ele.question_id} onClick={(event) => handleClickAddAnsButton(event)}>Add Answer</Button>
            </span>
          </div>
        </Container>
        {displayedAns.map((a, aIndex) => (
          <div key={aIndex} style={{ maxHeight: '200px', overflow: 'scroll' }}>
            A:
            {a.body}
            <div style={{ padding: '10px', display: 'flex', flexWrap: 'wrap' }}>
              {' '}
              by  &nbsp;
              {a.answerer_name.toLowerCase() === 'seller' ? <b>Seller</b> : a.answerer_name }
              ,
              &nbsp;
              <span>
                {' '}
                <Moment format="MMMM-DD-YYYY" date={a.date} />
              </span>
              &nbsp; &nbsp;
              | &nbsp; &nbsp;
              <HelpfulNess id={a.id} count={a.helpfulness} />
              <span>
                    &nbsp; | &nbsp;
                <Button type="button" id={ele.id} onClick={(event) => handleReport(event, event.target.id)}>Report</Button>
              </span>
            </div>
          </div>
        ))}
        {(answerslist.length > 2 && !showCollapseBtn) && <button type="button" onClick={() => handleLoadMoreBtn()}>LOAD MORE ANSWERS</button>}
        {(answerslist.length > 2 && showCollapseBtn) && <button type="button" onClick={() => handleCollapseBtn()}>COLLAPSE ANSWERS</button>}
      </div>
    </div>
  );
}

QandA.propTypes = {
  productName: PropTypes.string.isRequired,
  key: PropTypes.number.isRequired,
  ele: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};