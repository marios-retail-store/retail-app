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
        cursor: url("data:image/svg+xml;utf8,
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><polygon
          points='0,11 0,13 11,13, 11,24, 13,24, 13,13 24,13 24,11, 13,11 13,0 11,0 11,11'
          stroke='white' stroke-width='.75'
        /></svg>
      ") 12 12, pointer;
      `;
    }
    return `
      height: 250%;
      width: auto;
      cursor: url("data:image/svg+xml;utf8,
      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><polygon
        points='0,11 0,13 24,13 24,11'
        stroke='white' stroke-width='.75'
      /></svg>
      ") 12 12, pointer;
    `;
  }}
`;

function ExpandedViewImage({
  toggleZoom, url, isZoomedIn, mousePosition,
}) {
  const img = useRef(null);
  const container = useRef(null);

  const [containerSize, setContainerSize] = useState({ x: 0, y: 0 });
  const [imgSize, setImgSize] = useState({ x: 0, y: 0 });

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

  const imgOffset = {
    x: containerSize.x < imgSize.x
      ? mousePercentage.x * (containerSize.x - imgSize.x) // displace image to inverse follow mouse
      : (containerSize.x - imgSize.x) / 2, // if container is bigger than img, center img
    y: containerSize.y < imgSize.y
      ? mousePercentage.y * (containerSize.y - imgSize.y)
      : (containerSize.y - imgSize.y) / 2,
  };

  let style = {};

  if (isZoomedIn) {
    style = {
      transform: `translate(${imgOffset.x}px, ${imgOffset.y}px)`,
    };
  }

  return (
    <Container ref={container}>
      <StyledImg
        ref={img}
        onClick={toggleZoom}
        draggable="false"
        src={url}
        isZoomedIn={isZoomedIn}
        imgOffset={imgOffset}
        style={style}
        alt="expanded view of product"
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
