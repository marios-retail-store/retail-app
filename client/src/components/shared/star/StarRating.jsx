import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Star from './Star.jsx';
import getStarValuesFromAvgRating from './getStarValuesFromAvgRating.js';

const Container = styled('div')`
  display: flex;
  flex-direction: row;
  height: 24px;
`;

function StarRating({ averageRating }) {
  const starValues = getStarValuesFromAvgRating(averageRating);
  return (
    <Container>
      {starValues.map((filledAmt, index) => (
        <Star
          filled={filledAmt}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
        />
      ))}
    </Container>
  );
}

StarRating.propTypes = {
  averageRating: PropTypes.number.isRequired,
};

export default StarRating;
