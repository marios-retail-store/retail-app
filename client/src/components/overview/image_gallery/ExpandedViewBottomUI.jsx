import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import IconList from './IconList.jsx';

const Container = styled('div')`
  position: fixed;
  z-index: 92;
  bottom: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const CloseButton = styled('div')`
  height: 40px;
  width: 40px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;
`;

const CloseIcon = styled('span')`
  width: 24px;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
  transform: scale(.7);
  user-select: none;
`;

function ExpandedViewBottomUI({
  listLength, currentIconIndex, setCurrentIconIndex, closeView,
}) {
  return (
    <Container>
      <IconList
        listLength={listLength}
        currentIconIndex={currentIconIndex}
        setCurrentIconIndex={setCurrentIconIndex}
      />
      <CloseButton
        onClick={closeView}
      >
        <CloseIcon className="material-symbols-outlined">
          close
        </CloseIcon>
      </CloseButton>
    </Container>
  );
}

ExpandedViewBottomUI.propTypes = {
  listLength: PropTypes.number.isRequired,
  currentIconIndex: PropTypes.number.isRequired,
  setCurrentIconIndex: PropTypes.func.isRequired,
  closeView: PropTypes.func.isRequired,
};

export default ExpandedViewBottomUI;
