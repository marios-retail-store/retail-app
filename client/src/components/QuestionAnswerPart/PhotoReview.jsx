import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ImagePopupModal from './ImagePopupModal.jsx';

const Image = styled('img')`
border: 1px solid #ddd;
border-radius: 4px;
padding: 5px;
width: 200px;
`;

export default function PhotoReview({ photo }) {
  // const [enlarge, setEnlarge] = useState(false);
  // const handlePhoto = function () {
  //   setEnlarge(!enlarge);
  // };
  const [fullScreenWithImg, setFullScreenWithImg] = useState(false);
  const closeView = function () {
    setFullScreenWithImg(!fullScreenWithImg);
  };

  return (
    // <div>
    //   <a href={photo}>
    //     <Image src={photo} alt="answerPhoto" />
    //   </a>
    // </div>
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
