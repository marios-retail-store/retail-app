import React from 'react';
import {
  render, fireEvent, screen, cleanup,
} from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import { toHaveAttribute, toBeInTheDocument } from '@testing-library/jest-dom';
// eslint-disable-next-line no-unused-vars
import ImageGallery from './ImageGallery.jsx';

const styleWith2Images = {
  photos: [
    {
      thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=60&h=60&q=60',
      url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=60&h=60&q=60',
    },
    {
      thumbnail_url: 'https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=60&h=60&q=60',
      url: 'https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=60&h=60&q=60',
    },
  ],
};

const styleWith8Images = {
  photos: [
    {
      thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=60&h=60&q=60',
      url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=60&h=60&q=60',
    },
    {
      thumbnail_url: 'https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=60&h=60&q=60',
      url: 'https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=60&h=60&q=60',
    },
    {
      thumbnail_url: 'https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=60&h=60&q=60',
      url: 'https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=60&h=60&q=60',
    },
    {
      thumbnail_url: 'https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=60&h=60&q=60',
      url: 'https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=60&h=60&q=60',
    },
    {
      thumbnail_url: 'https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=60&h=60&q=60',
      url: 'https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=60&h=60&q=60',
    },
    {
      thumbnail_url: 'https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=60&h=60&q=60',
      url: 'https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=60&h=60&q=60',
    },
    {
      thumbnail_url: 'https://images.unsplash.com/photo-1533779183510-8f55a55f15c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=60&h=60&q=60',
      url: 'https://images.unsplash.com/photo-1533779183510-8f55a55f15c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=60&h=60&q=60',
    },
    {
      thumbnail_url: 'https://images.unsplash.com/photo-1560567546-4c6dbc16877b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=60&h=60&q=60',
      url: 'https://images.unsplash.com/photo-1560567546-4c6dbc16877b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=60&h=60&q=60',
    },
  ],
};

// it('quantity dropdown should read \'-\' and be disabled with no size chosen', () => {
//   render(<ImageList
//     style={styleAllInStock}
//   />);
//   const quantityDropdown = screen.getByText('-');
//   fireEvent(
//     quantityDropdown,
//     new MouseEvent('click', {
//       bubbles: true,
//       cancelable: true,
//     }),
//   );
//   const tryFindQuantityOption = () => { screen.getByText('1'); };
//   expect(tryFindQuantityOption).toThrow();
//   expect(quantityDropdown).toBeInTheDocument();
// });

describe('Image List', () => {
  it('thumbnail list should display all images if there are less than  7', () => {
    render(<ImageGallery
      style={styleWith2Images}
    />);
    const thumbnails = screen.getAllByAltText('thumbnail of different product view in list');
    expect(thumbnails.length).toBe(2);
    styleWith2Images.photos.forEach((photo, index) => {
      expect(thumbnails[index]).toHaveAttribute('src', photo.thumbnail_url);
    });
  });

  it('thumbnail list should include the current main image', () => {
    render(<ImageGallery
      style={styleWith2Images}
    />);
    const mainImage = screen.getByAltText('product image');
    const thumbnails = screen.getAllByAltText('thumbnail of different product view in list');
    expect(mainImage).toHaveAttribute('src', styleWith2Images.photos[0].url);
    expect(thumbnails[0]).toHaveAttribute('src', styleWith2Images.photos[0].thumbnail_url);
  });

  it('thumbnail list should display at most 7 images', () => {
    render(<ImageGallery
      style={styleWith8Images}
    />);
    const thumbnails = screen.getAllByAltText('thumbnail of different product view in list');
    expect(thumbnails.length).toBe(7);
  });

  it('with more than 7 images only display arrows when there\'s an image to be shown in the direction', () => {
    render(<ImageGallery
      style={styleWith8Images}
    />);
    const tryFindLeftArrow = () => screen.getByTestId('list-left-arrow');
    const tryFindRightArrow = () => screen.getByTestId('list-right-arrow');
    const rightArrow = tryFindRightArrow();
    expect(tryFindLeftArrow).toThrow();
    expect(rightArrow).toBeInTheDocument();
    fireEvent(
      rightArrow,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    const leftArrow = tryFindLeftArrow();
    expect(leftArrow).toBeInTheDocument();
    expect(tryFindRightArrow).toThrow();
    fireEvent(
      leftArrow,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(tryFindLeftArrow).toThrow();
    expect(tryFindRightArrow).not.toThrow();
  });

  it('should render potential arrow containers only when a list has more than 7 images so that the list always stays centered', () => {
    render(<ImageGallery
      style={styleWith8Images}
    />);
    const leftContainer = screen.getByTestId('list-left-empty-arrow-container');
    const rightContainer = screen.getByTestId('list-right-empty-arrow-container');
    expect(leftContainer).toBeInTheDocument();
    expect(rightContainer).toBeInTheDocument();
    cleanup();
    render(<ImageGallery
      style={styleWith2Images}
    />);
    const tryForLeftContainer = () => screen.getByTestId('list-left-empty-arrow-container');
    const tryForRightContainer = () => screen.getByTestId('list-right-empty-arrow-container');
    expect(tryForLeftContainer).toThrow();
    expect(tryForRightContainer).toThrow();
  });

  it('should set the corresponding main image on thumbnail click', () => {
    render(<ImageGallery
      style={styleWith2Images}
    />);
    const thumbnails = screen.getAllByAltText('thumbnail of different product view in list');
    fireEvent(
      thumbnails[1],
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    const mainImage = screen.getByAltText('product image');
    expect(mainImage).toHaveAttribute('src', styleWith2Images.photos[1].url);
  });
});

describe('Main Image', () => {
  it('should default to using the first image', () => {
    render(<ImageGallery
      style={styleWith2Images}
    />);
    const mainImage = screen.getByAltText('product image');
    expect(mainImage).toHaveAttribute('src', styleWith2Images.photos[0].url);
  });

  it('should display arrows to navigate, but only if there\'s an available image in that direction', () => {
    render(<ImageGallery
      style={styleWith2Images}
    />);
    const tryFindLeftArrow = () => screen.getByTestId('main-left-arrow');
    const tryFindRightArrow = () => screen.getByTestId('main-right-arrow');
    let rightArrow = tryFindRightArrow();
    expect(tryFindLeftArrow).toThrow();
    fireEvent(
      rightArrow,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    const leftArrow = tryFindLeftArrow();
    expect(leftArrow).toBeInTheDocument();
    expect(rightArrow).not.toBeInTheDocument();
    fireEvent(
      leftArrow,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(leftArrow).not.toBeInTheDocument();
    rightArrow = tryFindRightArrow();
    expect(rightArrow).toBeInTheDocument();
  });
});
