import React from 'react';
import { render, screen } from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import { toBeInTheDocument, toHaveStyle } from '@testing-library/jest-dom';
import Carousel from '../Carousel.jsx';
import { products, pStyles } from '../../exampleData.js';

describe('rendering of Carousel', () => {
  it('Contains a product card\'s Category', () => {
    render(<Carousel
      products={products}
      styles={pStyles}
      type="related"
      actionBtnFunc={() => console.log('test')}
    />);
    const accessories = screen.getByText('ACCESSORIES');
    const pants = screen.getByText('PANTS');
    const kicks = screen.getByText('KICKS');
    // screen.debug(); // this 'console logs' the test DOM
    expect(accessories).toBeInTheDocument();
    expect(pants).toBeInTheDocument();
    expect(kicks).toBeInTheDocument();
  });

  it('Contains a product card\'s Name', () => {
    render(<Carousel
      products={products}
      styles={pStyles}
      type="related"
      actionBtnFunc={() => console.log('test')}
    />);
    const accessory = screen.getByText('Bright Future Sunglasses (Black Lenses & Gold Frame)');
    const pants = screen.getByText('Morning Joggers (Black)');
    const kicks = screen.getByText('YEasy 350 (White)');
    // screen.debug(); // this 'console logs' the test DOM
    expect(accessory).toBeInTheDocument();
    expect(pants).toBeInTheDocument();
    expect(kicks).toBeInTheDocument();
  });

  it('Displays 4 Cards In the Carousel even though there are 3 visible', () => {
    render(<Carousel
      products={products}
      styles={pStyles}
      type="related"
      actionBtnFunc={() => console.log('test')}
    />);
    const carousel = screen.getByTestId('Carousel');
    const Cards = screen.getAllByText(/00/);
    const inDoc = (card) => {
      expect(card).toBeInTheDocument();
      expect(carousel).toContainElement(card);
    }; inDoc(...Cards);
    expect(Cards.length).toBe(4);
    // screen.debug(); // this 'console logs' the test DOM
  });

  it('Is a flex container', () => {
    render(<Carousel
      products={products}
      styles={pStyles}
      type="related"
      actionBtnFunc={() => console.log('test')}
    />);
    const carousel = screen.getByTestId('Carousel');
    expect(carousel).toBeInTheDocument();
    expect(carousel).toHaveStyle('display: flex');
    // screen.debug(); // this 'console logs' the test DOM
  });

  it('flows left to right with no wrap', () => {
    render(<Carousel
      products={products}
      styles={pStyles}
      type="related"
      actionBtnFunc={() => console.log('test')}
    />);
    const carousel = screen.getByTestId('Carousel');
    expect(carousel).toBeInTheDocument();
    expect(carousel).toHaveStyle({
      flexDirection: 'row',
      flexWrap: 'nowrap',
    });
  });

  it('Aligns cards from the end of the flex container ', () => {
    render(<Carousel
      products={products}
      styles={pStyles}
      type="related"
      actionBtnFunc={() => console.log('test')}
    />);
    const carousel = screen.getByTestId('Carousel');
    expect(carousel).toBeInTheDocument();
    expect(carousel).toHaveStyle('align-items: flex-end');
    // screen.debug(); // this 'console logs' the test DOM
  });
});
