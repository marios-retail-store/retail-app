import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const IconContainer = styled('div')`
  height: 40px;
  ${(props) => {
    // margin is 5px either side
    // icon is 24px wide
    // so 34px per icon + extra 5 on each end
    const width = 10 + 34 * props.listLength;
    return `
      width: ${width}px;
      ${'' /* left: calc(50% - ${width / 2}px); */}
    `;
  }}
  background-color: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled('span')`
  width: 24px;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
  transform: scale(.75);
  user-select: none;
  cursor: pointer;
  margin: 0 5px;
`;

const IconSelected = styled(Icon)`
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48;
  transform: scale(1);
  cursor: default;
`;

function IconList({ listLength, currentIconIndex, setCurrentIconIndex }) {
  return (
    <IconContainer
      listLength={listLength}
    >
      {[...new Array(listLength)].map((v, index) => {
        if (index === currentIconIndex) {
          return (
            <IconSelected
              // check if this causes problems------------------------------------------------
              data-testid="selected-icon"
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className="material-symbols-outlined"
            >
              fiber_manual_record
            </IconSelected>
          );
        }
        return (
          <Icon
            // check if this causes problems------------------------------------------------
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="material-symbols-outlined"
            onClick={() => { setCurrentIconIndex(index); }}
          >
            fiber_manual_record
          </Icon>
        );
      })}
    </IconContainer>
  );
}

IconList.propTypes = {
  listLength: PropTypes.number.isRequired,
  currentIconIndex: PropTypes.number.isRequired,
  setCurrentIconIndex: PropTypes.func.isRequired,
};

export default IconList;
