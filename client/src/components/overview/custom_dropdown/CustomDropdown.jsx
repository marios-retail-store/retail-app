import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const heigth = 40;

const Container = styled('div')`
  height: ${heigth}px;
  width: 100px;
  position: relative;
`;

const DropdownStyle = styled('div')`
  height: ${heigth}px;
  width: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  padding-left: 10px;
  background-color: white;
  border: 1px solid black;
  &:hover {
    background-color: rgb(230, 230, 230);
  }
`;

const Selector = styled(DropdownStyle)`
  z-index: 99;
`;

const Option = styled(DropdownStyle)`
  z-index: 98;
  top: ${(props) => `${heigth + props.index * heigth}px`};
`;

function CustomDropdown({ placeholder, options }) {
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
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Selector
        onClick={() => {
          setOpen(!open);
        }}
      >
        {selected}
      </Selector>
      {open && options.map((option, index) => (
        <Option
          index={index}
          key={option}
          onClick={() => {
            setSelected(option);
            setOpen(false);
          }}
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
};

export default CustomDropdown;
