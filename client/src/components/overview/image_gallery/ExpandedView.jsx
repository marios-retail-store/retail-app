import React, { useState } from 'react';
import styled from 'styled-components';
import ArrowButton from './ArrowButton.jsx'

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
    } else {
      return `
        top: 30px;
        left: 30px;
        width: calc(100% - 60px);
        height: calc(100% - 60px);
      `;
    }
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

const IconContainer = styled('div')`
  position: fixed;
  z-index: 92;
  bottom: 30px;
  height: 40px;
  ${(props) => {
    // margin is 5px either side
    // icon is 24px wide
    // so 34px per icon + extra 5 on each end
    const width = 10 + 34 * props.photoCount;
    return `
      width: ${width}px;
      left: calc(50% - ${width / 2}px);
    `
  }}
  background-color: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled('span')`
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
  user-select: none;
  cursor: pointer;
  margin: 0 5px;
`;

const IconSelected = styled(Icon)`
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48;
  cursor: default;
`;

function ExpandedView({ photos, currentImgIndex, setCurrentImgIndex }) {
  const [isZoomedIn, setIsZoomedIn] = useState(false);

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
  }

  return (
    <BlackBackground>
      <MainImageContainer
        isZoomedIn={isZoomedIn}
      >
        {displayUI &&
          showLeftArrow &&
            <ArrowButtonContainerLeft
              onClick={() => {setCurrentImgIndex(currentImgIndex - 1)}}
            >
              <ArrowButton
                size={40}
                direction="left"
                zIndex="92"
              />
            </ArrowButtonContainerLeft>
        }
        {displayUI &&
          showRightArrow &&
            <ArrowButtonContainerRight
              onClick={() => {setCurrentImgIndex(currentImgIndex + 1)}}
            >
              <ArrowButton
                size={40}
                direction="right"
                zIndex={92}
              />
            </ArrowButtonContainerRight>
        }
        <StyledImg
          onClick={toggleZoom}
          draggable="false"
          src={photos[currentImgIndex].url}
          isZoomedIn={isZoomedIn}
        />
      </MainImageContainer>
      {displayUI &&
        <IconContainer
          photoCount={photos.length}
        >
          {photos.map((photo, index) => {
            if (index === currentImgIndex) {
              return (
                <IconSelected className="material-symbols-outlined">
                  fiber_manual_record
                </IconSelected>
              )
            }
            return (
              <Icon
                className="material-symbols-outlined"
                onClick={() => {setCurrentImgIndex(index)}}
              >
                fiber_manual_record
              </Icon>
            );
          })}
        </IconContainer>
      }
    </BlackBackground>
  );
}

export default ExpandedView;
