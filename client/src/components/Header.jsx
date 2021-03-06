import React from 'react';
import styled from 'styled-components';
import { SubHeading } from './shared/styles.js';

const Container = styled('div')`
  max-width: 1200px;
  margin: 20px auto;
  height: 80px;
  display: flex;
  align-items: center;
`;

const StyledSVG = styled('svg')`
  padding: 20px;
  height: 100%;
  display: inline;
`;

const StyledSubHeading = styled(SubHeading)`
  display: inline;
  color: black;
`;

function Header() {
  return (
    <Container>
      <StyledSVG
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 255.14 162.74"
      >
        <path
          d="M36.52,83.01c1.44-.76,2.9-1.48,4.35-2.22-2.8-5.27-5.75-10.09-8-15.21-10.14-23.1-3.98-42.26,17.72-55.04C73.18-2.76,96.89-2.32,121.02,5.48c17.77,5.75,33.77,14.84,48.69,26,2.27,1.7,5.21,2.88,8.01,3.46,18.61,3.82,36.54,9.41,51.76,21.22,16.53,12.83,26.73,29.16,25.57,50.94-1.21,22.84-16.1,39.87-39.66,45.37-16.22,3.79-32.39,2.92-48.5-.99-1.79-.44-4.03-.55-5.67,.13-41.27,17.32-81.44,14.09-120.1-7.34-12-6.65-22.75-15.6-33.8-23.87C4.36,118.19-.22,115.35,0,109.76c0-8.25,23.22-19.79,36.51-26.75Zm81.46,14.65c.17-21.81-23.4-50.81-44.25-55.08-10.01-2.05-16.88,2.56-18.79,12.66-.28,1.47-.66,2.95-.66,4.43,0,9.59,.21,19.59,8.85,25.73,13.54,9.62,27.74,18.28,41.56,27.52,2.6,1.74,4.54,1.33,6.7-.37,5.05-3.97,6.15-9.61,6.6-14.89Z"
        />
        <path
          d="M89.12,75.27l-10.58,5.17c-1.8-4.74-3.54-9.31-5.28-13.89l-1.38-.2c-1.8,4.8-3.61,9.6-5.41,14.4-6.34-7.13-6.58-8.24-2.15-16.42,2.28-4.21,5.02-8.17,8.19-13.28,2.8,7.23,5.19,13.41,7.75,20.04,4.59-2.52,8.77-4.81,13.4-7.35,3.99,12.43,7.91,24.64,11.94,37.18-2.63,.62-4.99,1.17-7.96,1.86-2.83-9.15-5.6-18.08-8.52-27.52Z"
        />
      </StyledSVG>
      <StyledSubHeading>{'Mario\'s Retail Store'}</StyledSubHeading>
    </Container>
  );
}

export default Header;
