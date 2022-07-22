/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Paragraph } from '../shared/styles.js';

const CustomParagraph = styled(Paragraph)`
  letter-spacing: 0em;
  display: inline;
`;

const Button = styled('button')`
  border:none;
  background:none;
  padding:0px;
  text-decoration:underline;
  cursor:pointer;
`;

export default function HelpfulNess({ count, id }) {
  const [helpful, setHelpful] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(count);

  const handleClick = function (event) {
    const options = {
      url: `api/qa/questions/${id}/helpful`,
      method: 'PUT',
      data: {
        question_helpfulness: helpfulCount + 1,
      },
    };
    if (!helpful) {
      axios(options).then(() => {
        setHelpful(true);
        setHelpfulCount(helpfulCount + 1);
      })
        .catch((err) => {
          console.log('Error during put request to update question helpfulness');
        });
    }
  };
  return (
    <div>
      Helpful?&nbsp;&nbsp;&nbsp;
      <Button
        type="button"
        onClick={(event) => handleClick(event)}
      >
        Yes
      </Button>
          &nbsp;
      <span>
        (
        {helpfulCount}
        )
      </span>
    </div>
  );
}

HelpfulNess.propTypes = {
  id: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
};
