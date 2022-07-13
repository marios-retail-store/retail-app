import React from 'react';
import styled from 'styled-components';

const BlackBackground = styled('div')`
  background-color: rgba(0, 0, 0, .9);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 90;
`;

const MainImageContainer = styled('div')`
  z-index: 91;
  position: fixed;
  background-color: white;
  top: 30px;
  left: 30px;
  width: calc(100% - 60px);
  height: calc(100% - 60px);
`;

function ExpandedView({ photos, currentImgIndex }) {
  return (
    <BlackBackground>
      <MainImageContainer>
        <img src={photos[currentImgIndex].} />
      </MainImageContainer>
    </BlackBackground>
  );
}

export default ExpandedView;
