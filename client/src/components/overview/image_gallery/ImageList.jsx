import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ListContainer = styled('div')`
  position: absolute;
  display: flex;
  bottom: 15px;
`;

const ImgThumbnailContainer = styled('div')`
  height: 55px;
  width: 55px;
  margin: 0 5px;
`;

const ImgThumbnail = styled('img')`
  cursor: pointer;
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: 1;
  border: 2px solid rgba(0, 0, 0, 0);
`;

const ImgThumbnailHighlight = styled(ImgThumbnail)`
  cursor: default;
  border: 2px solid white;
`;

const EmptyArrowContainer = styled('div')`
  height: 55px;
  width: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  z-index: 2;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
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
          <EmptyArrowContainer>
            {renderLeftButton && (
              <ArrowContainer
                onClick={() => { shiftList('left'); }}
              >
                <Arrow className="material-symbols-outlined">
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
        const imgThumbnail = currentImgIndex === index
          ? <ImgThumbnailHighlight draggable="false" onClick={onClick} src={photo.thumbnail_url} />
          : <ImgThumbnail draggable="false" onClick={onClick} src={photo.thumbnail_url} />;
        return (
          <ImgThumbnailContainer>
            {imgThumbnail}
          </ImgThumbnailContainer>
        );
      })}
      {
        renderButtonContainers && (
          <EmptyArrowContainer>
            {renderRightButton && (
              <ArrowContainer
                onClick={() => { shiftList('right'); }}
              >
                <Arrow className="material-symbols-outlined">
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
  photos: PropTypes.objectOf(PropTypes.shape({
    thumbnail_url: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })).isRequired,
  currentImgIndex: PropTypes.number.isRequired,
  setCurrentImgIndex: PropTypes.func.isRequired,
  minIndexInList: PropTypes.number.isRequired,
  maxIndexInList: PropTypes.number.isRequired,
  shiftList: PropTypes.func.isRequired,
};

export default ImageList;
