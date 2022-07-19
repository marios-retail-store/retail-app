import React from 'react';
import { render, screen } from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import { toBeInTheDocument } from '@testing-library/jest-dom';
// ^ used in all tests, but somehow does not get recognized
import Slogan from './Slogan.jsx';

const productWithSloganAndDesc = {
  slogan: 'some slogan',
  description: 'some description',
};

const productWithSlogan = {
  slogan: 'some slogan',
};

const productWithDesc = {
  description: 'some description',
};

describe('Slogan', () => {
  it('displays slogan and description', () => {
    render(
      <Slogan
        product={productWithSloganAndDesc}
      />,
    );
    const sloganElement = screen.getByText(productWithSloganAndDesc.slogan);
    const descriptionElement = screen.getByText(productWithSloganAndDesc.description);
    expect(sloganElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  it('displays only the slogan without a description', () => {
    render(
      <Slogan
        product={productWithSlogan}
      />,
    );
    const sloganElement = screen.getByText(productWithSloganAndDesc.slogan);
    expect(sloganElement).toBeInTheDocument();
    expect(() => {
      screen.getByText(productWithSloganAndDesc.description);
    }).toThrow();
  });

  it('displays only the description without a slogan', () => {
    render(
      <Slogan
        product={productWithDesc}
      />,
    );
    expect(() => {
      screen.getByText(productWithSloganAndDesc.slogan);
    }).toThrow();
    const descriptionElement = screen.getByText(productWithSloganAndDesc.description);
    expect(descriptionElement).toBeInTheDocument();
  });

  it('displays nothing with neither slogan or description', () => {
    render(
      <Slogan
        product={{}}
      />,
    );
    expect(() => {
      screen.getByText(productWithSloganAndDesc.slogan);
    }).toThrow();
    expect(() => {
      screen.getByText(productWithSloganAndDesc.description);
    }).toThrow();
  });
});
