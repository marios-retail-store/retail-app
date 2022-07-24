import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import { toBeInTheDocument, toHaveBeenCalledWith } from '@testing-library/jest-dom';
// eslint-disable-next-line no-unused-vars
import Star from './Star.jsx';

describe('Star', () => {
  it('should correctly crop the star to reflect the rating', () => {
    const tryFindFilledStar = () => screen.getByTestId('filled-star');
    render(<Star
      filled={0}
    />);
    expect(tryFindFilledStar).toThrow();
    cleanup();
    render(<Star
      filled={0.25}
    />);
    let filledStar = tryFindFilledStar();
    expect(filledStar).toHaveStyle('clip-path: polygon(0 0,44% 0,44% 100%,0 100%)');
    cleanup();
    render(<Star
      filled={0.5}
    />);
    filledStar = tryFindFilledStar();
    expect(filledStar).toHaveStyle('clip-path: polygon(0 0,50% 0,50% 100%,0 100%)');
    cleanup();
    render(<Star
      filled={0.75}
    />);
    filledStar = tryFindFilledStar();
    expect(filledStar).toHaveStyle('clip-path: polygon(0 0,56% 0,56% 100%,0 100%)');
    cleanup();
    render(<Star
      filled={1}
    />);
    filledStar = tryFindFilledStar();
    expect(filledStar).toHaveStyle('clip-path: polygon(0 0,100% 0,100% 100%,0 100%)');
    cleanup();
  });
});
