/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import configobj from '../../../../config.js';

const Button = styled('button')`
  border:none;
  background:none;
  padding:0;
  text-decoration:underline;
  cursor:pointer;
`;

export default function HelpfulNess({ count, id }) {
  const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/';

  const [helpful, setHelpful] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(count);

  const handleClick = function (event) {
    const options = {
      url: `${url}qa/questions/${id}/helpful`,
      method: 'PUT',
      headers: {
        // 'User-Agent': 'request',
        Authorization: configobj.TOKEN,
      },
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
