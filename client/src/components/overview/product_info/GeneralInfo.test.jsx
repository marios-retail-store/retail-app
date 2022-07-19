import React from 'react';
import { render, screen } from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import { toBeInTheDocument } from '@testing-library/jest-dom';
// ^ used in all tests, but somehow does not get recognized
import GeneralInfo from './GeneralInfo.jsx';

const product = {
  name: "Slacker's Slacks",
  category: 'Pants',
};

const styleNoSale = {
  original_price: '40.00',
  sale_price: null,
};

const styleOnSale = {
  original_price: '40.00',
  sale_price: '35.00',
};

describe('General Info', () => {
  it('displays product name and category', () => {
    render(
      <GeneralInfo
        product={product}
        style={styleNoSale}
      />,
    );
    const nameElement = screen.getByText(product.name);
    const categoryElement = screen.getByText(product.category);
    expect(nameElement).toBeInTheDocument();
    expect(categoryElement).toBeInTheDocument();
  });

  it('displays price of product', () => {
    render(
      <GeneralInfo
        product={product}
        style={styleNoSale}
      />,
    );
    const priceElement = screen.getByText(`$${styleNoSale.original_price}`);
    expect(priceElement).toBeInTheDocument();
  });

  it('displays both discounted and original price of a product on sale', () => {
    render(
      <GeneralInfo
        product={product}
        style={styleOnSale}
      />,
    );
    const originalPriceElement = screen.getByText(`$${styleOnSale.original_price}`);
    const salePriceElement = screen.getByText(`$${styleOnSale.sale_price}`);
    expect(originalPriceElement).toBeInTheDocument();
    expect(salePriceElement).toBeInTheDocument();
  });

  it('displays one price for a product that is not on sale', () => {
    render(
      <GeneralInfo
        product={product}
        style={styleNoSale}
      />,
    );
    const priceElements = screen.getAllByText(/^\$/);
    expect(priceElements.length).toBe(1);
  });

  it('displays two prices for a product that is on sale', () => {
    render(
      <GeneralInfo
        product={product}
        style={styleOnSale}
      />,
    );
    const priceElements = screen.getAllByText(/^\$/);
    expect(priceElements.length).toBe(2);
  });
});
