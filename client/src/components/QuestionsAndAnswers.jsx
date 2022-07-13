import React,{useState,useEffect} from 'react';
import SearchBar from './QuestionAnswerPart/SearchBar.jsx';
import AddAQuestion from './QuestionAnswerPart/AddAQuestion.jsx';
import QandA from './QuestionAnswerPart/QandA.jsx';
import MoreAandQ from './QuestionAnswerPart/MoreAandQ.jsx';
const configobj = require('../../../config.js');
import axios from 'axios';



export default function QuestionsAndAnswers({productId}){

  const[qalist,setQalist]=useState({});
  const [pageNum,setPageNum]=useState(1);

  const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/';

  const DEFAULT_LIMIT = 100;

  let options = {
    url: `${url}qa/questions`,
    method: 'GET',
    headers: {
      //'User-Agent': 'request',
      'Authorization': configobj.TOKEN
    },
    params: {
      product_id:productId,
      page: pageNum,
      count: DEFAULT_LIMIT
    }
  };

  //component did mount
    useEffect(()=>{
      axios(options)
      .then((response) => {
        console.log('axios get request',response.data);
        setQalist(response.data);
        setPageNum(pageNum + 1);
      })
      .catch((err) => console.log('Error during get request on Q/A part for questions and answers list'));
    },[]);


  return (

    <div>
      <div><h3 style={{textAlign: "left"}}>QUESTIONS & ANSWERS</h3></div>
      <SearchBar />
      <QandA qalist={qalist} />
      <br></br>
      <MoreAandQ />
      <br></br>
      <AddAQuestion />
    </div>

  );

}
