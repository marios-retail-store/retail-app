/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import QuestionsAndAnswers from '../../QuestionsAndAnswers.jsx';
import SearchBar from '../SearchBar.jsx';

describe('QuestionsAndAnswers component', () => {

  it('render h3 element', () => {
    render(<QuestionsAndAnswers />);
    expect(
      screen.getByText('QUESTIONS & ANSWERS')
    ).toBeInTheDocument();
  });

  it('render h3 element',()=>{
    render(<QuestionsAndAnswers />);
    const text = screen.getByText('QUESTIONS & ANSWERS')
    expect(text).toHaveStyle('textAlign:left');
  });

  it('should have a placeholder',()=>{
    render(<SearchBar />);
    const text = screen.getByPlaceholderText('HAVE A QUESTION? SEARCH FOR ANSWERS ......')
    expect(text).toBeInTheDocument();
  });

});


