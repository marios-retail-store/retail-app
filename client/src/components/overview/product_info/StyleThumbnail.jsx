import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled('div')`
  position: relative;
  height: 60px;
  width: 60px;
`;

const CheckMarkContainer = styled('div')`
  height: 50px;
  width: 50px;
  top: 0;
  left: 0;
  background-color: rgb(255, 255, 255, .8);
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  margin: 5px;
  border-radius: 50%;
`;

const CheckMark = styled('span')`
  font-variation-settings: 'FILL' 0, 'wght' 800, 'GRAD' 0, 'opsz' 48;
`;

// div for now without internet
const StyleImg = styled('img')`
  height: 50px;
  width: 50px;
  left: 0;
  position: absolute;
  object-fit: cover;
  user-select: none;
  margin: 5px;
  border-radius: 50%;
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
