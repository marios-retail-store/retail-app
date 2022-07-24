import React from 'react';
import {
  render, screen, fireEvent, cleanup,
} from '@testing-library/react';
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
      url: 'https://images.unsplash.com/photo-1530073391204-7b34a1497281?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=160&h=60&q=60',
    },
  ],
};

describe('style selector thumbnails', () => {
  it('displays the thumbnail image of the passed style', () => {
    render(<StyleThumbnail
      style={style}
      selected={false}
      selectStyle={() => {}}
    />);
    const thumbnail = screen.getByAltText('thumbnail in style selector');
    expect(thumbnail).toBeInTheDocument();
    expect(thumbnail).toHaveAttribute('src', 'https://images.unsplash.com/photo-1530073391204-7b34a1497281?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=60&h=60&q=60');
  });

  it('displays a checkmark if the style is selected', () => {
    render(<StyleThumbnail
      style={style}
      selected
      selectStyle={() => {}}
    />);
    const checkmark = screen.getByText('check');
    expect(checkmark).toBeInTheDocument();
  });

  it('clicking on a style that is not currently selected, changes it to being selected', () => {
    let isSelected = false;
    const selectStyle = () => { isSelected = true; };
    render(<StyleThumbnail
      style={style}
      selected={isSelected}
      selectStyle={selectStyle}
    />);
    const thumbnail = screen.getByAltText('thumbnail in style selector');
    const tryForCheckmark = () => screen.getByText('check');
    expect(tryForCheckmark).toThrow();
    fireEvent(
      thumbnail,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    // rerender based on changed state
    cleanup();
    render(<StyleThumbnail
      style={style}
      selected={isSelected}
      selectStyle={selectStyle}
    />);
    expect(tryForCheckmark).not.toThrow();
  });
});
