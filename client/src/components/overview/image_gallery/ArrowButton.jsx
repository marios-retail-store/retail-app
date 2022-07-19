import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonContainer = styled('div')`
  border-radius: 5px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${(props) => `${props.size}px`};
  width: ${(props) => `${props.size}px`};
  z-index: ${(props) => props.zIndex};
`;

const StyledButton = styled('span')`
  z-index: ${(props) => props.zIndex + 1};
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
`;

function ArrowButton({ direction, size, zIndex }) {
  return (
    <ButtonContainer
      size={size}
      zIndex={zIndex}
    >
      <StyledButton zIndex={zIndex} className="material-symbols-outlined">
        {`chevron_${direction}`}
      </StyledButton>
    </ButtonContainer>
  );
}

ArrowButton.propTypes = {
  direction: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  zIndex: PropTypes.number.isRequired,
};

export default ArrowButton;
