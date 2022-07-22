import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BoldSubHeading, SubHeading } from '../../shared/styles.js';

const Container = styled('div')`
  height: ${(props) => `${props.heightInPx}px`};
  width: ${(props) => `${props.width}`};
  position: relative;
`;

const DropdownStyle = styled('div')`
  user-select: none;
  height: ${(props) => `${props.heightInPx}px`};
  width: ${(props) => `${props.width}`};
  display: flex;
  align-items: center;
  position: absolute;
  padding-left: 15px;
  background-color: #EAF6F6;
  border: 1px solid black;
  &:hover {
    background-color: #cff0f0;
  }
  &:active {
    background-color: #b6e7e7;
  }
`;

const Selector = styled(DropdownStyle)`
  z-index: 50;
`;

const Option = styled(DropdownStyle)`
  border-top: 0;
  z-index: 50;
  top: ${(props) => `${props.heightInPx + props.index * props.heightInPx}px`};
`;

const ArrowStyle = styled('span')`
  margin-left: auto;
  padding-right: 10px;
  z-index: 51;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
`;

function CustomDropdown({
  placeholder, options, width, heightInPx, disabled,
  // below are optional to override open + selected states from a parent
  customOpen, customSetOpen, customSelected, customSetSelected,
}) {
  let [open, setOpen] = useState(false);
  let [selected, setSelected] = useState(placeholder);

  if (customOpen) {
    open = customOpen;
    setOpen = customSetOpen;
  }

  if (customSelected) {
    selected = customSelected;
    setSelected = customSetSelected;
  }

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
      heightInPx={heightInPx}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Selector
        width={width}
        heightInPx={heightInPx}
        onClick={() => {
          if (!disabled) {
            setOpen(!open);
          }
        }}
        className="custom-dropdown-selector"
      >
        <BoldSubHeading>{selected}</BoldSubHeading>
        <ArrowStyle className="material-symbols-outlined">
          {open ? 'expand_less' : 'expand_more'}
        </ArrowStyle>
      </Selector>
      {open && options.map((option, index) => (
        <Option
          width={width}
          heightInPx={heightInPx}
          index={index}
          key={option}
          onClick={() => {
            setSelected(option);
            setOpen(false);
          }}
          className="custom-dropdown-option"
        >
          <SubHeading>{option}</SubHeading>
        </Option>
      ))}
    </Container>
  );
}

CustomDropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  width: PropTypes.string.isRequired,
  heightInPx: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  customOpen: PropTypes.bool,
  customSetOpen: PropTypes.func,
  customSelected: PropTypes.string,
  customSetSelected: PropTypes.func,
};

CustomDropdown.defaultProps = {
  disabled: false,
  placeholder: 'select option',
  customOpen: undefined,
  customSetOpen: undefined,
  customSelected: undefined,
  customSetSelected: undefined,
};

export default CustomDropdown;
