import React from 'react';
import { render, screen } from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import { toBeInTheDocument } from '@testing-library/jest-dom';
// eslint-disable-next-line no-unused-vars
import StarRating from './StarRating.jsx';

describe('Star Rating', () => {
  it('should display 5 empty outlines for a rating of 0', () => {
    render(<StarRating
      averageRating={0}
    />);
    const stars = screen.getAllByText('grade');
    expect(stars.length).toBe(5);
    const tryFindFilledStar = () => screen.getAllByTestId('filled-star');
    expect(tryFindFilledStar).toThrow();
  });

  it('should display 5 filled stars for a rating of 5, and no outlines', () => {
    render(<StarRating
      averageRating={5}
    />);
    const stars = screen.getAllByText('grade');
    expect(stars.length).toBe(5);
    const filledStars = screen.getAllByTestId('filled-star');
    expect(filledStars.length).toBe(5);
  });

  it('should display 6 stars for ratings between 0 and 5. The half filled star will have an outline star, and a filled star', () => {
    render(<StarRating
      averageRating={4.2}
    />);
    const stars = screen.getAllByText('grade');
    expect(stars.length).toBe(6);
    const filledStars = screen.getAllByTestId('filled-star');
    expect(filledStars.length).toBe(5);
  });
});
