import React from 'react';
import { render, screen } from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import { toBeInTheDocument, toHaveStyle } from '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Carousel from '../Carousel.jsx';
import { products, pStyles } from '../../exampleData.js';

describe('rendering of Carousel', () => {
  it('Contains a product card\'s Category', () => {
    render(
      <MemoryRouter>
        <Carousel
          products={products}
          styles={pStyles}
          type="related"
          actionBtnFunc={() => console.log('test')}
          clickFunc={() => console.log('test')}
        />
      </MemoryRouter>,
    );
    const accessories = screen.getByText('ACCESSORIES');
    const pants = screen.getByText('PANTS');
    const kicks = screen.getByText('KICKS');
    // screen.debug(); // this 'console logs' the test DOM
    expect(accessories).toBeInTheDocument();
    expect(pants).toBeInTheDocument();
    expect(kicks).toBeInTheDocument();
  });

  it('Contains a product card\'s Name', () => {
    render(
      <MemoryRouter>
        <Carousel
          products={products}
          styles={pStyles}
          type="related"
          actionBtnFunc={() => console.log('test')}
          clickFunc={() => console.log('test')}
        />
      </MemoryRouter>,
    );
    const accessory = screen.getByText('Bright Future Sunglasses (Black Lenses & Gold Frame)');
    const pants = screen.getByText('Morning Joggers (Black)');
    const kicks = screen.getByText('YEasy 350 (White)');
    // screen.debug(); // this 'console logs' the test DOM
    expect(accessory).toBeInTheDocument();
    expect(pants).toBeInTheDocument();
    expect(kicks).toBeInTheDocument();
  });

  it('Displays 4 Cards In the Carousel', () => {
    render(
      <MemoryRouter>
        <Carousel
          products={products}
          styles={pStyles}
          type="related"
          actionBtnFunc={() => console.log('test')}
          clickFunc={() => console.log('test')}
        />
      </MemoryRouter>,
    );
    const carousel = screen.getByTestId('Carousel');
    const Cards = screen.getAllByText(/00/);
    const inDoc = (card) => {
      expect(card).toBeInTheDocument();
      expect(carousel).toContainElement(card);
    }; inDoc(...Cards);
    expect(Cards.length).toBe(4);
    // screen.debug(); // this 'console logs' the test DOM
  });

  it('Has a parent carousel div that has an overflow property of hidden', () => {
    render(
      <MemoryRouter>
        <Carousel
          products={products}
          styles={pStyles}
          type="related"
          actionBtnFunc={() => console.log('test')}
          clickFunc={() => console.log('test')}
        />
      </MemoryRouter>,
    );
    const carousel = screen.getByTestId('Carousel');
    expect(carousel).toBeInTheDocument();
    expect(carousel).toHaveStyle('overflow: hidden');
    // screen.debug(); // this 'console logs' the test DOM
  });

  it('Has an inner container div that has a whitespace property of nowrap', () => {
    render(
      <MemoryRouter>
        <Carousel
          products={products}
          styles={pStyles}
          type="related"
          actionBtnFunc={() => console.log('test')}
          clickFunc={() => console.log('test')}
        />
      </MemoryRouter>,
    );
    const container = screen.getByTestId('Container');
    expect(container).toBeInTheDocument();
    expect(container).toHaveStyle({
      whiteSpace: 'nowrap',
    });
  });

  it('Has an inner container div that has a transition property of 600ms', () => {
    render(
      <MemoryRouter>
        <Carousel
          products={products}
          styles={pStyles}
          type="related"
          actionBtnFunc={() => console.log('test')}
          clickFunc={() => console.log('test')}
        />
      </MemoryRouter>,
    );
    const container = screen.getByTestId('Container');
    expect(container).toBeInTheDocument();
    expect(container).toHaveStyle({
      transition: '0.6s',
    });
  });

  it('Never shows the left button on initial load', () => {
    render(
      <MemoryRouter>
        <Carousel
          products={products}
          styles={pStyles}
          type="related"
          actionBtnFunc={() => console.log('test')}
          clickFunc={() => console.log('test')}
        />
      </MemoryRouter>,
    );
    console.log(screen);
    const leftBtn = screen.getByTestId('leftButton');
    const rightBtn = screen.getByTestId('rightButton');
    expect(leftBtn).toBeInTheDocument();
    expect(rightBtn).toBeInTheDocument();
    expect(leftBtn).toHaveStyle('visibility: hidden');
    expect(rightBtn).toHaveStyle('visibility: visible');
    // screen.debug(); // this 'console logs' the test DOM
  });
});
