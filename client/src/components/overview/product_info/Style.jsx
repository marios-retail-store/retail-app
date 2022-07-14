import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// div for now without internet
const StyleImg = styled('div')`
  border-radius: 50%;
  height: 50px;
  width: 50px;
  margin: 5px;
  background-color: grey;
  border: 2px solid rgba(0, 0, 0, 0);
  ${(props) => props.selected && 'border: 2px solid red;'};
`;

function Style({ style, selected, selectStyle }) {
  return (
    <StyleImg
      selected={selected}
      onClick={selectStyle}
      src={style.photos[0].thumbnail_url}
      alt="product thumbnail for style selector"
    />
  );
}

Style.propTypes = {
  style: PropTypes.shape({
    photos: PropTypes.arrayOf(PropTypes.shape({
      thumbnail_url: PropTypes.string,
      url: PropTypes.string,
    })).isRequired,
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  selectStyle: PropTypes.func.isRequired,
};

export default Style;
