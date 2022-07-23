import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ArrowButton from './ArrowButton.jsx';
import ExpandedViewImage from './ExpandedViewImage.jsx';
import ExpandedViewBottomUI from './ExpandedViewBottomUI.jsx';

const ModalBackground = styled('div')`
  ${'' /* background-color: rgba(200, 200, 200, .5); */}
  background-color: #F5EDDC;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 90;
  ${'' /* backdrop-filter: blur(50px); */}
`;

const BottomUIContainer = styled('div')`
  position: fixed;
  bottom: 30px;

`;

const MainImageContainer = styled('div')`
  z-index: 91;
  position: fixed;
  ${(props) => {
    if (!props.isZoomedIn) {
      return `
        top: 30px;
        left: 100px;
        width: calc(100% - 60px - 80px - 60px);
        height: calc(100% - 60px - 70px);
      `;
    }
    return `
        top: 10px;
        left: 10px;
        width: calc(100% - 20px);
        height: calc(100% - 20px);
      `;
  }}
  user-select: none;
  overflow: hidden
`;

const ArrowButtonContainer = styled('div')`
  position: fixed;
  top: calc(50% - 20px - 35px);
  user-select: none;
  cursor: pointer;
`;

const ArrowButtonContainerLeft = styled(ArrowButtonContainer)`
  left: 30px;
`;

const ArrowButtonContainerRight = styled(ArrowButtonContainer)`
  right: 30px;
`;

function ExpandedView({
  photos, currentImgIndex, setCurrentImgIndex, closeView,
}) {
  const [isZoomedIn, setIsZoomedIn] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveListener = (e) => {
      const pos = { x: e.clientX, y: e.clientY };
      setMousePosition(pos);
    };
    document.addEventListener('mousemove', moveListener);
    return () => {
      document.removeEventListener('mousemove', moveListener);
    };
  });

  const showLeftArrow = currentImgIndex !== 0;
  const showRightArrow = currentImgIndex !== photos.length - 1;
  const displayUI = !isZoomedIn;

  const toggleZoom = () => {
    if (isZoomedIn) {
      setIsZoomedIn(false);
    } else {
      setIsZoomedIn(true);
    }
  };

  return (
    <ModalBackground>
      <MainImageContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
        isZoomedIn={isZoomedIn}
      >
        {displayUI
          && showLeftArrow
            && (
              <ArrowButtonContainerLeft
                onClick={() => { setCurrentImgIndex(currentImgIndex - 1); }}
              >
                <ArrowButton
                  size={40}
                  direction="left"
                  zIndex={92}
                />
              </ArrowButtonContainerLeft>
            )}
        {displayUI
          && showRightArrow
            && (
              <ArrowButtonContainerRight
                onClick={() => { setCurrentImgIndex(currentImgIndex + 1); }}
              >
                <ArrowButton
                  size={40}
                  direction="right"
                  zIndex={92}
                />
              </ArrowButtonContainerRight>
            )}
        <ExpandedViewImage
          toggleZoom={toggleZoom}
          url={photos[currentImgIndex].url || '../../../../empty-image.png'}
          isZoomedIn={isZoomedIn}
          mousePosition={mousePosition}
        />
      </MainImageContainer>
      {displayUI
        && (
          <BottomUIContainer>
            <ExpandedViewBottomUI
              listLength={photos.length}
              currentIconIndex={currentImgIndex}
              setCurrentIconIndex={setCurrentImgIndex}
              closeView={closeView}
            />
          </BottomUIContainer>
        )}
    </ModalBackground>
  );
}

ExpandedView.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.shape({
    thumbnail_url: PropTypes.string,
    url: PropTypes.string,
  })).isRequired,
  currentImgIndex: PropTypes.number.isRequired,
  setCurrentImgIndex: PropTypes.func.isRequired,
  closeView: PropTypes.func.isRequired,
};

export default ExpandedView;
