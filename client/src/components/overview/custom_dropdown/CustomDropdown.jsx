import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled('div')`
  height: ${(props) => `${props.height}px`};
  width: ${(props) => `${props.width}px`};
  position: relative;
`;

const DropdownStyle = styled('div')`
  user-select: none;
  height: ${(props) => `${props.height}px`};
  width: ${(props) => `${props.width}px`};
  display: flex;
  align-items: center;
  position: absolute;
  padding-left: 10px;
  background-color: white;
  border: 1px solid black;
  &:hover {
    background-color: rgb(230, 230, 230);
  }
  &:active {
    background-color: rgb(215, 215, 215);
  }
`;

const Selector = styled(DropdownStyle)`
  z-index: 50;
`;

const Option = styled(DropdownStyle)`
  z-index: 49;
  top: ${(props) => `${props.height + props.index * props.height}px`};
`;

const ArrowStyle = styled('span')`
  margin-left: auto;
  padding-right: 10px;
  z-index: 51;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
`;

function CustomDropdown({
  placeholder, options, width, height,
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(placeholder);

  useEffect(() => {
    if (open) {
      const clickListener = () => {
        setOpen(false);
      };
      document.addEventListener('click', clickListener);
      return () => {
        document.removeEventListener('click', clickListener);
      };
    }
    return undefined;
  });

  return (
    <Container
      width={width}
      height={height}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Selector
        width={width}
        height={height}
        onClick={() => {
          setOpen(!open);
        }}
        className="custom-dropdown-selector"
      >
        <p>{selected}</p>
        <ArrowStyle className="material-symbols-outlined">
          {open ? 'expand_less' : 'expand_more'}
        </ArrowStyle>
      </Selector>
      {open && options.map((option, index) => (
        <Option
          width={width}
          height={height}
          index={index}
          key={option}
          onClick={() => {
            setSelected(option);
            setOpen(false);
          }}
          className="custom-dropdown-option"
        >
          {option}
        </Option>
      ))}
    </Container>
  );
}

CustomDropdown.propTypes = {
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default CustomDropdown;
