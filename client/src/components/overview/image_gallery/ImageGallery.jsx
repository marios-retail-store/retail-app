import React, { useState } from 'react';
import styled from 'styled-components';
import { style } from '../exampledata.js';
import ImageList from './ImageList.jsx';

const ImgContainer = styled('div')`
  position: relative;
  height: 600px;
  width: 600px;
`;

const StyledImg = styled('img')`
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: 0;
`;

const ArrowContainer = styled('div')`
  cursor: pointer;
  position: absolute;
  display: flex;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  top: calc(50% - 15px);
  height: 30px;
  width: 30px;
  z-index: 1;
`;

const ArrowContainerLeft = styled(ArrowContainer)`
  left: 15px;
`;

const ArrowContainerRight = styled(ArrowContainer)`
  right: 15px;
`;

const Arrow = styled('span')`
  z-index: 2;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
`;

function ImageGallery() {
  const { photos } = style;

  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  return (
    <div>
      <ImgContainer>
        <StyledImg src={photos[currentImgIndex].url} />
        {currentImgIndex > 0 && (
          <ArrowContainerLeft
            onClick={() => { setCurrentImgIndex(currentImgIndex - 1); }}
          >
            <Arrow className="material-symbols-outlined">
              chevron_left
            </Arrow>
          </ArrowContainerLeft>
        )}
        {currentImgIndex < photos.length - 1 && (
          <ArrowContainerRight
            onClick={() => { setCurrentImgIndex(currentImgIndex + 1); }}
          >
            <Arrow className="material-symbols-outlined">
              chevron_right
            </Arrow>
          </ArrowContainerRight>
        )}
        <ImageList
          photos={photos}
          currentImgIndex={currentImgIndex}
        />
      </ImgContainer>
    </div>
  );
}

export default ImageGallery;
