import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function ComparisonModal({
  isViewing, handleExit, currentProduct, clickedProduct,
}) {
  const features = {};
  clickedProduct.features.forEach((clickedFeature) => {
    let { feature, value } = clickedFeature;
    const currentFeature = {
      name: feature, clickedValue: value,
    };
    currentProduct.features.forEach((productFeature) => {
      ({ feature, value } = productFeature);
      if (currentFeature.name === feature) {
        currentFeature.productValue = value;
      }
    });
    currentFeature.productValue = currentFeature.productValue || '';
    features[currentFeature.name] = currentFeature;
  });

  currentProduct.features.forEach((productFeature) => {
    const { feature, value } = productFeature;
    features[feature] = features[feature] || {
      name: feature,
      productValue: value,
      clickedValue: '',
    };
  });

  // let modal = <Comparison />;
  if (isViewing) {
    const modal = (
      <Comparison>
        <Title>COMPARING</Title>
        <ExitButton
          type="button"
          onClick={(e) => handleExit(e)}
        >
          x
        </ExitButton>
        <Table>
          <TableHead>
            <tr>
              <TableHeader>{currentProduct.name}</TableHeader>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <TableHeader />
              <TableHeader>{clickedProduct.name}</TableHeader>
            </tr>
          </TableHead>
          <TableBody>
            {(Object.values(features).map((row) => {
              const { productValue, clickedValue } = row;
              const productContains = '✔';
              const clickedContains = productValue === clickedValue ? '✔' : '';
              return (
                productValue && (
                  <tr>
                    <LeftTableData>{productContains}</LeftTableData>
                    <td>{productValue}</td>
                    <RightTableData>{clickedContains}</RightTableData>
                  </tr>
                )

              );
            }))}

            {Object.values(features).map((row) => {
              const { productValue, clickedValue } = row;
              const clickedContains = '✔';
              const productContains = productValue === clickedValue ? '✔' : '';
              return (
                clickedValue && clickedValue !== productValue && (
                <tr>
                  <LeftTableData>{productContains}</LeftTableData>
                  <td>{clickedValue}</td>
                  <RightTableData>{clickedContains}</RightTableData>
                </tr>
                )
              );
            })}
          </TableBody>
        </Table>
      </Comparison>
    );
    return (
      modal
    );
  }
}

const Title = styled('p')`
  margin-bottom: 0px;
  margin-left: 1.5rem;
  font-size: 0.79rem;
  font-family: 'Kanit', sans-serif;
  color: rgb(50,50,50);
`;
const ExitButton = styled('button')`
  position: absolute;
  top: 5px;
  right: 5px;
`;
const RightTableData = styled('td')`
text-align: end;
`;
const LeftTableData = styled('td')`
text-align: start;
`;
const Comparison = styled('div')`
    position: fixed;
    top: 50vh;
    background: #EAF6F6;
    border: 1px solid black;
    max-height: 70%;
    height: auto;
    overflow-y: scroll;
    transform: translate(50%, 50%);
    font-family: 'Kanit', sans-serif;
    color: rgb(50,50,50);
`;
const Table = styled('table')`
  width: fit-content;
  border: 1px black;
  border-collase: separate;
  border-spacing: 0.5em;
  padding: 1rem;
  padding-top: 0.25rem;
  display: block;
  cellspacing: 1em;
`;

const TableBody = styled('tbody')`
  overflow-y: auto;
  max-height: 80%;
`;

const TableHead = styled('thead')`
  padding-bottom: 0.25em;
  position: sticky;
  top: 0em;
  margin-top: 1rem;
`;

const TableHeader = styled('th')`
  padding-bottom: 2rem;
`;
ComparisonModal.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  isViewing: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  handleExit: PropTypes.func.isRequired,
  currentProduct: PropTypes.shape({
    name: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.shape({
      feature: PropTypes.string,
      value: PropTypes.string,
    })),
  }).isRequired,
  clickedProduct: PropTypes.shape({
    name: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.shape({
      feature: PropTypes.string,
      value: PropTypes.string,
    })),
  }).isRequired,
};
export default ComparisonModal;
