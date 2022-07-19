import React, { useState } from 'react';
import PropTypes from 'prop-types';
//import styled from 'styled-components';

export default function AnswerPhotos({ photo }) {
  const [enlarge, setEnlarge] = useState(false);
  const handlePhoto = function () {
    setEnlarge(!enlarge);
  };

  return (
    <div>
      <img src={photo} alt="display" onClick={() => handlePhoto()} onKeyDown={handlePhoto} />
      {enlarge && (
      <div>
        <button type="button" onClick={() => handlePhoto()}>X</button>
        <img src={photo} alt="display" />
      </div>
      )}
    </div>
  );
}

AnswerPhotos.propTypes = {
  photo: PropTypes.string.isRequired,
};
