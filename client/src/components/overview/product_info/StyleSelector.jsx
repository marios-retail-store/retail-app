import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import StyleThumbnail from './StyleThumbnail.jsx';
import { SuperBoldSubHeading, SubHeading } from '../../shared/styles.js';

const Container = styled('div')`
  margin-top: 25px;
`;

const StylesContainer = styled('div')`
  display: grid;
  grid-template-columns: min-content min-content min-content min-content;
  column-gap: 15px;
  row-gap: 15px;
  margin-top: 15px;
`;

function StyleSelector({ styles }) {
  // lift later
  const [selectedStyleIndex, setSelectedStyleIndex] = useState(0);

  return (
    <Container>
      <SubHeading>
        <SuperBoldSubHeading style={{ display: 'inline' }}>{'Style > '}</SuperBoldSubHeading>
        {`${styles.results[selectedStyleIndex].name}`}
      </SubHeading>
      <StylesContainer>
        {styles.results.map((style, index) => (
          <StyleThumbnail
            key={style.style_id}
            style={style}
            selected={index === selectedStyleIndex}
            selectStyle={() => setSelectedStyleIndex(index)}
          />
        ))}
      </StylesContainer>
    </Container>
  );
}

StyleSelector.propTypes = {
  styles: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      photos: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string,
        thumbnail_url: PropTypes.string,
      })).isRequired,
    })).isRequired,
  }).isRequired,
};

export default StyleSelector;
