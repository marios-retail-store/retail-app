import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ImageList from './ImageList.jsx';
import ExpandedView from './ExpandedView.jsx';

const ImageGalleryContainer = styled('div')`
  position: relative;
  height: 100%;
  min-height: 600px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ErrorMsg = styled('p')`
  color: gray;
`;

const ImageContainer = styled('div')`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledImg = styled('img')`
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: 0;
  cursor: zoom-in;
`;

const ArrowContainer = styled('div')`
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  top: calc(50% - 15px);
  height: 40px;
  width: 40px;
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

function ImageGallery({ style }) {
  const { photos } = style;

  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [minIndexInList, setMinIndexInList] = useState(0);
  const [maxIndexInList, setMaxIndexInList] = useState(Math.min(photos.length, 6));
  const [inExpandedState, setInExpandedState] = useState(false);

  const shiftList = (direction) => {
    if (direction === 'left') {
      setMinIndexInList(minIndexInList - 1);
      setMaxIndexInList(maxIndexInList - 1);
    } else /* right */ {
      setMinIndexInList(minIndexInList + 1);
      setMaxIndexInList(maxIndexInList + 1);
    }
  };

  const setCurrentImgIndexWrapper = (index) => {
    if (index > maxIndexInList) {
      setMinIndexInList(index - 6);
      setMaxIndexInList(index);
    } else if (index < minIndexInList) {
      setMinIndexInList(index);
      setMaxIndexInList(index + 6);
    }
    setCurrentImgIndex(index);
  };

  const imageUrl = photos[currentImgIndex].url || '../../../../empty-image.png';

  return (
    <>
      {inExpandedState && (
        <ExpandedView
          photos={photos}
          currentImgIndex={currentImgIndex}
          setCurrentImgIndex={setCurrentImgIndex}
          closeView={() => { setInExpandedState(false); }}
        />
      )}
      <ImageGalleryContainer>
        <ImageContainer
          onClick={() => { setInExpandedState(true); }}
        >
          <StyledImg draggable="false" src={imageUrl} alt="product image" />
        </ImageContainer>
        {currentImgIndex > 0 && (
          <ArrowContainerLeft
            onClick={() => { setCurrentImgIndexWrapper(currentImgIndex - 1); }}
          >
            <Arrow
              data-testid="main-left-arrow"
              className="material-symbols-outlined"
            >
              chevron_left
            </Arrow>
          </ArrowContainerLeft>
        )}
        {currentImgIndex < photos.length - 1 && (
          <ArrowContainerRight
            onClick={() => { setCurrentImgIndexWrapper(currentImgIndex + 1); }}
          >
            <Arrow
              data-testid="main-right-arrow"
              className="material-symbols-outlined"
            >
              chevron_right
            </Arrow>
          </ArrowContainerRight>
        )}
        <ImageList
          photos={photos}
          currentImgIndex={currentImgIndex}
          setCurrentImgIndex={setCurrentImgIndex}
          minIndexInList={minIndexInList}
          maxIndexInList={maxIndexInList}
          shiftList={shiftList}
        />
      </ImageGalleryContainer>
    </>
  );
}

ImageGallery.propTypes = {
  style: PropTypes.shape({
    photos: PropTypes.arrayOf(PropTypes.shape({
      thumbnail_url: PropTypes.string,
      url: PropTypes.string,
    })).isRequired,
  }).isRequired,
};

export default ImageGallery;
