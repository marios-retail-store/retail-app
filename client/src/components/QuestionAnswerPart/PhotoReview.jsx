import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ImagePopupModal from './ImagePopupModal.jsx';

const Image = styled('img')`
border: 1px solid #ddd;
border-radius: 4px;
padding: 5px;
width: 100px;
height:50px;
object-fit:cover;
`;

export default function PhotoReview({ photo }) {
  const [fullScreenWithImg, setFullScreenWithImg] = useState(false);
  const closeView = function () {
    setFullScreenWithImg(!fullScreenWithImg);
  };

  return (
    <div>
      <Image src={photo} alt="display" onClick={() => (setFullScreenWithImg(true))} />
      {fullScreenWithImg
        && <ImagePopupModal url={photo} closeView={() => closeView()} />}
    </div>
  );
}

PhotoReview.propTypes = {
  photo: PropTypes.string.isRequired,
};
