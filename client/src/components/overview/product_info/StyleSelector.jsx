import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import StyleThumbnail from './StyleThumbnail.jsx';

const StyleContainer = styled('div')`
  display: grid;
  grid-template-columns: min-content min-content min-content min-content;
  margin: 5px 0;
`;

function StyleSelector({ styles, selectedStyleId, setSelectedStyleId }) {
  return (
    <>
      <h3>{`Style: ${styles.results[selectedStyleId].name}`}</h3>
      <StyleContainer
        data-testid="style-container"
      >
        {styles.results.map((style, index) => (
          <StyleThumbnail
            key={style.style_id}
            style={style}
            selected={index === selectedStyleId}
            selectStyle={() => setSelectedStyleId(index)}
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
  selectedStyleId: PropTypes.number.isRequired,
  setSelectedStyleId: PropTypes.func.isRequired,
};

export default StyleSelector;
