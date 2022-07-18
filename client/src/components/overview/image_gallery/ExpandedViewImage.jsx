import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled('div')`
  height: 100%;
  width: 100%;
`;

const StyledImg = styled('img')`
  ${(props) => {
    if (!props.isZoomedIn) {
      return `
        height: 100%;
        width: 100%;
        object-fit: contain;
      `;
    }
    return `
      height: 250%;
      width: auto;
      transform: translate(${props.imgOffset.x}px, ${props.imgOffset.y}px);
    `;
  }}
`;

function ExpandedViewImage({
  toggleZoom, url, isZoomedIn, mousePosition,
}) {
  const img = useRef(null);
  const container = useRef(null);

  const [containerSize, setContainerSize] = useState({ x: 0, y: 0 })
  const [imgSize, setImgSize] = useState({ x: 0, y: 0 })

  const screenSize = {
    x: window.innerWidth,
    y: window.innerHeight,
  };

  const mousePercentage = {
    x: mousePosition.x / screenSize.x,
    y: mousePosition.y / screenSize.y,
  };

  useEffect(() => {
    setContainerSize({
      x: container.current.clientWidth,
      y: container.current.clientHeight,
    });
    setImgSize({
      x: img.current.clientWidth,
      y: img.current.clientHeight,
    });
  }, [isZoomedIn]);

  // when mouse is in the middle: 50
  // - get difference between container and img
  // - offset is -half that difference
  // when mouse is at left: 0
  // - get difference between container and img
  // - offset is 0
  // when mouse is at right: 100
  // - get difference between container and img
  // - offset is -that difference
  const imgOffset = {
    x: mousePercentage.x * (containerSize.x - imgSize.x),
    y: mousePercentage.y * (containerSize.y - imgSize.y),
  };

  return (
    <Container ref={container}>
      <StyledImg
        ref={img}
        onClick={toggleZoom}
        draggable="false"
        src={url}
        isZoomedIn={isZoomedIn}
        imgOffset={imgOffset}
      />
    </Container>
  );
}

ExpandedViewImage.propTypes = {
  toggleZoom: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  isZoomedIn: PropTypes.bool.isRequired,
  mousePosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

export default ExpandedViewImage;
