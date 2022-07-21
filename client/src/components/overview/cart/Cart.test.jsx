import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import { toBeInTheDocument } from '@testing-library/jest-dom';
import Cart from './Cart.jsx';

const styleAllInStock = {
  skus: {
    1394817: {
      quantity: 8,
      size: 'XS',
    },
    1394818: {
      quantity: 16,
      size: 'S',
    },
    1394819: {
      quantity: 17,
      size: 'M',
    },
    1394820: {
      quantity: 10,
      size: 'L',
    },
    1394821: {
      quantity: 15,
      size: 'XL',
    },
    1394822: {
      quantity: 6,
      size: 'XXL',
    },
  },
};

const styleNoneInStock = {
  skus: {
    1394817: {
      quantity: 0,
      size: 'XS',
    },
    1394818: {
      quantity: 0,
      size: 'S',
    },
    1394819: {
      quantity: 0,
      size: 'M',
    },
    1394820: {
      quantity: 0,
      size: 'L',
    },
    1394821: {
      quantity: 0,
      size: 'XL',
    },
    1394822: {
      quantity: 0,
      size: 'XXL',
    },
  },
};

describe('Cart', () => {
  it('should not display add to cart button if none of the sizes have stock', () => {
    render(<Cart
      style={styleNoneInStock}
    />);
    const tryFindAddToCartButton = () => { screen.getByText('Add to Cart'); };
    expect(tryFindAddToCartButton).toThrow();
  });

  it('should display add to cart button if there is stock', () => {
    render(<Cart
      style={styleAllInStock}
    />);
    const addToCartButton = screen.getByText('Add to Cart');
    expect(addToCartButton).toBeInTheDocument();
  });

  it('should show an error message and open size selector when pressing add to cart without having chosen a size', () => {
    render(<Cart
      style={styleAllInStock}
    />);
    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent(
      addToCartButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    const option = screen.getByText('XL');
    const errorMsg = screen.getByText('please select a size');
    expect(option).toBeInTheDocument();
    expect(errorMsg).toBeInTheDocument();
  });

  it('quantity dropdown should read \'-\' and be disabled with no size chosen', () => {
    render(<Cart
      style={styleAllInStock}
    />);
    const quantityDropdown = screen.getByText('-');
    fireEvent(
      quantityDropdown,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    const tryFindQuantityOption = () => { screen.getByText('1'); };
    expect(tryFindQuantityOption).toThrow();
    expect(quantityDropdown).toBeInTheDocument();
  });

  it('quantity dropdown should be enabled and default to 1 with a size chosen', () => {
    render(<Cart
      style={styleAllInStock}
    />);
    const quantityDropdown = screen.getByText('-');
    const sizeDropdown = screen.getByText('SELECT SIZE');
    fireEvent(
      sizeDropdown,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    const sizeOption = screen.getByText('XL');
    fireEvent(
      sizeOption,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(quantityDropdown.textContent).toBe('1');
  });

  it('quantity dropdown should be disabled before a size was chosen', () => {
    render(<Cart
      style={styleAllInStock}
    />);
    const quantityDropdown = screen.getByText('-');
    fireEvent(
      quantityDropdown,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    const tryFindOption1 = () => { screen.getByText('1'); };
    expect(tryFindOption1).toThrow();
  });

  it('quantity dropdown options should contain all options from 1 up to the stock quantity of a style', () => {
    render(<Cart
      style={styleAllInStock}
    />);
    const sizeDropdown = screen.getByText('SELECT SIZE');
    const quantityDropdown = screen.getByText('-');
    fireEvent(
      sizeDropdown,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    const sizeOption = screen.getByText('XS');
    fireEvent(
      sizeOption,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    fireEvent(
      quantityDropdown,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    const elementsWith1 = screen.getAllByText('1');
    // 2 because dropdown option will include 1,
    // and actual dropdown will display 1 as default choice
    expect(elementsWith1.length).toBe(2);
    expect(screen.getByText('8')).toBeInTheDocument();
    const tryFindOption9 = () => { screen.getByText('9'); };
    expect(tryFindOption9).toThrow();
  });

  it('the quantity options should max out at 15, even if a style has more in stock', () => {
    render(<Cart
      style={styleAllInStock}
    />);
    const sizeDropdown = screen.getByText('SELECT SIZE');
    const quantityDropdown = screen.getByText('-');
    fireEvent(
      sizeDropdown,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    const sizeOption = screen.getByText('M');
    fireEvent(
      sizeOption,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    fireEvent(
      quantityDropdown,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(screen.getByText('15')).toBeInTheDocument();
    const tryFindOption16 = () => { screen.getByText('16'); };
    expect(tryFindOption16).toThrow();
  });
});
