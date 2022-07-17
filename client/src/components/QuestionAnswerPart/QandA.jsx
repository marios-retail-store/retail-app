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
import MoreAandQ from './MoreAandQ.jsx';

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
export default function QandA({ qalist, productName }) {
  console.log('show productName: ', productName);
  // console.log('show product id: ', typeof (qalist.product_id), qalist.product_id);
  let results = [];
  // sort the questions and answers list for answer with priority from 'seller'
  // or with higher helpfulness scores
  // sort the questions and answers lists for questions with higher helpfulness scores
  // eslint-disable-next-line react/prop-types
  if (qalist.results) {
    results = qalist.results.map((ele) => ({
      id: ele.question_id,
      questionText: ele.question_body,
      helpfulness: ele.question_helpfulness,
      answerslist: Object.values(ele.answers).sort((a, b) => {
        if (a.answerer_name.toLowerCase() === 'seller') {
          return -1;
        } if (b.answerer_name.toLowerCase() === 'seller') {
          return 1;
        }
        return (b.helpfulness - a.helpfulness);
      })
        .slice(0, 2),

    }))
      .sort((a, b) => b.helpfulness - a.helpfulness)
      .slice(0, 4);
  }

  const [showModal, setShowModal] = useState(false);
  const [questionId, setQuestionId] = useState(0);
  const [questionText, setQuestionText] = useState('');
  const [report, setReport] = useState(false);

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
        {results.length > 0 ? results.map((ele, index) => (
          <div key={index}>
            <Container>
              <h4>
                Q:
                {ele.questionText}
              </h4>
              <HelpfulNess
                style={{ textAlign: 'center', padding: '25px' }}
                id={ele.id}
                count={ele.helpfulness}
              />
              <div style={{ padding: '25px', display: 'flex', flexWrap: 'wrap' }}>
                | &nbsp; &nbsp;
                <span>
                  <Button type="button" value={ele.questionText} id={ele.id} onClick={(event) => handleClickAddAnsButton(event)}>Add Answer</Button>
                </span>
              </div>
            </Container>
            {ele.answerslist.map((a, aIndex) => (
              <div key={aIndex}>
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
          </div>
        )) : <QuestionModal productId={qalist.product_id} />}
      </div>
      <MoreAandQ />
      <br />
      <QuestionModal />
    </div>

  );
}

QandA.propTypes = {
  productName: PropTypes.string.isRequired,
  qalist: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};
