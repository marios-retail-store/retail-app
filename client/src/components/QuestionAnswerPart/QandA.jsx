import React, { useState } from 'react';
import axios from 'axios';
const configobj = require('../../../../config.js');
import AddAQuestion from './AddAQuestion.jsx';
import HelpfulNess from './HelpfulNess.jsx';
import AddaAnswer from './AddaAnswer.jsx';

export default function QandA({ qalist }) {

  let results = [];
  let sellerAns = [];
  let sortedAns = [];

  //sort the questions and answers list for answer with priority from 'seller' or with higher helpfulness scores
  //sort the questions and answers lists for questions with higher helpfulness scores
  if (qalist.results) {
    results = qalist.results.map((ele) => {
      return {
        id: ele.question_id,
        questionText: ele.question_body,
        helpfulness: ele.question_helpfulness,
        answerslist: ele.answers//object(key=>object)
        /*
        Object.values(ele.answers).sort((a, b) => {
          if (a.answerer_name.toLowerCase() === 'seller') {
            return -1;
          } else if (b.answerer_name.toLowerCase() === 'seller') {
            return 1;
          }
          return 0;
        })
        .slice(0, 2)
        */
      }
    })
      .sort((a, b) => b.helpfulness - a.helpfulness)
      .slice(0, 4);
  }
 // console.log(results);

  if (results.length > 0) {
    const messagePeople = results.map(e => Object.values(e.answerslist).slice(0, 2));
    sellerAns = messagePeople.map(item => item.filter(e => e.answerer_name.toLowerCase() === 'seller')).slice(0,1);
    sortedAns = messagePeople.map(item => item.filter(e => e.answerer_name.toLowerCase() !== 'seller').sort((a, b) => b.helpfulness - a.helpfulness)).slice(0,1);
  }

  return (
    <div>
      <div>
        {results.length > 0 ? results.map((ele, index) => (
          <div key={index}>
            <div><h4>Q:{ele.questionText}</h4></div>
            <HelpfulNess />
            {/* {ele.answerslist.map((a, a_index) => (
              <div key={a_index}>
                A:{a.body}
              </div>
            ))} */}
            <AddaAnswer />
            <div>
              {sellerAns.length>0 && sellerAns.map((item,index)=>item.map((e,e_index)=><div key={e_index}>A:{e.body}</div>))}
              {sortedAns.length>0 && sortedAns.map((item,index)=>item.map((e,e_index)=><div key={e_index}>A:{e.body}</div>))}
            </div>
          </div>
        )) : <AddAQuestion />}
      </div>



    </div>

  )

}

