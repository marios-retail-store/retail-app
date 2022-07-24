import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

  const handleClick = function () {
    const options = {
      url: `/api/qa/questions/${id}/helpful`,
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
        .catch(() => {
          console.log('Error during put request to update question helpfulness');
        });
    }
  };
  return (
    <div>
      Helpful?&nbsp;&nbsp;&nbsp;
      <Button
        type="button"
        onClick={() => handleClick()}
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
