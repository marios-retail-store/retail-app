import React from 'react';
import {
  render, fireEvent, screen, cleanup,
} from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import { toHaveAttribute, toBeInTheDocument } from '@testing-library/jest-dom';
// eslint-disable-next-line no-unused-vars
import ExpandedView from './ExpandedView.jsx';

// photos, currentImgIndex, setCurrentImgIndex, closeView,
const style = {
  photos: [
    {
      thumbnail_url: 'https://images.unsplash.com/photo-1510390099355-23e690d8129d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
      url: 'https://images.unsplash.com/photo-1510390099355-23e690d8129d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    },
    {
      thumbnail_url: 'https://images.unsplash.com/photo-1547257965-087be799b084?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
      url: 'https://images.unsplash.com/photo-1547257965-087be799b084?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
    },
    {
      thumbnail_url: 'https://images.unsplash.com/photo-1510217167326-549ae78e4738?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      url: 'https://images.unsplash.com/photo-1510217167326-549ae78e4738?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
    },
  ],
};

describe('Expanded View', () => {
  it('should display the image at the current index', () => {
    let currentImgIndex = 0;
    const setCurrentImgIndex = (index) => { currentImgIndex = index; };
    render(<ExpandedView
      photos={style.photos}
      currentImgIndex={currentImgIndex}
      setCurrentImgIndex={setCurrentImgIndex}
      closeView={() => {}}
    />);
    const image = screen.getByAltText('expanded view of product');
    expect(image).toHaveAttribute('src', style.photos[0].url);
    expect(image).toBeInTheDocument();
  });

  it('should show an icon for each image in the list', () => {
    let currentImgIndex = 0;
    const setCurrentImgIndex = (index) => { currentImgIndex = index; };
    render(<ExpandedView
      photos={style.photos}
      currentImgIndex={currentImgIndex}
      setCurrentImgIndex={setCurrentImgIndex}
      closeView={() => {}}
    />);
    const icons = screen.getAllByText('fiber_manual_record');
    expect(icons.length).toBe(style.photos.length);
  });

  it('should show the selected icon differently', () => {
    let currentImgIndex = 0;
    const setCurrentImgIndex = (index) => { currentImgIndex = index; };
    render(<ExpandedView
      photos={style.photos}
      currentImgIndex={currentImgIndex}
      setCurrentImgIndex={setCurrentImgIndex}
      closeView={() => {}}
    />);
    const icons = screen.getAllByTestId('selected-icon');
    expect(icons.length).toBe(1);
  });

  it('should show arrow buttons when there is an image in that direction', () => {
    let currentImgIndex = 0;
    const setCurrentImgIndex = (index) => { currentImgIndex = index; };
    render(<ExpandedView
      photos={style.photos}
      currentImgIndex={currentImgIndex}
      setCurrentImgIndex={setCurrentImgIndex}
      closeView={() => {}}
    />);
    const tryFindLeftArrow = () => screen.getByText('chevron_left');
    const tryFindRightArrow = () => screen.getByText('chevron_right');
    let rightArrow = tryFindRightArrow();
    expect(rightArrow).toBeInTheDocument();
    expect(tryFindLeftArrow).toThrow();
    fireEvent(
      rightArrow,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    cleanup();
    render(<ExpandedView
      photos={style.photos}
      currentImgIndex={currentImgIndex}
      setCurrentImgIndex={setCurrentImgIndex}
      closeView={() => {}}
    />);
    let leftArrow = tryFindLeftArrow();
    rightArrow = tryFindRightArrow();
    expect(leftArrow).toBeInTheDocument();
    expect(rightArrow).toBeInTheDocument();
    fireEvent(
      rightArrow,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    cleanup();
    render(<ExpandedView
      photos={style.photos}
      currentImgIndex={currentImgIndex}
      setCurrentImgIndex={setCurrentImgIndex}
      closeView={() => {}}
    />);
    expect(tryFindRightArrow).toThrow();
    leftArrow = tryFindLeftArrow();
    expect(leftArrow).toBeInTheDocument();
  });

  it('should hide ui and only show image when clicking on image and entering zoomed mode', () => {
    let currentImgIndex = 0;
    const setCurrentImgIndex = (index) => { currentImgIndex = index; };
    render(<ExpandedView
      photos={style.photos}
      currentImgIndex={currentImgIndex}
      setCurrentImgIndex={setCurrentImgIndex}
      closeView={() => {}}
    />);
    const image = screen.getByAltText('expanded view of product');
    fireEvent(
      image,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    const tryFindLeftArrow = () => screen.getByText('chevron_left');
    const tryFindRightArrow = () => screen.getByText('chevron_right');
    expect(tryFindLeftArrow).toThrow();
    expect(tryFindRightArrow).toThrow();
    const tryFindIcons = () => screen.getAllByText('fiber_manual_record');
    expect(tryFindIcons).toThrow();
  });
});
