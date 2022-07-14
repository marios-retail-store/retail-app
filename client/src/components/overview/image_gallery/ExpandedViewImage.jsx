import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledImg = styled('img')`
  height: 100%;
  width: 100%;
  object-fit: contain;
  ${(props) => {
    if (props.isZoomedIn) {
      return `
        object-fit: none;
        ${'' /* transform: scale(2.5) translate(${props.mousePosition.x}px, ${props.mousePosition.y}px); */}
        transform: scale(2.5) translate(50%, 0);

      `;
    }
    return '';
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
  // const position = moveTowards(lastMousePosition, mousePosition, 0.05 * timeSinceLastMove);
  return (
    <StyledImg
      onClick={toggleZoom}
      draggable="false"
      src={url}
      isZoomedIn={isZoomedIn}
      mousePosition={mousePosition}
      style={{
        // transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
      }}
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
