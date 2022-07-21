import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled('div')`
  position: relative;
  height: 60px;
  width: 60px;
`;

const CheckMarkContainer = styled('div')`
  height: 60px;
  width: 60px;
  top: 0;
  left: 0;
  background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
  border: 1px solid white;
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  border-radius: 50%;
`;

const CheckMark = styled('span')`
  font-variation-settings: 'FILL' 0, 'wght' 800, 'GRAD' 25, 'opsz' 48;
`;

// div for now without internet
const StyleImg = styled('img')`
  height: 60px;
  width: 60px;
  left: 0;
  position: absolute;
  object-fit: cover;
  user-select: none;
  border-radius: 50%;
  border: 1px solid white;
`;

function StyleThumbnail({ style, selected, selectStyle }) {
  return (
    <Container>
      <StyleImg
        onClick={selectStyle}
        src={style.photos[0].thumbnail_url}
        alt="thumbnail in style selector"
        draggable="false"
      />
      {selected && (
        <CheckMarkContainer>
          <CheckMark className="material-symbols-outlined">
            check
          </CheckMark>
        </CheckMarkContainer>
      )}
    </Container>
  );
}

StyleThumbnail.propTypes = {
  style: PropTypes.shape({
    photos: PropTypes.arrayOf(PropTypes.shape({
      thumbnail_url: PropTypes.string,
      url: PropTypes.string,
    })).isRequired,
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  selectStyle: PropTypes.func.isRequired,
};

export default StyleThumbnail;
