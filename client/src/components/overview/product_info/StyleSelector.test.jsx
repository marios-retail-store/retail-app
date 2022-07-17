import React from 'react';
import {
  render, screen, fireEvent, within,
} from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import { toBeInTheDocument, toHaveStyle, toHaveAttribute } from '@testing-library/jest-dom';
// ^ used in all tests, but somehow does not get recognized
import StyleSelector from './StyleSelector.jsx';

const styles = {
  product_id: '40346',
  results: [
    {
      style_id: 240510,
      name: 'Black',
      original_price: '40.00',
      sale_price: null,
      'default?': true,
      photos: [
        {
          thumbnail_url: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
        },
      ],
    },
    {
      style_id: 240511,
      name: 'Grey',
      original_price: '40.00',
      sale_price: null,
      'default?': false,
      photos: [
        {
          thumbnail_url: 'https://images.unsplash.com/photo-1562542082-519ebcdb43e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1562542082-519ebcdb43e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2057&q=80',
        },
      ],
    },
    {
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
    },
    {
      style_id: 240513,
      name: 'Maroon',
      original_price: '40.00',
      sale_price: '35.00',
      'default?': false,
      photos: [
        {
          thumbnail_url: 'https://images.unsplash.com/photo-1519857609704-61e751edba25?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1519857609704-61e751edba25?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
        },
      ],
    },
    {
      style_id: 240514,
      name: 'Chartreuse',
      original_price: '40.00',
      sale_price: '25.00',
      'default?': false,
      photos: [
        {
          thumbnail_url: 'https://images.unsplash.com/photo-1530073391204-7b34a1497281?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1530073391204-7b34a1497281?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
        },
      ],
    },
    {
      style_id: 240515,
      name: 'White',
      original_price: '40.00',
      sale_price: null,
      'default?': false,
      photos: [
        {
          thumbnail_url: 'https://images.unsplash.com/photo-1510390099355-23e690d8129d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1510390099355-23e690d8129d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
        },
      ],
    },
  ],
};

describe('style selector', () => {
  it('selects first style by default', () => {
    render(<StyleSelector
      styles={styles}
    />);
    const thumbnails = screen.getAllByAltText('thumbnail in style selector');
    const thumbnailContainers = thumbnails.map((thumbnail) => thumbnail.closest('div'));
    const checkmark = within(thumbnailContainers[0]).getByText('check');
    expect(checkmark).toBeInTheDocument();
  });

  it('displays style name', () => {
    render(<StyleSelector
      styles={styles}
    />);
    const styleText = screen.getByText(/Black/);
    expect(styleText).toBeInTheDocument();
  });

  it('displays all styles', () => {
    render(<StyleSelector
      styles={styles}
    />);
    const thumbnails = screen.getAllByAltText('thumbnail in style selector');
    thumbnails.forEach((thumbnail, index) => {
      expect(thumbnail).toHaveAttribute('src', styles.results[index].photos[0].thumbnail_url);
    });
  });

  it('clicking an unselected thumbnail switches it to being selected', () => {
    render(<StyleSelector
      styles={styles}
    />);
    const thumbnails = screen.getAllByAltText('thumbnail in style selector');
    fireEvent(
      thumbnails[1],
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    const thumbnailContainers = thumbnails.map((thumbnail) => thumbnail.closest('div'));
    expect(() => { within(thumbnailContainers[0]).getByText('check'); }).toThrow();
    expect(() => { within(thumbnailContainers[1]).getByText('check'); }).not.toThrow();
  });
});
