import React from 'react';
import { render, screen } from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import { toBeInTheDocument, toHaveStyle, toHaveAttribute } from '@testing-library/jest-dom';
// ^ used in all tests, but somehow does not get recognized
import StyleThumbnail from './StyleThumbnail.jsx';

const style = {
  style_id: 240512,
  name: 'Goldenrod',
  original_price: '40.00',
  sale_price: '35.00',
  'default?': false,
  photos: [
    {
      thumbnail_url: 'https://images.unsplash.com/photo-1530073391204-7b34a1497281?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
      url: 'https://images.unsplash.com/photo-1530073391204-7b34a1497281?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    },
  ],
};

describe('style selector thumbnails', () => {
  it('displays product name and category', () => {

  });
});
