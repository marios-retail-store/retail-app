import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Image = styled('img')`
border: 1px solid #ddd;
border-radius: 4px;
padding: 5px;
width: 200px;
`;

export default function AnswerPhotos({ photo }) {
  // const [enlarge, setEnlarge] = useState(false);
  // const handlePhoto = function () {
  //   setEnlarge(!enlarge);
  // };

  return (
    <div>
      <a href={photo}>
        <Image src={photo} alt="answerPhoto" />
      </a>
    </div>
    // <div>
    //   <Image src={photo} alt="display" onClick={() => handlePhoto()} onKeyDown={handlePhoto} />
    //   {enlarge && (
    //   <div>
    //     <button type="button" onClick={() => handlePhoto()}>X</button>
    //     <img src={photo} alt="display" />
    //   </div>
    //   )}
    // </div>
  );
}

AnswerPhotos.propTypes = {
  photo: PropTypes.string.isRequired,
};
