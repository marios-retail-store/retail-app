import React from 'react';
import { render, screen } from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import { toBeInTheDocument, toHaveStyle } from '@testing-library/jest-dom';
import Carousel from '../Carousel.jsx';
import { products, pStyles } from '../../exampleData.js';

describe('rendering of Carousel', () => {
  it('Contains a product card\'s Category', () => {
    render(<Carousel
      moveLeft={(event) => console.log('Move Left Clicked\n', 'EventTarget:', event.target)}
      moveRight={(event) => console.log('Move Right Clicked\n', 'EventTarget:', event.target)}
      products={products}
      styles={pStyles}
    />);
    const accessories = screen.getByText('ACCESSORIES');
    const pants = screen.getByText('PANTS');
    const kicks = screen.getByText('KICKS');
    const dressShoes = screen.getByText('DRESS SHOES');
    // screen.debug(); // this 'console logs' the test DOM
    expect(accessories).toBeInTheDocument();
    expect(pants).toBeInTheDocument();
    expect(kicks).toBeInTheDocument();
    expect(dressShoes).toBeInTheDocument();
  });

  it('Contains a product card\'s Name', () => {
    render(<Carousel
      moveLeft={(event) => console.log('Move Left Clicked\n', 'EventTarget:', event.target)}
      moveRight={(event) => console.log('Move Right Clicked\n', 'EventTarget:', event.target)}
      products={products}
      styles={pStyles}
    />);
    const accessory = screen.getByText('Bright Future Sunglasses (Black Lenses & Gold Frame)');
    const pants = screen.getByText('Morning Joggers (Black)');
    const kicks = screen.getByText('YEasy 350 (White)');
    const dressShoes = screen.getByText('Blues Suede Shoes (White Sole)');
    // screen.debug(); // this 'console logs' the test DOM
    expect(accessory).toBeInTheDocument();
    expect(pants).toBeInTheDocument();
    expect(kicks).toBeInTheDocument();
    expect(dressShoes).toBeInTheDocument();
  });

  it('Displays 4 Cards In the Carousel', () => {
    render(<Carousel
      moveLeft={(event) => console.log('Move Left Clicked\n', 'EventTarget:', event.target)}
      moveRight={(event) => console.log('Move Right Clicked\n', 'EventTarget:', event.target)}
      products={products}
      styles={pStyles}
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
      moveLeft={(event) => console.log('Move Left Clicked\n', 'EventTarget:', event.target)}
      moveRight={(event) => console.log('Move Right Clicked\n', 'EventTarget:', event.target)}
      products={products}
      styles={pStyles}
    />);
    const carousel = screen.getByTestId('Carousel');
    expect(carousel).toBeInTheDocument();
    expect(carousel).toHaveStyle('display: flex');
    // screen.debug(); // this 'console logs' the test DOM
  });

  it('flows left to right with no wrap', () => {
    render(<Carousel
      moveLeft={(event) => console.log('Move Left Clicked\n', 'EventTarget:', event.target)}
      moveRight={(event) => console.log('Move Right Clicked\n', 'EventTarget:', event.target)}
      products={products}
      styles={pStyles}
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
      moveLeft={(event) => console.log('Move Left Clicked\n', 'EventTarget:', event.target)}
      moveRight={(event) => console.log('Move Right Clicked\n', 'EventTarget:', event.target)}
      products={products}
      styles={pStyles}
    />);
    const carousel = screen.getByTestId('Carousel');
    expect(carousel).toBeInTheDocument();
    expect(carousel).toHaveStyle('align-items: flex-end');
    // screen.debug(); // this 'console logs' the test DOM
  });
});
