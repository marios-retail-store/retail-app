/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import AddAQuestion from './AddAQuestion.jsx';
import HelpfulNess from './HelpfulNess.jsx';
import AddaAnswer from './AddaAnswer.jsx';

const configobj = require('../../../../config.js');

export default function QandA({ qalist }) {
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

  return (
    <div>
      <div>
        {results.length > 0 ? results.map((ele, index) => (
          <div key={index}>
            <div>
              <h4>
                Q:
                {' '}
                { ele.questionText }
              </h4>
            </div>
            <HelpfulNess />
            {ele.answerslist.map((a, aIndex) => (
              <div key={aIndex}>
                A:
                {a.body}
              </div>
            ))}
            <AddaAnswer />
          </div>
        )) : <AddAQuestion />}
      </div>

    </div>

  );
}
