import styled from 'styled-components';

const textShared = `
  font-family: 'Kanit', sans-serif;
  margin: 0;
  padding: 0;
  color: black;
  letter-spacing: 0.1em;
  color: rgb(50, 50, 50);
`;

const Heading = styled('h1')`
  ${textShared}
  font-family: 'Roboto', sans-serif;
  font-size: 30px;
  font-weight: 900;
  margin: 5px 0;
`;

const SubHeading = styled('h3')`
  ${textShared}
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 400;
`;

const BoldSubHeading = styled(SubHeading)`
  font-weight: 600;
`;

const SuperBoldSubHeading = styled(SubHeading)`
  font-weight: 700;
`;

const Paragraph = styled('p')`
  ${textShared}
  font-size: 16px;
  font-weight: 400;
`;

const SharedButton = styled('button')`
  user-select: none;
  height: 50px;
  padding: 0 15px;
  background-color: #EAF6F6;
  border: 1px solid black;
  text-align: left;
  &:hover {
    background-color: #cff0f0;
  }
  &:active {
    background-color: #b6e7e7;
  }
`;

const CarouselTitle = styled('p')`
  font-family: 'Kanit', sans-serif;
  color: rgb(50,50,50);
  font-size: 20.75px;
`;

export {
  Heading,
  SubHeading,
  BoldSubHeading,
  SuperBoldSubHeading,
  Paragraph,
  SharedButton,
  CarouselTitle,
};
