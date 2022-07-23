/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';
import { BoldSubHeading, SharedButton } from '../shared/styles.js';

const Button = styled(SharedButton)`
  display: inline-block;
`;
const SubButton = styled('button')`
background-color: #D3CEDF;
border-radius: 10px;
padding:10px;
text-align: center;
display: inline-block;
font-size: 16px;
margin-top:15px;
margin-left:200px;
`;
const ModalBackground = styled('div')`
  background-color: #F5EDDC;
  width:80%;
  height: 90%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 90;
`;

const SmallDiv = styled('input')`
width:180px;
height:30px;
margin:10px;
`;

export default function QuestionModal({ productId, productName }) {
  const [quesAsker, setQuesAsker] = useState('');
  const [quesEmail, setQuesEmail] = useState('');
  const [quesText, setQuestionText] = useState('');
  const [showModal, setShowModal] = useState(false);

  const option = {
    url: '/api/qa/questions',
    method: 'POST',
    data: {
      body: quesText,
      name: quesAsker,
      email: quesEmail,
      product_id: productId,
    },
  };

  const isValidEmail = function (value) {
    const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return validEmail.test(value);
  };

  const handleSubmit = function () {
    const messages = [];
    if (!isValidEmail(quesEmail)) {
      messages.push('Email');
    }
    if (!quesText.length) {
      messages.push('Question Text');
    }
    if (!quesAsker.length) {
      messages.push('Nickname');
    }
    if (messages.length) {
      alert(`Please enter correct values in the following fields: ${messages.join(',')}`);
    } else {
      axios(option).then(() => setShowModal(false)).catch((err) => console.log('Error during submit question form'));
    }
  };

  return (
    <div>
      <div style={{ marginTop: '20px' }}>
        <Button type="button" onClick={() => setShowModal(true)}>
          <BoldSubHeading>ADD A QUESTION +</BoldSubHeading>
        </Button>
      </div>
      {showModal && (
      <ModalBackground>
        <button type="button" onClick={() => setShowModal(false)}>{'< Go Back'}</button>
        <h2 style={{ textAlign: 'center' }}>
          {`Ask Your Question About the ${productName}`}
        </h2>
        <div style={{ margin: '220px', marginTop: '40px' }}>
          <form>
            <label htmlFor="question">Your Question * &nbsp;</label>
            <textarea style={{ width: '350px', height: '100px' }} type="text" placeholder="Enter Your Question Here Please..." autoComplete="on" maxLength={1000} minLength={1} rows={6} columns={66} onChange={(event) => setQuestionText(event.target.value)} />
            <br />
            <label htmlFor="nickname">
              Nickname * &nbsp;
              <SmallDiv type="text" placeholder="Example: jackson11" maxLength={60} onChange={(event) => setQuesAsker(event.target.value)} />
              <p>
                For privacy reasons, do not use your full name or email address
              </p>
            </label>
            <label htmlFor="email">
              Email * &nbsp;
              <SmallDiv type="email" autoComplete="off" maxLength={60} placeholder="jackson@email.com" onChange={(event) => setQuesEmail(event.target.value)} />
              <p>For privacy reasons, do not use your full name or email address !!</p>
            </label>
          </form>
          <SubButton type="button" onClick={() => handleSubmit()}>Submit</SubButton>
        </div>
      </ModalBackground>
      )}
    </div>
  );
}

QuestionModal.propTypes = {
  productId: PropTypes.number,
  productName: PropTypes.string,
}.isRequired;
