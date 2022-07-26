import React from 'react';
import { render, screen } from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import { toBeInTheDocument, toHaveStyle } from '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import ProductCards from '../ProductCards.jsx';
import { products, pStyles } from '../../exampleData.js';

// White Joggers (NO SALE), Golden Joggers (SALE)
const Joggers = {
  product: products[pStyles.findIndex((style) => style.product_id === '40346')],
  styles: {
    golden: pStyles[pStyles.findIndex((style) => style.product_id === '40346')].results.find((result) => result.style_id === 240512),
    white: pStyles[pStyles.findIndex((style) => style.product_id === '40346')].results.find((result) => result.style_id === 240515),
  },
};

describe('rendering of Product Cards', () => {
  const joggerCard = Joggers.product;
  const goldenStyle = Joggers.styles.golden;
  const whiteStyle = Joggers.styles.white;

  it('Contains the Category of a product', () => {
    render(
      <MemoryRouter>
        <ProductCards
          card={joggerCard}
          style={goldenStyle}
          clickFunc={() => {}}
        />
      </MemoryRouter>,
    );
    const category = screen.getByText('PANTS');
    // screen.debug(); // this 'console logs' the test DOM
    expect(category).toBeInTheDocument();
  });

  it('Contains the Name of a product', () => {
    render(
      <MemoryRouter>
        <ProductCards
          card={joggerCard}
          style={goldenStyle}
          clickFunc={() => {}}
        />
      </MemoryRouter>,
    );
    const name = screen.getByText(/Morning Joggers/);
    // screen.debug(); // this 'console logs' the test DOM
    expect(name).toBeInTheDocument();
  });

  it('Contains the Default Style Name of a product (extra text?)', () => {
    render(
      <MemoryRouter>
        <ProductCards
          card={joggerCard}
          style={goldenStyle}
          clickFunc={() => {}}
        />
      </MemoryRouter>,
    );
    const extra = screen.getByText(/Goldenrod/);
    // screen.debug(); // this 'console logs' the test DOM
    expect(extra).toBeInTheDocument();
  });

  it('Contains the default price of a product', () => {
    render(
      <MemoryRouter>
        <ProductCards
          card={joggerCard}
          style={goldenStyle}
          clickFunc={() => {}}
        />
      </MemoryRouter>,
    );
    const originalPrice = screen.getByText('$40.00');
    // screen.debug(); // this 'console logs' the test DOM
    expect(originalPrice).toBeInTheDocument();
  });

  it('Strikes-through the original price if there is a sale', () => {
    render(
      <MemoryRouter>
        <ProductCards
          card={joggerCard}
          style={goldenStyle}
          clickFunc={() => {}}
        />
      </MemoryRouter>,
    );
    const salePrice = screen.getByText('$40.00');
    // screen.debug(); // this 'console logs' the test DOM
    expect(salePrice).toBeInTheDocument();
    expect(salePrice).toHaveStyle('text-decoration: line-through');
  });

  it('Colors the sale text red if there is a sale for a product', () => {
    render(
      <MemoryRouter>
        <ProductCards
          card={joggerCard}
          style={goldenStyle}
          clickFunc={() => {}}
        />
      </MemoryRouter>,
    );
    const salePrice = screen.getByText('$35.00');
    // screen.debug(); // this 'console logs' the test DOM
    expect(salePrice).toBeInTheDocument();
    expect(salePrice).toHaveStyle('color: red');
  });

  it('Does not strike-through the original price OR have a red sale price if the product is not on sale', () => {
    render(
      <MemoryRouter>
        <ProductCards
          card={joggerCard}
          style={whiteStyle}
          clickFunc={() => {}}
        />
      </MemoryRouter>,
    );
    const price = screen.getByText('$40.00');
    // screen.debug(); // this 'console logs' the test DOM
    expect(price).toBeInTheDocument();
    expect(price).not.toHaveStyle('color: red');
    expect(price).not.toHaveStyle('text-decoration: line-through');
  });

  it('Uses the same image for the card that would be the primary image for a product', () => {
    render(
      <MemoryRouter>
        <ProductCards
          card={joggerCard}
          style={goldenStyle}
          clickFunc={() => {}}
        />
      </MemoryRouter>,
    );
    const image = screen.getByTestId('image');
    // screen.debug(); // this 'console logs' the test DOM
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://images.unsplash.com/photo-1530073391204-7b34a1497281?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=298&q=65');
  });
});
