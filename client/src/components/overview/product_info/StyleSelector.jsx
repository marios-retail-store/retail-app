import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { styles } from '../exampledata.js';
import Style from './Style.jsx';

const StyleContainer = styled('div')`
  display: grid;
  grid-template-columns: min-content min-content min-content min-content;
  margin: 5px 0;
`;

function StyleSelector() {
  // lift later
  const [selectedStyleIndex, setSelectedStyleIndex] = useState(0);

  return (
    <StyleContainer>
      {styles.results.map((style, index) => (
        <Style
          key={style.style_id}
          style={style}
          selected={index === selectedStyleIndex}
          selectStyle={() => setSelectedStyleIndex(index)}
        />
      ))}
    </StyleContainer>
  );
}

StyleSelector.propTypes = {

};

export default StyleSelector;
