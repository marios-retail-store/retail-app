import React from 'react';
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

function StyleSelector({ styles, selectedStyleId, setSelectedStyleId }) {
  return (
    <Container>
      <SuperBoldSubHeading style={{ display: 'inline' }}>{'Style > '}</SuperBoldSubHeading>
      <SubHeading style={{ display: 'inline' }}>
        {`${styles.results[selectedStyleId].name}`}
      </SubHeading>
      <StylesContainer
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
  selectedStyleId: PropTypes.number.isRequired,
  setSelectedStyleId: PropTypes.func.isRequired,
};

export default StyleSelector;
