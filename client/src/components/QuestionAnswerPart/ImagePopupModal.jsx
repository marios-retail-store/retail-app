import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ModalBackground = styled('div')`
  background-color: #F5EDDC;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 90;
`;
const UIContainer = styled('div')`
  position: fixed;
  z-index: 92;
  bottom: 30px;
  left: 0;
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
  cursor: pointer;
`;

const CloseIcon = styled('span')`
  width: 24px;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
  transform: scale(.7);
  user-select: none;
`;

const MainImageContainer = styled('div')`
  z-index: 91;
  position: fixed;
  top: 30px;
  left: 100px;
  width: calc(100% - 60px - 80px - 60px);
  height: calc(100% - 60px - 70px);
  user-select: none;
  overflow: hidden
`;

const ImgContainer = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledImg = styled('img')`
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    `;

function ImagePopupModal({ url, closeView }) {
  return (
    <ModalBackground>
      <MainImageContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ImgContainer>
          <StyledImg
            src={url}
          />
        </ImgContainer>
        <UIContainer>
          <CloseButton
            onClick={() => closeView()}
          >
            <CloseIcon className="material-symbols-outlined">
              close
            </CloseIcon>
          </CloseButton>
        </UIContainer>
      </MainImageContainer>
    </ModalBackground>
  );
}

ImagePopupModal.propTypes = {
  url: PropTypes.string.isRequired,
  closeView: PropTypes.func.isRequired,
};

export default ImagePopupModal;
