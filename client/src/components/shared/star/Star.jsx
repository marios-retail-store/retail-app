import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StarContainer = styled('div')`
  position: relative;
  height: 18px;
  width: 18px;
  margin: 0 2px 0 0;
`;

const StyledStar = styled('span')`
  user-select: none;
  position: absolute;
  font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 48;
`;

const FilledStar = styled(StyledStar)`
  font-variation-settings: 'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 48;
  ${(props) => `clip-path: polygon(0 0, ${props.filledPercentage}% 0, ${props.filledPercentage}% 100%, 0 100%);`}
`;

// filled: 0, .25, .5, .75, 1
function Star({ filled }) {
  let filledPercentage;
  switch (filled) {
    case 0:
      filledPercentage = 0;
      break;
    case 0.25:
      filledPercentage = 44;
      break;
    case 0.5:
      filledPercentage = 50;
      break;
    case 0.75:
      filledPercentage = 56;
      break;
    case 1:
      filledPercentage = 100;
      break;
    default:
      filledPercentage = (Math.round(filled * 4) / 4) * 100;
  }

  return (
    <StarContainer>
      {filledPercentage !== 100 && (
        <StyledStar
          className="material-symbols-outlined"
          filledPercentage={filledPercentage}
        >
          grade
        </StyledStar>
      )}
      {filledPercentage !== 0 && (
        <FilledStar
          data-testid="filled-star"
          className="material-symbols-outlined"
          filledPercentage={filledPercentage}
        >
          grade
        </FilledStar>
      )}
    </StarContainer>
  );
}

Star.propTypes = {
  filled: PropTypes.number.isRequired,
};

export default Star;
