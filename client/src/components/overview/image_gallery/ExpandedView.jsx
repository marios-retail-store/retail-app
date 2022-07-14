import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ArrowButton from './ArrowButton.jsx';
import IconList from './IconList.jsx';

const BlackBackground = styled('div')`
  background-color: rgba(0, 0, 0, .5);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 90;
  backdrop-filter: blur(5px);
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

const StyledImg = styled('img')`
  height: 100%;
  width: 100%;
  object-fit: contain;
  ${(props) => {
    if (props.isZoomedIn) {
      return `
        transform: scale(2.5);
      `;
    }
    return '';
  }}
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

function ExpandedView({ photos, currentImgIndex, setCurrentImgIndex }) {
  const [isZoomedIn, setIsZoomedIn] = useState(false);
  const [mousePosition, setMousePosition] = useState([0, 0]);

  useEffect(() => {
    if (isZoomedIn) {
      const moveListener = (e) => {
        mousePosition[0] = e.clientX;
        mousePosition[1] = e.clientY;
        setMousePosition(mousePosition);
        console.log(mousePosition);
      };
      document.addEventListener('mousemove', moveListener);
      return () => {
        document.removeEventListener('mousemove', moveListener);
      };
    }
    return undefined;
  });

  const showLeftArrow = currentImgIndex !== 0;
  const showRightArrow = currentImgIndex !== photos.length - 1;
  const displayUI = !isZoomedIn;

  const toggleZoom = () => {
    if (isZoomedIn) {
      setIsZoomedIn(false);
    } else {
      console.log('zooming');
      setIsZoomedIn(true);
    }
  };

  return (
    <BlackBackground>
      <MainImageContainer
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
                  zIndex="92"
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
        <StyledImg
          onClick={toggleZoom}
          draggable="false"
          src={photos[currentImgIndex].url}
          isZoomedIn={isZoomedIn}
        />
      </MainImageContainer>
      {displayUI
        && (
          <IconList
            listLength={photos.length}
            currentIconIndex={currentImgIndex}
            setCurrentIconIndex={setCurrentImgIndex}
          />
        )}
    </BlackBackground>
  );
}

ExpandedView.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.shape({
    thumbnail_url: PropTypes.string,
    url: PropTypes.string,
  })).isRequired,
  currentImgIndex: PropTypes.number.isRequired,
  setCurrentImgIndex: PropTypes.func.isRequired,
};

export default ExpandedView;
