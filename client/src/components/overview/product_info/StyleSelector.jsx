import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import StyleThumbnail from './StyleThumbnail.jsx';

const StyleContainer = styled('div')`
  display: grid;
  grid-template-columns: min-content min-content min-content min-content;
  margin: 5px 0;
`;

function StyleSelector({ styles }) {
  // lift later
  const [selectedStyleIndex, setSelectedStyleIndex] = useState(0);

  return (
    <>
      <h3>{`Style: ${styles.results[selectedStyleIndex].name}`}</h3>
      <StyleContainer>
        {styles.results.map((style, index) => (
          <StyleThumbnail
            key={style.style_id}
            style={style}
            selected={index === selectedStyleIndex}
            selectStyle={() => setSelectedStyleIndex(index)}
          />
        ))}
      </StyleContainer>
    </>
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
