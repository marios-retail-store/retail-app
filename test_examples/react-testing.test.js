// https://testing-library.com/docs/react-testing-library/intro

// import {render, screen} from '@testing-library/react';
// import App from './App';

const React = require('react');
const {render, screen} = require('@testing-library/react');
const {toBeInTheDocument} = require('@testing-library/jest-dom');

const test = () => (
  <p>test</p>
);

describe('rendering App', () => {
  it('some test', () => {
    render(<p>test</p>);
    const linkElement = screen.getByText('test');
    screen.debug();
    expect(linkElement).toBeInTheDocument();
  })
});
