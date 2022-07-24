import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ListContainer = styled('div')`
  position: absolute;
  display: flex;
  bottom: 15px;
`;

const ThumbnailContainer = styled('div')`
  position: relative;
  height: 55px;
  width: 55px;
  margin: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
  cursor: pointer;
  border-radius: 5px;
  overflow: hidden;
`;

const ThumbnailContainerHighlight = styled(ThumbnailContainer)`
  cursor: default;
`;

const HighlightOverlay = styled('div')`
  position: absolute;
  height: 55px;
  width: 55px;
  background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
  z-index: 1;
  border-radius: 5px;
`;

const ImgThumbnail = styled('img')`
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: 0;
`;

const EmptyArrowContainer = styled('div')`
  height: 55px;
  width: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

const ArrowContainer = styled('div')`
  cursor: pointer;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  z-index: 1;
  border-radius: 5px;
`;

const Arrow = styled('span')`
  user-select: none;
  z-index: 2;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
`;

const ErrorCross = styled('span')`
  user-select: none;
  color: gray;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
  cursor: pointer;
`;

function ImageList({
  photos, currentImgIndex, setCurrentImgIndex,
  minIndexInList, maxIndexInList, shiftList,
}) {
  const renderLeftButton = minIndexInList > 0;
  const renderRightButton = maxIndexInList < photos.length - 1;
  const renderButtonContainers = renderLeftButton || renderRightButton;
  return (
    <ListContainer>
      {
        renderButtonContainers && (
          // the empty arrow containers ensures that the list always stays centered
          // eg. only one arrow is showing, but both empty containers still exist
          <EmptyArrowContainer data-testid="list-left-empty-arrow-container">
            {renderLeftButton && (
              <ArrowContainer
                onClick={() => { shiftList('left'); }}
              >
                <Arrow
                  className="material-symbols-outlined"
                  data-testid="list-left-arrow"
                >
                  chevron_left
                </Arrow>
              </ArrowContainer>
            )}
          </EmptyArrowContainer>
        )
      }
      {photos.map((photo, index) => {
        if (index < minIndexInList || index > maxIndexInList) {
          return undefined;
        }
        const onClick = () => { setCurrentImgIndex(index); };
        let thumbnailUrl = photo.thumbnail_url;
        if (thumbnailUrl === null) {
          thumbnailUrl = '../../../../empty-image.png';
        } else {
          // keep at 60px instead of the 55px used for this container, as style selector uses 60px
          thumbnailUrl = thumbnailUrl.split('&w=');
          thumbnailUrl[1] = '60&h=60&q=60';
          thumbnailUrl = thumbnailUrl.join('&w=');
        }
        if (index === currentImgIndex) {
          return (
            <ThumbnailContainerHighlight
              // have to add index as api has duplicate images
              key={photo.thumbnail_url + index.toString()}
            >
              <HighlightOverlay />
              <ImgThumbnail draggable="false" onClick={onClick} src={thumbnailUrl} alt="thumbnail of different product view in list" />
            </ThumbnailContainerHighlight>
          );
        }
        return (
          <ThumbnailContainer
            // have to add index as api has duplicate images
            key={photo.thumbnail_url + index.toString()}
          >
            <ImgThumbnail draggable="false" onClick={onClick} src={thumbnailUrl} alt="thumbnail of different product view in list" />
          </ThumbnailContainer>
        );
      })}
      {
        renderButtonContainers && (
          <EmptyArrowContainer data-testid="list-right-empty-arrow-container">
            {renderRightButton && (
              <ArrowContainer
                onClick={() => { shiftList('right'); }}
              >
                <Arrow
                  className="material-symbols-outlined"
                  data-testid="list-right-arrow"
                >
                  chevron_right
                </Arrow>
              </ArrowContainer>
            )}
          </EmptyArrowContainer>
        )
      }
    </ListContainer>
  );
}

ImageList.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.shape({
    thumbnail_url: PropTypes.string,
    url: PropTypes.string,
  })).isRequired,
  currentImgIndex: PropTypes.number.isRequired,
  setCurrentImgIndex: PropTypes.func.isRequired,
  minIndexInList: PropTypes.number.isRequired,
  maxIndexInList: PropTypes.number.isRequired,
  shiftList: PropTypes.func.isRequired,
};

export default ImageList;
