/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import configobj from '../../../../config.js';

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/';

export default function QuestionModal({ productId }) {
  const [quesAsker, setQuesAsker] = useState('');
  const [quesEmail, setQuesEmail] = useState('');
  const [quesText, setQuestionText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const option = {
    url: `${url}qa/questions`,
    method: 'POST',
    headers: {
      Authorization: configobj.TOKEN,
    },
    params: {
      body: quesText,
      name: quesAsker,
      email: quesEmail,
      product_id: productId,
    },
  };

  return (
    <div>
      <div>
        <button type="button" onClick={() => setShowModal(true)}>ADD A QUESTION + </button>
      </div>
      {showModal && (
      <div style={{ background: '#F5EDDC' }}>
        <button type="button" onClick={() => setShowModal(false)}>{'< Go Back'}</button>
      </div>
      )}
    </div>
  );
}

QuestionModal.propTypes = {
  productId: PropTypes.string,
}.isRequired;
