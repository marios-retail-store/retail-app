import React from 'react';
import { render, screen } from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import { toBeInTheDocument } from '@testing-library/jest-dom';
// eslint-disable-next-line no-unused-vars
import StarRating from './StarRating.jsx';

describe('Image List', () => {
  it('should display 5 empty outlines for a rating of 0', () => {
    render(<StarRating
      averageRating={0}
    />);
    const stars = screen.getAllByText('grade');
    expect(stars.length).toBe(5);
  });
  it('should display 10 stars for a rating that averages to be higher or equal to 4.25', () => {
    render(<StarRating
      averageRating={4.2}
    />);
    const stars = screen.getAllByText('grade');
    expect(stars.length).toBe(10);
  });
});
