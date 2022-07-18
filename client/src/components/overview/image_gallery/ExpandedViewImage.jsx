import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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
      object-fit: none;
      ${'' /* transform: scale(2.5) translate(
        calc(${props.imagePosition.x}%),
        calc(${props.imagePosition.y}%)
      ); */}
      height: ${props.screenSize.x}px;
      width: calc(${props.screenSize.y}px);
      transform: scale(2.5) translate(
        calc(${props.imagePosition.x}%),
        calc(${props.imagePosition.y}%)
      );
    `;
  }}
`;

// const moveTowards = (old, target, maxDifference) => {
//   if (old.x === 0 && old.y === 0) {
//     return target;
//   }
//   console.log([maxDifference]);
//   const diff = {
//     x: target.x - old.x,
//     y: target.y - old.y,
//   };
//   const diffSize = Math.sqrt(diff.x ** 2 + diff.y ** 2);
//   console.log('diffSize:', diffSize);
//   if (diffSize <= maxDifference) {
//     return target;
//   }
//   return {
//     x: old.x + (diff.x / diffSize) * maxDifference,
//     y: old.y + (diff.y / diffSize) * maxDifference,
//   };
// };

function ExpandedViewImage({
  toggleZoom, url, isZoomedIn, mousePosition, lastMousePosition, timeSinceLastMove,
}) {
  // const screenDimensions
  const [imageContainerDimensions, setImageContainerDimensions] = useState({ x: 0, y: 0 });
  const [screenDimensions, setScreenDimensions] = useState({ x: 0, y: 0 });
  const img = useRef(null);
  // const position = moveTowards(lastMousePosition, mousePosition, 0.05 * timeSinceLastMove);

  useEffect(() => {
    if (img !== null) {
      setImageContainerDimensions({
        x: img.current.parentNode.clientWidth,
        y: img.current.parentNode.clientHeight,
      });
      setScreenDimensions({
        x: img.current.parentNode.parentNode.clientWidth,
        y: img.current.parentNode.parentNode.clientHeight,
      });
    }
  }, []);

  const borderThickness = {
    x: 10,
    y: 10,
  };

  const screenSize = {
    x: window.innerWidth,
    y: window.innerHeight,
  };

  const mouse0to1 = {
    x: mousePosition.x / screenSize.x,
    y: mousePosition.y / screenSize.y,
  };

  const mouse0to1Flipped = {
    x: (mouse0to1.x - 1) * -1,
    y: (mouse0to1.y - 1) * -1,
  };

  const imagePosition = {
    x: mouse0to1Flipped.x * 100 - 50,
    y: mouse0to1Flipped.y * 100 - 50,
  };

  // at mouse 0: offset should be -half screen size
  // at mouse 1: offset should be half screen size
  // const imageOffset = {
  //   x: screenSize.x * mouse0to1.x - screenSize.x / 2,
  //   y: screenSize.y * mouse0to1.y - screenSize.y / 2,
  // };

  const imageOffset = {
    x: 0,
    y: 0,
  };

  console.log(screenSize, imageOffset);

  return (
    <StyledImg
      ref={img}
      onClick={toggleZoom}
      draggable="false"
      src={url}
      isZoomedIn={isZoomedIn}
      imagePosition={imagePosition}
      imageOffset={imageOffset}
      screenSize={screenSize}
    />
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
  lastMousePosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  timeSinceLastMove: PropTypes.number.isRequired,
};

export default ExpandedViewImage;
