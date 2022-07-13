import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function ImageList({ photos, currentImgIndex }) {
  return (
    <div>imglist</div>
  );
}

ImageList.propTypes = {
  photos: PropTypes.objectOf(PropTypes.shape({
    thumbnail_url: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })).isRequired,
  currentImgIndex: PropTypes.number.isRequired,
};

export default ImageList;
