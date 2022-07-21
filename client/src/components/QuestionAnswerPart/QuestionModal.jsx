/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';
import configobj from '../../../../config.js';

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/';

export default function QuestionModal({ productId, productName }) {
  const [quesAsker, setQuesAsker] = useState('');
  const [quesEmail, setQuesEmail] = useState('');
  const [quesText, setQuestionText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const option = {
    url: `${url}qa/questions`,
    method: 'POST',
    headers: {
      Authorization: configobj.TOKEN,
    },
    data: {
      body: quesText,
      name: quesAsker,
      email: quesEmail,
      product_id: Number(productId),
    },
  };
  const handleAlert = function () {
    setErrMessage('');
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
      setErrMessage(`Please enter correct values in the following fields: ${messages.join(',')}`);
      alert(errMessage);
    } else {
      axios(option).then(() => setShowModal(false)).catch((err) => console.log('Error during submit question form'));
    }
  };

  return (
    <div>
      <div>
        <button type="button" onClick={() => setShowModal(true)}>ADD A QUESTION + </button>
      </div>
      {showModal && (
      <div style={{ background: '#F5EDDC' }}>
        <button type="button" onClick={() => setShowModal(false)}>{'< Go Back'}</button>
        <h2>
          {`Ask Your Question About the ${productName}`}
        </h2>
        <div>
          {errMessage.length ? (
            <div>
              <button type="button" onClick={() => handleAlert()}> &nbsp;X &nbsp;</button>
              <p>{errMessage}</p>
            </div>
          ) : null}
        </div>
        <form>
          <label htmlFor="question">Your Question * &nbsp;</label>
          <textarea type="text" placeholder="Enter Your Question Here Please..." autoComplete="on" maxLength={1000} minLength={1} rows={6} columns={66} onChange={(event) => setQuestionText(event.target.value)} />
          <br />
          <label htmlFor="nickname">
            Nickname * &nbsp;
            <input type="text" placeholder="Example: jackson11" maxLength={60} onChange={(event) => setQuesAsker(event.target.value)} />
            <p>
              “For privacy reasons, do not use your full name or email address”
            </p>
          </label>
          <label htmlFor="email">
            Email * &nbsp;
            <input type="email" autoComplete="off" maxLength={60} placeholder="jackson@email.com" onChange={(event) => setQuesEmail(event.target.value)} />
            <p>For privacy reasons, do not use your full name or email address !!</p>
          </label>
        </form>
        <button type="button" onClick={() => handleSubmit()}>Submit</button>
      </div>
      )}
    </div>
  );
}

QuestionModal.propTypes = {
  productId: PropTypes.string,
  productName: PropTypes.string,
}.isRequired;
